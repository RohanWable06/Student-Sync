import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const AboutUs = () => {
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
          <div className="bg-dark text-white p-5 rounded-lg" style={{ opacity: 0.85, maxWidth: "600px", width: "100%" }}>
            <p className="h3 font-weight-bold pb-2 border-bottom border-success">
              About Us
            </p>
            <div className="mt-4">
              <p>
                Welcome to StudentSync, the leading platform for college management. Our system is designed to streamline
                administrative processes, enhance communication between students and faculty, and ensure that all educational
                resources are readily available to those who need them.
              </p>
              <p>
                Our mission is to provide an all-in-one solution that caters to the needs of students, faculty, and
                administrators alike. Whether it's tracking attendance, managing grades, or facilitating communication, our
                platform is built to support the success of every user.
              </p>
              <p>
                Thank you for choosing StudentSync as your trusted partner in education. Together, we are shaping the future
                of learning.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
