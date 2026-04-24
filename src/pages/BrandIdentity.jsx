import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import brandIdentityData from '../data/brandIdentity.json';

const BrandIdentity = () => {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-dvh bg-primary-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-white to-accent bg-clip-text text-transparent py-2">
            Strategic Brand Identity
          </h1>

          {/* Exec Summary */}
          <section className="mb-12 obsidian-glass p-8 sm:p-12 border-white/5">
            <h2 className="text-accent text-xl sm:text-2xl font-bold mb-6 border-b border-accent/20 pb-4">
              1. {brandIdentityData.executiveSummary.title}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {brandIdentityData.executiveSummary.content}
            </p>
          </section>

          {/* Core Purpose */}
          <section className="mb-12 obsidian-glass p-8 sm:p-12 border-white/5">
            <h2 className="text-accent text-xl sm:text-2xl font-bold mb-8 border-b border-accent/20 pb-4">
              2. {brandIdentityData.corePurpose.title}
            </h2>
            
            <div className="mb-8 p-6 bg-accent/5 border-l-4 border-accent rounded-r-xl">
              <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-accent text-xs">//</span> Mission Statement
              </h3>
              <p className="text-accent font-italic text-base sm:text-lg italic leading-relaxed">
                "{brandIdentityData.corePurpose.mission}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h3 className="text-white font-bold text-lg mb-2">Primary Objective</h3>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {brandIdentityData.corePurpose.objective}
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h3 className="text-white font-bold text-lg mb-2">The Vision</h3>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {brandIdentityData.corePurpose.vision}
                </p>
              </div>
            </div>
          </section>

          {/* Operational Pillars */}
          <section className="mb-12 obsidian-glass p-8 sm:p-12 border-white/5">
            <h2 className="text-accent text-xl sm:text-2xl font-bold mb-6 border-b border-accent/20 pb-4">
              3. {brandIdentityData.operationalPillars.title}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed mb-10">
              {brandIdentityData.operationalPillars.description}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {brandIdentityData.operationalPillars.pillars.map((pillar, idx) => (
                <div key={idx} className="p-6 bg-accent/5 rounded-2xl border-l-4 border-accent transition-transform hover:-translate-y-1">
                  <h3 className="text-white font-bold text-lg">{pillar.name}</h3>
                  <span className="text-accent text-[10px] uppercase tracking-widest font-bold block mb-3">{pillar.subtitle}</span>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Brand DNA */}
          <section className="mb-12 obsidian-glass p-8 sm:p-12 border-white/5">
            <h2 className="text-accent text-xl sm:text-2xl font-bold mb-8 border-b border-accent/20 pb-4">
              4. {brandIdentityData.brandDNA.title}
            </h2>
            
            <div className="mb-10 p-6 bg-accent/5 border-l-4 border-accent rounded-r-xl">
              <h3 className="text-white font-bold text-lg mb-2">Identity Archetype</h3>
              <p className="text-accent font-bold text-xl sm:text-2xl italic leading-relaxed">
                "{brandIdentityData.brandDNA.archetype}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {brandIdentityData.brandDNA.attributes.map((attr, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-1">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest opacity-60">Attribute</span>
                  <strong className="text-white text-lg font-bold mb-2">{attr.label}</strong>
                  <div className="w-10 h-[1px] bg-accent/40 mb-3"></div>
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest opacity-60">Definition</span>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{attr.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Differentiators */}
          <section className="mb-12 obsidian-glass p-8 sm:p-12 border-white/5">
            <h2 className="text-accent text-xl sm:text-2xl font-bold mb-6 border-b border-accent/20 pb-4">
              5. {brandIdentityData.differentiators.title}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed mb-10">
              {brandIdentityData.differentiators.description}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {brandIdentityData.differentiators.items.map((item, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-2xl border-l-4 border-accent hover:bg-accent/5 transition-colors">
                  <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Ethics */}
          <section className="mb-12 obsidian-glass p-8 sm:p-12 border-white/5">
            <h2 className="text-accent text-xl sm:text-2xl font-bold mb-8 border-b border-accent/20 pb-4">
              6. {brandIdentityData.ethics.title}
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {brandIdentityData.ethics.items.map((item, idx) => (
                <div key={idx} className="pb-6 border-b border-white/5 last:border-0 group">
                  <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-accent transition-colors">
                    <span className="text-accent text-xs">//</span> {item.name}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Strategic Outlook */}
          <section className="p-12 rounded-3xl bg-gradient-to-br from-accent/20 to-primary-bg border border-accent/30 text-center shadow-3xl shadow-accent/10">
            <h2 className="text-accent text-2xl sm:text-3xl font-bold mb-6">
              7. {brandIdentityData.outlook.title}
            </h2>
            <p className="text-white text-lg sm:text-xl font-medium leading-relaxed italic max-w-2xl mx-auto">
              "{brandIdentityData.outlook.content}"
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandIdentity;
