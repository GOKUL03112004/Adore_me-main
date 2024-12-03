import React from 'react';
import Header from './Header'; // Import your Header component
import Navbar from './Navbar'; // Import your Navbar component
import HeroSection from './HeroSection'; // Import your HeroSection component
import FeaturedProducts from './FeaturedProducts'; // Import your FeaturedProducts component
import Footer from './Footer'; // Import your Footer component

const Home = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
