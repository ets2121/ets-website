import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import servicesData from '../data/services.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm">Services</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">{servicesData.subtitle}</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.items.map((svc, idx) => {
            const IconComponent = Icons[svc.icon];
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants} 
                className="obsidian-glass p-8 flex flex-col transition-all duration-300 hover:bg-surface-high hover:-translate-y-2 border-white/5 group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {IconComponent && <IconComponent size={28} className="text-accent" />}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">{svc.title}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">{svc.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
