import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16">
          <div className="flex justify-between items-end flex-wrap gap-8">
            <div className="max-w-[600px]">
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm">Portfolio</span>
              <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">Proof of our technological impact.</h2>
            </div>
            <a href="#" className="btn btn-outline flex items-center gap-2 px-6 py-3 rounded-xl font-semibold">
              View Case Studies <ArrowRight size={18} />
            </a>
          </div>
        </div>
 
        <div className="grid grid-cols-12 gap-6">
          {portfolioData.items.map((proj, idx) => {
            let itemClass = "relative overflow-hidden obsidian-glass min-h-[400px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/10 group border-white/5 hover:border-accent/40";
            if (idx === 0) itemClass += " lg:col-span-8 col-span-12";
            else if (idx === 1) itemClass += " lg:col-span-4 col-span-12";
            else itemClass += " col-span-12 min-h-[300px]";

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={itemClass}
              >
                <div className="absolute inset-0 z-0 bg-primary-bg overflow-hidden">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/20 to-transparent"></div>
                </div>
                
                <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-end">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4">{proj.title}</h3>
                  <div className="max-w-[500px]">
                    <p className="mb-6 text-on-surface-variant">
                      <span className="text-white font-bold">Solution:</span> {proj.solution}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                      <span className="text-accent font-bold text-sm">Result: {proj.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
