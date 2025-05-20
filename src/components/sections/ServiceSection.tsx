import React from 'react';
import Image from 'next/image';
import * as motion from 'framer-motion/client';
import { HomePage, Service } from '@/types/strapi';
import { getStrapiImageUrl } from '@/utils/helpers';

interface ServiceSectionProps {
  homeData: HomePage;
  services: Service[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ homeData, services }) => {
  return (
    <section id="services" className="py-20">
      <div className="container mxa px4">
        <div className="tac mb-16">
          <h2 className="fs3xl fw9">{homeData.servicesTitle}</h2>
          <div className="w-16 h-1 bg-primary-600 mx-auto mt-4"></div>
        </div>

        <div className="gr gc1 md:gc2 lg:gc3 gg8">
          {services.map((service, index) => {
            const iconUrl = getStrapiImageUrl(service.icon);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6">
                  <Image
                    src={iconUrl}
                    alt={service.title}
                    width={64}
                    height={64}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {service.title}
                </h3>
                <div
                  className="text-gray-700 text-center"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;