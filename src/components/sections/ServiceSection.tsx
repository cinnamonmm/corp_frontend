import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from '@/types/strapi';
import ServiceCard from '@/components/ServiceCard';
import { services, SERVICE_CATEGORIES } from '@/data/services';

interface ServiceSectionProps {
  homeData: HomePage;
  allowScroll?: (direction: 'up' | 'down') => void;
}

const ServiceCategorySection: React.FC<{
  categoryKey: keyof typeof SERVICE_CATEGORIES;
  services: typeof services;
  isVisible: boolean;
}> = ({ categoryKey, services, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="poa inset-0 fl aic jcc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mxa px4">
            <div className="tac mb16">
              <h3 className="fs3xl fwb mb4">
                {SERVICE_CATEGORIES[categoryKey].label}
              </h3>
              <div className="w16 h1 bg-primary-600 mxa"></div>
            </div>

            <div className="gr gc1 md:gco2 lg:gco3 gap8">
              {services.map((service, index) => (
                <ServiceCard
                  key={`service-${service.order}`}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// スクロールインジケーターのドット
const ScrollIndicator: React.FC<{
  count: number;
  activeIndex: number;
  onClick: (index: number) => void;
}> = ({ count, activeIndex, onClick }) => {
  return (
    <div className="poa right-10 top-1/2 -translate-y-1/2 fl fdc gap4">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={`w3 h3 br-full ${activeIndex === i ? 'bg-primary-600' : 'bg-gray-300'} cur-pointer`}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
};

const ServiceSection: React.FC<ServiceSectionProps> = ({ allowScroll }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // スクロールイベントの管理用
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const servicesByCategory = useMemo(() => {
    const categories = Object.keys(SERVICE_CATEGORIES);
    return categories.map(key => ({
      key: key as keyof typeof SERVICE_CATEGORIES,
      services: services.filter(service => service.category_key === key)
    }));
  }, []);

  // カテゴリを変更する関数
  const changeCategory = (direction: number) => {
    // スクロール処理中またはトランジション中は無視
    if (isScrollingRef.current || isTransitioning) return;

    // スクロール処理中フラグを立てる
    isScrollingRef.current = true;

    const nextCategory = Math.min(
      Math.max(activeCategory + direction, 0),
      servicesByCategory.length - 1
    );

    // 境界条件: 最初または最後のカテゴリにいる場合
    if (nextCategory === activeCategory) {
      // 最初のカテゴリで上にスクロールした場合
      if (direction < 0 && activeCategory === 0) {
        allowScroll?.('up');
        // スクロール処理中フラグを解除
        isScrollingRef.current = false;
        return;
      }

      // 最後のカテゴリで下にスクロールした場合
      if (direction > 0 && activeCategory === servicesByCategory.length - 1) {
        allowScroll?.('down');
        // スクロール処理中フラグを解除
        isScrollingRef.current = false;
        return;
      }

      // その他の境界条件では何もしない
      isScrollingRef.current = false;
      return;
    }

    // トランジション開始
    setIsTransitioning(true);
    setActiveCategory(nextCategory);

    // トランジション完了後にロックを解除
    setTimeout(() => {
      setIsTransitioning(false);

      // スクロール処理中フラグを解除するタイミングを遅らせる
      // これにより、連続スクロールを確実に防止する
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    }, 600);
  };

  // スクロールイベントを処理
  useEffect(() => {
    if (!sectionRef.current) return;

    // スクロールデバウンスのタイムアウトをクリア
    const clearScrollTimeout = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // すでにスクロール中なら無視
      if (isScrollingRef.current || isTransitioning) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;

      // 最初/最後のカテゴリでの境界条件
      if ((direction < 0 && activeCategory === 0) ||
          (direction > 0 && activeCategory === servicesByCategory.length - 1)) {
        return; // 親コンポーネントにスクロールを委任
      }

      // それ以外はデフォルト動作を防止
      e.preventDefault();

      // 既存のタイムアウトをクリア
      clearScrollTimeout();

      // 新しいタイムアウトを設定（スクロール終了の検出）
      scrollTimeoutRef.current = setTimeout(() => {
        changeCategory(direction);
      }, 10); // ほぼ即時実行するが、連続イベントをバッチ処理
    };

    const section = sectionRef.current;
    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
      clearScrollTimeout();
    };
  }, [activeCategory, servicesByCategory.length, isTransitioning, allowScroll]);

  // タッチイベントを処理
  useEffect(() => {
    if (!sectionRef.current) return;

    let touchStartY = 0;
    let isTouchMoving = false;

    const handleTouchStart = (e: TouchEvent) => {
      // スクロール中は新しいタッチ入力を無視
      if (isScrollingRef.current || isTransitioning) return;

      touchStartY = e.touches[0].clientY;
      isTouchMoving = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // すでにスクロール中なら無視
      if (isScrollingRef.current || isTransitioning) {
        e.preventDefault();
        return;
      }

      // 最初のタッチ後の移動のみを処理
      if (!isTouchMoving) {
        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;

        // 小さな動きは無視
        if (Math.abs(diff) < 20) return;

        const direction = diff > 0 ? 1 : -1;

        // 最初/最後のカテゴリでの境界チェック
        if ((direction < 0 && activeCategory === 0) ||
            (direction > 0 && activeCategory === servicesByCategory.length - 1)) {
          return; // 親コンポーネントにスクロールを委任
        }

        e.preventDefault();
        isTouchMoving = true; // これ以降のタッチムーブは無視

        // カテゴリ変更を実行
        changeCategory(direction);
      }
    };

    // タッチ終了時のイベント
    const handleTouchEnd = () => {
      isTouchMoving = false;
    };

    const section = sectionRef.current;
    section.addEventListener('touchstart', handleTouchStart);
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    section.addEventListener('touchend', handleTouchEnd);

    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeCategory, servicesByCategory.length, isTransitioning, allowScroll]);

  // キーボードイベントを処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // スクロール中は新しいキー入力を無視
      if (isScrollingRef.current || isTransitioning) return;

      let direction = 0;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        direction = 1;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        direction = -1;
      } else {
        return; // 関連するキーが押されていない
      }

      // 最初/最後のカテゴリでの境界チェック
      if ((direction < 0 && activeCategory === 0) ||
          (direction > 0 && activeCategory === servicesByCategory.length - 1)) {
        if (direction < 0) {
          allowScroll?.('up');
        } else {
          allowScroll?.('down');
        }
        return;
      }

      e.preventDefault();
      changeCategory(direction);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCategory, servicesByCategory.length, isTransitioning, allowScroll]);

  // カテゴリを直接選択
  const handleCategorySelect = (index: number) => {
    // スクロール中はクリックを無視
    if (isScrollingRef.current || isTransitioning) return;

    // 同じカテゴリを選択した場合は何もしない
    if (index === activeCategory) return;

    // スクロール処理中フラグを立てる
    isScrollingRef.current = true;

    setIsTransitioning(true);
    setActiveCategory(index);

    setTimeout(() => {
      setIsTransitioning(false);

      // スクロール処理中フラグを解除するタイミングを遅らせる
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    }, 600);
  };

  return (
    <div ref={sectionRef} className="h100 por ovh">
      <div className="container mxa px4 mt10">
        <div className="tac mb10">
          <h2 className="fs5xl fw9 mb4">Services</h2>
          <div className="w16 h1 bg-primary-600 mxa"></div>
        </div>
      </div>

      <div className="h100 poa inset-0 pt-28 mt10">
        {servicesByCategory.map((category, index) => (
          <ServiceCategorySection
            key={category.key}
            categoryKey={category.key}
            services={category.services}
            isVisible={activeCategory === index}
          />
        ))}
      </div>

      <ScrollIndicator
        count={servicesByCategory.length}
        activeIndex={activeCategory}
        onClick={handleCategorySelect}
      />
    </div>
  );
};

export default ServiceSection;