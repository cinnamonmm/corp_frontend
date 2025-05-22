import React from 'react';
// import Image from 'next/image';
import { motion } from 'framer-motion';
import { Service } from '@/types/strapi';
// import { getStrapiImageUrl } from '@/utils/helpers';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  // const iconUrl = getStrapiImageUrl(service.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bgwhite10 br1 shadow-lg p4 hover:shadow-xl transition duration-300"
    >
      {/* <div className="w-16 h-16 mxa mb6">
        <Image
          src={iconUrl}
          alt={service.title}
          width={64}
          height={64}
          style={{ objectFit: 'contain' }}
        />
      </div> */}
      <h3 className="text-xl fwb mb4 text-center">
        {service.title}
      </h3>
      <div
        className="text-gray-700 text-center"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />
    </motion.div>
  );
};

export default ServiceCard;