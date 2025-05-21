import React from 'react';
import * as motion from 'framer-motion/client';
import { HomePage } from '../../types/strapi';

interface AboutSectionProps {
  homeData: HomePage;
}

const AboutSection: React.FC<AboutSectionProps> = ({ homeData }) => {
  return (
    <section id="about" className="h100 fl aic jcc bg-gray-50 pt-28">
      <div className="container mxa px4 mt10">
        <div className="tac mb10">
          <h2 className="fs5xl fw9 mb4">{homeData.aboutTitle}</h2>
          <div className="w16 h1 bg-primary-600 mxa"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="leading-relaxed mx13 ls05">
              <h3 className="fs3xl mb7">「未来」を共創する、ITと戦略のプロフェッショナル集団</h3>
              <p className="mb3 fsxl">
                我々は単なるシステム開発会社ではありません。
              </p>
              <p className="mb5 fsxl">
                事業成長を最大化するために、
              </p>
              <p className="mb5 ml5 fw9 fsxl">
                「開発業務」で確かな技術力を提供し
              </p>
              <p className="mb5 ml5 fw9 fsxl">
                「DX推進」でビジネスモデル変革を支援し
              </p>
              <p className="mb5 ml5 fw9 fsxl">
                「戦略コンサルティング」で未来の羅針盤を描く
              </p>
              <p className="mb5 fsxl">
                唯一無二のパートナーを目指す
              </p>
              <p className="mb5 fsxl">
                プロフェッショナル集団の組織です。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;