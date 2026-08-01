import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        setWidth((window.scrollY / windowHeight * 100) + '%');
      } else {
        setWidth('0%');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger initially
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress-bar" style={{ width }} />;
}
