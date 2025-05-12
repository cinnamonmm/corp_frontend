import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HomePage } from '../../types/strapi';
import { getStrapiImageUrl } from '../../utils/helpers';

interface HeroSectionProps {
  homeData: HomePage;
}

const HeroSection: React.FC<HeroSectionProps> = ({ homeData }) => {
  const heroImageUrl = getStrapiImageUrl(homeData.heroImage);
  
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl}
          alt={homeData.heroTitle}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {homeData.heroTitle}
          </h1>
          <div 
            className="text-xl mb-8"
            dangerouslySetInnerHTML={{ __html: homeData.heroDescription }}
          />
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300">
            詳細を見る
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;