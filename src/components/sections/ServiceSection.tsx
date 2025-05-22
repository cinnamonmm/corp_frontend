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
  const isSystemDevelopment = categoryKey === 'system_development';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="por fl aic jcc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mxa px4">
            <div className="tac">
              <h3 className="fs3xl fwb mb4">
                {SERVICE_CATEGORIES[categoryKey].label}
              </h3>
              <div className="w16 h1 bg-primary-600 mxa"></div>
            </div>

            <div className={`${isSystemDevelopment ? 'gr gc1 md:gc2 g4' : 'fl fdc g4'} mwxl mxa`}>
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
  const lockedRef = useRef(false);

  const servicesByCategory = useMemo(() => {
    const categories = Object.keys(SERVICE_CATEGORIES);
    return categories.map(key => ({
      key: key as keyof typeof SERVICE_CATEGORIES,
      services: services.filter(service => service.category_key === key)
    }));
  }, []);

  // カスタムイベントを発火する関数
  const triggerCategoryChange = (direction: 1 | -1) => {
    // すでにロックされている場合は何もしない
    if (lockedRef.current) return;

    // ロックをかける（即時に反映するためRef使用）
    lockedRef.current = true;

    // 次のカテゴリインデックスを計算
    const nextCategory = activeCategory + direction;

    // 境界チェック
    if (nextCategory < 0) {
      allowScroll?.('up');
      lockedRef.current = false; // ロックを解除
      return;
    }

    if (nextCategory >= servicesByCategory.length) {
      allowScroll?.('down');
      lockedRef.current = false; // ロックを解除
      return;
    }

    // カテゴリを更新
    setActiveCategory(nextCategory);

    // トランジション時間後にロック解除
    setTimeout(() => {
      lockedRef.current = false;
    }, 600);
  };

  // スクロールイベント用の監視
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ホイールイベントハンドラ
    let wheelTimeout: NodeJS.Timeout | null = null;
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      // 現在ロック中なら全てのイベントをブロック
      if (lockedRef.current) {
        e.preventDefault();
        return;
      }

      const now = Date.now();

      // 短時間に連続したホイールイベントを防ぐ（100ms以内）
      if (now - lastWheelTime < 100) {
        e.preventDefault();
        return;
      }

      lastWheelTime = now;

      // スクロール方向を判定
      const direction = e.deltaY > 0 ? 1 : -1;

      // 境界チェック
      if ((direction < 0 && activeCategory === 0) ||
          (direction > 0 && activeCategory === servicesByCategory.length - 1)) {
        // 境界では親コンポーネントにスクロールを委任
        return;
      }

      // それ以外はスクロールイベントをキャンセル
      e.preventDefault();

      // 既存のタイムアウトをクリア
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }

      // スクロール終了を検出するためのタイムアウトを設定
      wheelTimeout = setTimeout(() => {
        triggerCategoryChange(direction as 1 | -1);
      }, 5); // ごく短い遅延で実行
    };

    // イベントリスナーを追加
    section.addEventListener('wheel', handleWheel, { passive: false });

    // クリーンアップ
    return () => {
      section.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [activeCategory, servicesByCategory.length, allowScroll]);

  // タッチイベント用の監視
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let touchStartY = 0;
    let hasMoved = false;

    // タッチ開始
    const handleTouchStart = (e: TouchEvent) => {
      if (lockedRef.current) return;

      touchStartY = e.touches[0].clientY;
      hasMoved = false;
    };

    // タッチ移動
    const handleTouchMove = (e: TouchEvent) => {
      // すでに移動済みまたはロック中なら処理しない
      if (hasMoved || lockedRef.current) return;

      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // スワイプ距離が十分か確認（50px以上）
      if (Math.abs(diff) < 50) return;

      const direction = diff > 0 ? 1 : -1;

      // 境界チェック
      if ((direction < 0 && activeCategory === 0) ||
          (direction > 0 && activeCategory === servicesByCategory.length - 1)) {
        return; // 親コンポーネントにスクロールを委任
      }

      // デフォルト動作をキャンセル
      e.preventDefault();

      // 移動済みフラグを立てる（2回目以降の処理を防止）
      hasMoved = true;

      // カテゴリ変更をトリガー
      triggerCategoryChange(direction as 1 | -1);
    };

    // イベントリスナーを追加
    section.addEventListener('touchstart', handleTouchStart);
    section.addEventListener('touchmove', handleTouchMove, { passive: false });

    // クリーンアップ
    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeCategory, servicesByCategory.length, allowScroll]);

  // キーボードイベント用の監視
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lockedRef.current) return;

      let direction: 1 | -1 | null = null;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        direction = 1;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        direction = -1;
      } else {
        return; // 対象外のキー
      }

      // 境界チェック
      if ((direction === -1 && activeCategory === 0) ||
          (direction === 1 && activeCategory === servicesByCategory.length - 1)) {
        if (direction === -1) {
          allowScroll?.('up');
        } else {
          allowScroll?.('down');
        }
        return;
      }

      // デフォルト動作をキャンセル
      e.preventDefault();

      // カテゴリ変更をトリガー
      triggerCategoryChange(direction);
    };

    // イベントリスナーを追加
    window.addEventListener('keydown', handleKeyDown);

    // クリーンアップ
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCategory, servicesByCategory.length, allowScroll]);

  // ドットクリックハンドラ
  const handleDotClick = (index: number) => {
    if (lockedRef.current || index === activeCategory) return;

    // ロックをかける
    lockedRef.current = true;

    // カテゴリを更新
    setActiveCategory(index);

    // トランジション時間後にロック解除
    setTimeout(() => {
      lockedRef.current = false;
    }, 600);
  };

  return (
    <section id="services" ref={sectionRef} className="h100 por ovh">
      <div className="container mxa px4 pt11">
        <div className="tac">
          <h2 className="fs5xl fw9 mb4">Services</h2>
          <div className="w16 h1 bg-primary-600 mxa"></div>
        </div>
      </div>

      <div className="h100 por inset-0 pt-28">
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
        onClick={handleDotClick}
      />
    </section>
  );
};

export default ServiceSection;