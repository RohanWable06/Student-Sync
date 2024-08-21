import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column align-items-center justify-content-center vh-100 position-relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <div className="bg-dark text-white p-5 rounded-lg" style={{ opacity: 0.85, maxWidth: "500px", width: "100%" }}>
            <p className="h3 font-weight-bold pb-2 border-bottom border-success">
              Contact Us
            </p>
            <div className="mt-4">
              <p>123 College Avenue,</p>
              <p>City, State, Zip Code</p>
              <p>Email: contact@college.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
            <form className="mt-4">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-4 d-flex align-items-center">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
