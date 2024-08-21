// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4" style={{ width: "100%" }}>
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} College Management System. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-white me-3">Privacy Policy</a>
          <a href="/terms-of-service" className="text-white">Terms of Service</a>
        </p>
        <p>
          Follow us on:
          <a href="https://www.linkedin.com/in/piyush-atre-429b47231" className="text-white mx-2"><i className="fab fa-linkedin"></i></a>
          <a href="https://twitter.com" className="text-white mx-2"><i className="fab fa-github"></i></a>
          <a href="https://instagram.com" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
        </p>
      </div>
    </footer >
  );
};

export default Footer;
