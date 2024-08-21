import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  const sectionStyle = {
    width: "100%",
    height: "800px",
    backgroundImage: "url(https://i.imgur.com/YDwNPZg.jpeg)"
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="home-wrapper" style={sectionStyle}>

      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
