import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm">{testimonialsData.subtitle}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">{testimonialsData.title}</h2>
        </motion.div>
      </div>

      {/* Auto-scroll Container */}
      <div className="relative flex overflow-hidden pb-8">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-380px * 4 - 2rem * 4)); } 
            }
            .testimonial-track {
              display: flex;
              gap: 2rem;
              width: max-content;
              animation: marquee 40s linear infinite;
            }
            .testimonial-track:hover {
              animation-play-state: paused;
            }
            @media (max-width: 600px) {
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-300px * 4 - 2rem * 4)); } 
              }
            }
          `}
        </style>
        
        <div className="testimonial-track">
          {[...testimonialsData.items, ...testimonialsData.items].map((test, idx) => (
            <div 
              key={idx}
              className="w-[300px] sm:w-[380px] p-6 sm:p-10 flex flex-col obsidian-glass border-white/5"
            >
              <div className="flex gap-1 mb-6 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow italic text-base sm:text-lg">
                "{test.text}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary-bg font-extrabold text-lg">
                  {test.initial}
                </div>
                <div>
                  <h4 className="text-white font-bold text-base m-0">{test.name}</h4>
                  <span className="text-accent text-xs font-bold uppercase tracking-wider">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
