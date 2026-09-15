import React, { useState, useEffect } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('programming');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimate(false), 0);
    const timer2 = setTimeout(() => setAnimate(true), 100);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [activeTab]);

  const skillsData = {
    programming: [
      { name: 'Web Development', desc: 'HTML, CSS, JavaScript – building responsive modern websites', level: '85%', icon: 'fa-code' },
      { name: 'Data Science', desc: 'Python, Power BI, Tableau – analyzing data and creating visualizations', level: '75%', icon: 'fa-chart-bar' },
      { name: 'Problem Solving', desc: 'Algorithms & Data Structures – strengthening logic skills', level: '70%', icon: 'fa-brain' }
    ],
    tools: [
      { name: 'UI/UX Design', desc: 'Creating user-friendly interfaces with modern design principles', level: '80%', icon: 'fa-paint-brush' },
      { name: 'Version Control', desc: 'Git & GitHub – managing code and collaboration', level: '80%', icon: 'fa-code-branch' },
      { name: 'Backend Development', desc: 'Node.js, APIs – exploring server-side programming', level: '60%', icon: 'fa-server' }
    ],
    soft: [
      { name: 'Teamwork', desc: 'Working collaboratively in group projects and team environments', level: '85%', icon: 'fa-users' },
      { name: 'Critical Thinking', desc: 'Analyzing problems and finding creative solutions', level: '80%', icon: 'fa-lightbulb' },
      { name: 'Communication', desc: 'Clearly explaining technical ideas to any audience', level: '75%', icon: 'fa-comments' }
    ]
  };

  return (
    <section id="about" className="about-section" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title">About <span>Me</span></h2>
        <p className="section-subtitle">Introduction and Academic Background</p>

        <div className="about-grid">
          {/* LEFT SIDE: Personal Details */}
          <div className="about-card" data-aos="fade-right">
            <h3 className="about-card-title">Professional Summary</h3>
            <p className="about-bio">
              I'm an undergraduate Data Science student with a strong focus on web development and UI/UX design. 
              I enjoy transforming data into meaningful insights and have a growing interest in building interactive 
              dashboards using Power BI and Tableau. I'm passionate about creating simple, effective digital 
              experiences that combine data, design, and technology.
            </p>

            <div className="about-details">
              <div className="about-detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <span className="detail-label">Current Location</span>
                  <span className="detail-value">Meepe, Padukka, Sri Lanka</span>
                </div>
              </div>
              <div className="about-detail-item">
                <i className="fas fa-home"></i>
                <div>
                  <span className="detail-label">Home Town</span>
                  <span className="detail-value">Naula, Matale, Sri Lanka</span>
                </div>
              </div>
              <div className="about-detail-item">
                <i className="fas fa-graduation-cap"></i>
                <div>
                  <span className="detail-label">Degree</span>
                  <span className="detail-value">BSc (Hons) in Data Science</span>
                </div>
              </div>
              <div className="about-detail-item">
                <i className="fas fa-university"></i>
                <div>
                  <span className="detail-label">University</span>
                  <span className="detail-value">SLTC Research University</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Education Timeline */}
          <div className="about-card" data-aos="fade-left">
            <h3 className="about-card-title">Education</h3>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot active"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Expected 2027</span>
                  <h4>BSc (Hons) in Data Science</h4>
                  <p className="timeline-place">SLTC Research University</p>
                  <ul className="timeline-points">
                    <li>Specializing in Data Science & Machine Learning</li>
                    <li>Focus on Web Development & UI/UX Design</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Completed</span>
                  <h4>GCE Advanced Level & Ordinary Level</h4>
                  <p className="timeline-place">Sri Naga National School</p>
                  <ul className="timeline-points">
                    <li>Successfully completed foundational secondary education</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Certificates</span>
                  <h4>Professional Certifications</h4>
                  <p className="timeline-place">Multiple Platforms</p>
                  <ul className="timeline-points">
                    <li>English & IT Diploma — ESOFT Metro Campus</li>
                    <li>Coursera Certified Courses</li>
                    <li>LinkedIn Learning Certificates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS SUBSECTION */}
        <div className="skills-section" data-aos="fade-up">
          <h2 className="section-title" style={{ fontSize: '38px', marginTop: '60px' }}>Technical <span>Skills</span></h2>
          <p className="section-subtitle">My core skills and expertise</p>

          <div className="skills-tabs">
            <button 
              className={`tab-btn ${activeTab === 'programming' ? 'active' : ''}`}
              onClick={() => setActiveTab('programming')}
            >
              Programming & Data
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              Tools & Design
            </button>
            <button 
              className={`tab-btn ${activeTab === 'soft' ? 'active' : ''}`}
              onClick={() => setActiveTab('soft')}
            >
              Soft Skills
            </button>
          </div>

          <div className="skills-grid">
            {skillsData[activeTab].map((skill, index) => (
              <div className="skill-card" key={index}>
                <i className={`fas ${skill.icon}`}></i>
                <h3>{skill.name}</h3>
                <p>{skill.desc}</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: animate ? skill.level : '0%' }}
                  ></div>
                </div>
                <span className="progress-label">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
