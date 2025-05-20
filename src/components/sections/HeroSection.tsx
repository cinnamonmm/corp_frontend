'use client'
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HomePage } from '@/types/strapi';
import { getStrapiImageUrl } from '@/utils/helpers';
import { SiteConfig } from '@/types/siteConfig';

interface HeroSectionProps {
  homeData: HomePage;
  siteConfig: SiteConfig;
}

const HeroSection: React.FC<HeroSectionProps> = ({ homeData, siteConfig }) => {
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 1000], [0, 350]);
  const heroImageUrl = getStrapiImageUrl(homeData.heroImage);
  const logoUrl = getStrapiImageUrl(siteConfig.logo);
  console.log('homeData')
  console.log(homeData)
  console.log('siteConfig')
  console.log(siteConfig)

  return (
    <section className="relative hscr fl aic">
      <div className="poa inset-0">
        <div className="relative w100 h100 zn1000">
          <Image
            src={heroImageUrl}
            alt={homeData.heroTitle}
            width={1920}
            height={1080}
            style={{
              objectFit: 'cover',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1
            }}
            priority
          />
        </div>
        <div className='pof inset-0 bgblack65 zn100' />
        <motion.div
          className="poa inset-0 fl aic jcc"
          style={{ y: logoY }}
        >
          <Image
            src={logoUrl}
            alt={homeData.heroTitle}
            width={500}
            height={500}
            style={{ objectFit: 'contain', width: '50%', height: 'auto' }}
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <div className="text-lg mb-2 text-primary-300">{siteConfig.siteName}</div>
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