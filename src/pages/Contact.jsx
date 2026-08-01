import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email Address is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mbdqepgw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title">Contact <span>Me</span></h2>
        <p className="section-subtitle">Get in touch with me</p>

        {status === 'success' ? (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '40px',
            background: 'var(--bg-card)',
            border: '2px solid #1D9E75',
            borderRadius: '20px'
          }}>
            <i className="fas fa-check-circle" style={{ fontSize: '4rem', color: '#1D9E75', marginBottom: '20px' }}></i>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Message Sent Successfully!</h3>
            <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out, Kalana Kanishka will get back to you shortly.</p>
            <button 
              className="btn-download" 
              style={{ marginTop: '20px', padding: '10px 30px' }} 
              onClick={() => setStatus(null)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {status === 'error' && (
              <div style={{
                color: '#e74c3c',
                background: 'rgba(231,76,60,0.1)',
                border: '1px solid rgba(231,76,60,0.3)',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Oops! There was a problem submitting your form. Please try again.
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Email Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.subject}</span>}
              </div>
            </div>

            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Your Message" 
                rows="8" 
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <span style={{ color: '#e74c3c', fontSize: '12.5px', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
            </div>

            <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
