import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddProjectModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    status: 'completed',
    githubLink: '',
    liveLink: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user is typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.githubLink.trim()) newErrors.githubLink = 'GitHub link is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process tags
    const tagsArray = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
      : [];

    // Fallback image if none provided
    const imagePath = formData.image.trim() || '/images/Project3.jpg';

    const newProject = {
      id: `project-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      tags: tagsArray,
      status: formData.status,
      githubLink: formData.githubLink,
      liveLink: formData.liveLink,
      image: imagePath
    };

    onAdd(newProject);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      tags: '',
      status: 'completed',
      githubLink: '',
      liveLink: '',
      image: ''
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Project</h2>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Portfolio Website"
            />
            {errors.title && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief summary of what this project does..."
              rows={4}
            />
            {errors.description && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags / Tech Stack (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, CSS, MongoDB"
            />
          </div>

          <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label htmlFor="status">Project Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="completed">Completed</option>
                <option value="inprogress">In Progress</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image Path/URL (optional)</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="e.g. /images/Project2.jpg"
              />
            </div>
          </div>

          <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label htmlFor="githubLink">GitHub Repository Link *</label>
              <input
                type="text"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
              {errors.githubLink && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.githubLink}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="liveLink">Live Demo Link (optional)</label>
              <input
                type="text"
                id="liveLink"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-add-project" style={{ borderRadius: '25px', padding: '12px 30px' }}>
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
