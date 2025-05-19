import React from 'react';
import Image from 'next/image';
import * as motion from 'framer-motion/client';
import { HomePage } from '../../types/strapi';
import { getStrapiImageUrl } from '../../utils/helpers';

interface AboutSectionProps {
  homeData: HomePage;
}

const AboutSection: React.FC<AboutSectionProps> = ({ homeData }) => {
  const aboutImageUrl = getStrapiImageUrl(homeData.aboutImage);

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src={aboutImageUrl}
                alt={homeData.aboutTitle}
                width={600}
                height={400}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {homeData.aboutTitle}
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: homeData.aboutDescription }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;