import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import servicesData from '../data/services.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', color: '#00F2FF' }}>{servicesData.title}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>{servicesData.subtitle}</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
        >
          {servicesData.items.map((svc, idx) => {
            const IconComponent = Icons[svc.icon];
            return (
              <motion.div key={idx} variants={itemVariants} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ marginBottom: '1.5rem', background: 'rgba(0, 242, 255, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                  {IconComponent && <IconComponent size={40} color="#00F2FF" />}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{svc.title}</h3>
                <p>{svc.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
