import React, { useState, useEffect } from 'react';

export default function Home() {
  const words = ['Data Scientist', 'Web Developer', 'UI/UX Designer', 'Problem Solver'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
      }, 60);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => activeWord.substring(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section id="home" className="home-section">
      <div className="container">
        <div className="home-content">
          <div className="home-text" data-aos="fade-right">
            <h3>Hi, Myself</h3>
            <h1>Kalana Kanishka</h1>
            <h2>And I'm a <span className="typing-text">{currentText}</span></h2>
            <p>
              I'm an undergraduate Data Science student with a strong focus on web development and UI/UX design. 
              I enjoy transforming data into meaningful insights and have a growing interest in building interactive 
              dashboards using Power BI and Tableau. I'm passionate about creating simple, effective digital 
              experiences that combine data, design, and technology.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com/Kalana Kanishka" target="_blank" rel="noreferrer" className="social-icon facebook" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://github.com/kalanakanishkaa" target="_blank" rel="noreferrer" className="social-icon github" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/Kanishka Kalana" target="_blank" rel="noreferrer" className="social-icon linkedin" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com/kani_shkz" target="_blank" rel="noreferrer" className="social-icon instagram" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <a href="#" className="btn-download">Download CV</a>
          </div>
          <div className="home-image" data-aos="fade-left">
            <div className="profile-card-wrapper">
              <div className="profile-card">
                <div className="profile-card-img">
                  <img src="/images/profile.jpg.jpg" alt="Profile Picture" />
                </div>
                <div className="profile-card-tag">
                  <span className="tag-dot"></span>
                  <span>Data Scientist</span>
                </div>
              </div>
              <div className="profile-card-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
