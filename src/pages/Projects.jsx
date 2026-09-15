import React, { useState, useEffect } from 'react';
import initialProjects from '../data/projects.json';
import AddProjectModal from '../components/AddProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleAddProject = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem('my-projects', JSON.stringify(updated));
  };

  const filteredProjects = projects.filter((project) => {
    const search = searchTerm.toLowerCase();
    const matchesTitle = project.title.toLowerCase().includes(search);
    const matchesDesc = project.description.toLowerCase().includes(search);
    const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(search));
    return matchesTitle || matchesDesc || matchesTags;
  });

  return (
    <section id="projects" className="projects-section" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title">My <span>Projects</span></h2>
        <p className="section-subtitle">Things I've built and currently building</p>

        {/* Search and Action Bar */}
        <div className="projects-controls">
          <div className="projects-search">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search projects by title, description or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="projects-actions">
            <button className="btn-add-project" onClick={() => setIsModalOpen(true)}>
              <i className="fas fa-plus"></i> Add Project
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-img">
                  <img src={project.image} alt={project.title} onError={(e) => {
                    // Fallback to project 3 placeholder if image load fails
                    e.target.src = '/images/Project3.jpg';
                  }} />
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <p>{project.description}</p>
                      <div className="project-links">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-project-live">
                            <i className="fas fa-external-link-alt"></i> Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-project-github">
                            <i className="fab fa-github"></i> GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {project.status === 'inprogress' && (
                    <div className="progress-badge">
                      <div className="progress-ring"></div>
                      <span>In Progress</span>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className={`project-status ${project.status === 'completed' ? 'completed' : 'inprogress'}`}>
                      {project.status === 'completed' ? (
                        <><i className="fas fa-check-circle" style={{marginRight: '4px'}}></i> Completed</>
                      ) : 'In Progress'}
                    </span>
                  </div>
                  <p className="project-description" style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.6' }}>
                    {project.description}
                  </p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span className="tag" key={i}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <h3>No projects found match your search criteria.</h3>
            </div>
          )}
        </div>
      </div>

      <AddProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddProject} 
      />
    </section>
  );
}
