'use client'
import React, { useState, useRef, useEffect } from 'react';
import { getHomePage, getServices, getSiteConfig } from "@/lib/api";
import { HomePage, Service, SiteConfigResponse } from "@/types/strapi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [homeData, setHomeData] = useState<HomePage | null>(null);
  const [services, setServices] = useState<Service[] | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfigResponse | null>(null);

  // HeroSectionの高さを取得
  useEffect(() => {
    const updateHeroHeight = () => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight);
      }
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);
    return () => window.removeEventListener('resize', updateHeroHeight);
  }, []);

  // データのフェッチ
  React.useEffect(() => {
    const fetchData = async () => {
      const [home, servicesData, config] = await Promise.all([
        getHomePage(),
        getServices(),
        getSiteConfig()
      ]);
      setHomeData(home);
      setServices(servicesData);
      setSiteConfig(config);
    };
    fetchData();
  }, []);

  if (!homeData || !services || !siteConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <Header siteConfig={siteConfig} />

      <div ref={heroRef}>
        <HeroSection
          homeData={homeData}
          siteConfig={siteConfig}
          onScrollProgress={setScrollProgress}
        />
      </div>

      <div
        className="transition-all duration-500 ease-out"
        style={{
          opacity: scrollProgress >= 1 ? 1 : 0,
          visibility: scrollProgress >= 1 ? 'visible' : 'hidden',
          transform: `translateY(${Math.max(0, (1 - scrollProgress) * heroHeight)}px)`,
          position: 'relative',
          zIndex: scrollProgress >= 1 ? 1 : -1,
          marginTop: `-${heroHeight}px`,
          paddingTop: '100vh'
        }}
      >
        <AboutSection homeData={homeData} />
        <ServiceSection homeData={homeData} services={services} />
        <ContactSection homeData={homeData} />
      </div>

      {/* フッター */}
      <Footer siteConfig={siteConfig} />
    </div>
  );
}
