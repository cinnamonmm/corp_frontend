import React from 'react';
import * as motion from 'framer-motion/client';
import { HomePage } from '@/types/strapi';

interface ContactSectionProps {
  homeData: HomePage;
}

const ContactSection: React.FC<ContactSectionProps> = ({ homeData }) => {
  return (
    <section id="contact" className="h100 fl fdc jcs pt-28">
      <div className="container mxa px4 mt10">
        <div className="tac mb10">
          <h2 className="fs5xl fw9 mb4">{homeData.contactTitle}</h2>
          <div className="w16 h1 bg-primary-600 mxa mt4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className='w100 px4 mxa fl jcc'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfxdZKQ13gvo_kdMq05hlF12_piPX-RK36-gBcDvExyEmFPZA/viewform?embedded=true" width="640" height="689" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;