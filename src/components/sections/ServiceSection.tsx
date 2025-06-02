import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from '@/types/strapi';
import ServiceCard from '@/components/ServiceCard';
import { services, SERVICE_CATEGORIES } from '@/data/services';

interface ServiceSectionProps {
  homeData: HomePage;
  onScroll: (direction: 'up' | 'down') => void;
}

const ServiceCategorySection: React.FC<{
  categoryKey: keyof typeof SERVICE_CATEGORIES;
  services: typeof services;
  isVisible: boolean;
}> = ({ categoryKey, services, isVisible }) => {
  const isSystemDevelopment = categoryKey === 'system_development';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="poa w100 jcc h100 inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mxa px4 fl fdc h100">
            {/* <div className="tac">
              <h3 className="fs3xl fwb mb3">
                {SERVICE_CATEGORIES[categoryKey].label}
              </h3>
              <div className="w16 h1 bg-primary-600 mxa"></div>
            </div> */}
            <div className="h100 fl fdc f1">
              <div className={`${isSystemDevelopment ? 'gr gc1 md:gc2 g4' : 'fl fdc g4'} px4 h100 w100 pb13 mwxl mxa ofs`}>
                {services.map((service, index) => (
                  <ServiceCard
                    key={`service-${service.order}`}
                    service={service}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServiceSection: React.FC<ServiceSectionProps> = ({ onScroll }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // スクロール検出のロジック
  useEffect(() => {
    if (!sectionRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      const direction = e.deltaY > 0 ? 'down' : 'up';
      onScroll(direction);
    };

    const section = sectionRef.current;
    section.addEventListener('wheel', handleWheel);

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, [isTransitioning, onScroll]);

  const servicesByCategory = useMemo(() => {
    const categories = Object.keys(SERVICE_CATEGORIES);
    return categories.map(key => ({
      key: key as keyof typeof SERVICE_CATEGORIES,
      services: services.filter(service => service.category_key === key)
    }));
  }, []);

  const handleCategoryChange = (index: number) => {
    if (isTransitioning || index === activeCategory) return;

    setIsTransitioning(true);
    setActiveCategory(index);

    // トランジション完了後にロックを解除
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <section ref={sectionRef} id="services" className="h100 por ofh fl fdc">
      <div className="container mxa px4 pt11">
        <div className="tac">
          <h2 className="fs5xl fw9 mb4">Services</h2>
          <div className="w16 h1 bg-primary-600 mxa"></div>
        </div>
      </div>

      <div className="por px4 pb3 aic jcc fl mwxl mxa w100">
        <div className="fl w100" style={{ backgroundColor: 'rgb(48, 64, 200)' }}>
          {servicesByCategory.map((category, index) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(index)}
              disabled={isTransitioning}
              className={`f1 px6 py2 bd0 cp white fw9 fsmd ls1 ${
                activeCategory === index
                  ? 'bgwhite25'
                  : 'bgwhite50'
              } transition-colors duration-200`}
            >
              {SERVICE_CATEGORIES[category.key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="por fl f1 h100 inset-0 pt-28">
        {servicesByCategory.map((category, index) => (
          <ServiceCategorySection
            key={category.key}
            categoryKey={category.key}
            services={category.services}
            isVisible={activeCategory === index}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;