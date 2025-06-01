import React from 'react';
import * as motion from 'framer-motion/client';
import { HomePage } from '@/types/strapi';
import { FaLine } from 'react-icons/fa';
import { FaFeatherPointed } from 'react-icons/fa6';

interface ContactSectionProps {
  homeData: HomePage;
}

const ContactSection: React.FC<ContactSectionProps> = ({ homeData }) => {
  return (
    <section id="contact" className="h100 fl fdc jcs pt-28 por">
      <div className="container mxa px4 mt10">
        <div className="tac mb10">
          <h2 className="fs5xl fw9 mb4">{homeData.contactTitle}</h2>
          <div className="w16 h1 bg-primary-600 mxa mt4"></div>
        </div>

        <div className="fl fdc po-c">
          <div className='fl jcc mb7'>以下の Google Form または LINEからご相談内容をお送りください。</div>
          <motion.div
            className='w100 px4 mxa fl fdc jcc'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <a
              href="https://forms.gle/pNTUCqF5ZbKGyJzPA"
              target="_blank"
              rel="noopener noreferrer"
              className="fl aic g2 link hover:opacity-80 transition-opacity fs2xl mb4"
            >
              <FaFeatherPointed className="text-4xl" />
              <span className="text-lg font-medium">Form から送信</span>
            </a>
            <a
              href="https://lin.ee/PpUlbVA"
              target="_blank"
              rel="noopener noreferrer"
              className="fl aic g2 text-[#00B900] hover:opacity-80 transition-opacity fs2xl"
            >
              <FaLine className="text-4xl" />
              <span className="text-lg font-medium">LINE公式アカウントを追加</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;