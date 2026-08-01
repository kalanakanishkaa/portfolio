import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Kalana Kanishka. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
