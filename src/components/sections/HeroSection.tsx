'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HomePage } from '@/types/strapi';
import { getStrapiImageUrl } from '@/utils/helpers';
import { SiteConfig } from '@/types/siteConfig';

interface HeroSectionProps {
  homeData: HomePage;
  siteConfig: SiteConfig;
  onScrollProgress?: (progress: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ homeData, siteConfig, onScrollProgress }) => {
  const { scrollY } = useScroll();
  const [sectionHeight, setSectionHeight] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // セクションの高さを取得
  useEffect(() => {
    const updateHeight = () => {
      if (sectionRef.current) {
        setSectionHeight(sectionRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const logoY = useTransform(scrollY, [0, sectionHeight], [0, sectionHeight * 0.35]);
  const heroImageUrl = getStrapiImageUrl(homeData.heroImage);
  const logoUrl = getStrapiImageUrl(siteConfig.logo);
  console.log('homeData')
  console.log(homeData)
  console.log('siteConfig')
  console.log(siteConfig)

  // スクロール進捗を計算して親コンポーネントに通知
  React.useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const progress = Math.min(latest / sectionHeight, 1);
      onScrollProgress?.(progress);
    });
    return () => unsubscribe();
  }, [scrollY, onScrollProgress, sectionHeight]);

  return (
    <section ref={sectionRef} className="relative hscr fl aic">
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
            style={{ objectFit: 'contain', width: '35%', height: 'auto' }}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;