import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSlider from '../components/home/HeroSlider';
import Categories from '../components/home/Categories';
import GiftBoxes from '../components/home/GiftBoxes';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import FeaturedProducts from '../components/home/FeaturedProducts';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSlider />
        <Categories />
        <GiftBoxes />
        <Features />
        <Testimonials />
        <Newsletter />
        <FeaturedProducts />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
