'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getHomePage, getSiteConfig } from "@/lib/api";
import { HomePage, SiteConfigResponse } from "@/types/strapi";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [homeData, setHomeData] = useState<HomePage | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfigResponse | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [inServiceSection, setInServiceSection] = useState(false);

  // セクション参照を初期化
  useEffect(() => {
    sectionRefs.current = Array(4).fill(null);
  }, []);

  // データのフェッチ
  useEffect(() => {
    const fetchData = async () => {
      const [home, config] = await Promise.all([
        getHomePage(),
        getSiteConfig()
      ]);
      setHomeData(home);
      setSiteConfig(config);
    };
    fetchData();
  }, []);

  // サービスセクションから他のセクションへの移動処理
  const handleServiceSectionScroll = (direction: 'up' | 'down') => {
    if (isScrolling) return;

    const targetSection = direction === 'up'
      ? 1 // AboutSectionへ
      : 3; // ContactSectionへ

    navigateToSection(targetSection);
  };

  // 指定したセクションに移動する関数
  const navigateToSection = useCallback((sectionIndex: number) => {
    if (isScrolling || !sectionRefs.current[sectionIndex]) return;

    setIsScrolling(true);
    setActiveSection(sectionIndex);

    sectionRefs.current[sectionIndex]?.scrollIntoView({
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsScrolling(false);
      setInServiceSection(sectionIndex === 2); // ServiceSectionかどうかを設定
    }, 1000);
  }, [isScrolling]);

  // スクロールスナップのロジック
  useEffect(() => {
    if (!containerRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      // ServiceSectionの中にいる場合はServiceSection自身にスクロール処理を任せる
      if (inServiceSection) return;

      e.preventDefault();

      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.min(Math.max(activeSection + direction, 0), sectionRefs.current.length - 1);

      if (nextSection !== activeSection) {
        navigateToSection(nextSection);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, isScrolling, inServiceSection, navigateToSection]);

  // スワイプ検出のロジック
  useEffect(() => {
    if (!containerRef.current) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // ServiceSectionの中にいる場合はServiceSection自身にスクロール処理を任せる
      if (inServiceSection) return;

      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;

      // 十分なスワイプ距離があるかを確認
      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        const nextSection = Math.min(Math.max(activeSection + direction, 0), sectionRefs.current.length - 1);

        if (nextSection !== activeSection) {
          e.preventDefault();
          navigateToSection(nextSection);
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeSection, isScrolling, inServiceSection, navigateToSection]);

  // サービスセクションに入ったことを検知
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const serviceEntry = entries[0];
        setInServiceSection(serviceEntry.isIntersecting);
      },
      { threshold: 0.5 } // 50%以上表示されたらトリガー
    );

    const serviceSection = sectionRefs.current[2];
    if (serviceSection) {
      observer.observe(serviceSection);
    }

    return () => {
      if (serviceSection) {
        observer.unobserve(serviceSection);
      }
    };
  }, [ ]);

  if (!homeData || !siteConfig) {
    return <div>Loading...</div>;
  }

  // セクション参照のコールバック関数
  const setSectionRef = (index: number) => (node: HTMLDivElement | null) => {
    sectionRefs.current[index] = node;
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ヘッダー */}
      <Header siteConfig={siteConfig} />

      <div
        ref={containerRef}
        className="h-screen snap-y snap-mandatory overflow-y-scroll"
      >
        <div
          ref={setSectionRef(0)}
          className="ofs hscr w100 snap-start"
        >
          <HeroSection
            homeData={homeData}
            siteConfig={siteConfig}
            onScrollProgress={() => {}}
          />
        </div>

        <div
          ref={setSectionRef(1)}
          className="h-screen w-full snap-start"
        >
          <AboutSection homeData={homeData} />
        </div>

        <div
          ref={setSectionRef(2)}
          className="h-screen w-full snap-start"
        >
          <ServiceSection
            homeData={homeData}
            onScroll={handleServiceSectionScroll}
          />
        </div>

        <div
          ref={setSectionRef(3)}
          className="h-screen w-full snap-start"
        >
          <ContactSection homeData={homeData} />
        </div>
      </div>

      {/* フッター */}
      {/* <Footer siteConfig={siteConfig} /> */}
    </div>
  );
}
