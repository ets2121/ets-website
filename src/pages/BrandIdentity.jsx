import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import brandIdentityData from '../data/brandIdentity.json';

const BrandIdentity = () => {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '100dvh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center', background: 'linear-gradient(90deg, #FFFFFF 0%, #00F2FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Strategic Brand Identity
          </h1>

          {/* Exec Summary */}
          <section style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ color: '#00F2FF', marginBottom: '1rem', borderBottom: '1px solid rgba(0,242,255,0.2)', paddingBottom: '0.5rem' }}>
              1. {brandIdentityData.executiveSummary.title}
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {brandIdentityData.executiveSummary.content}
            </p>
          </section>

          {/* Core Purpose */}
          <section style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ color: '#00F2FF', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,242,255,0.2)', paddingBottom: '0.5rem' }}>
              2. {brandIdentityData.corePurpose.title}
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mission Statement</h3>
              <p style={{ color: '#B0C4DE', fontStyle: 'italic', borderLeft: '4px solid #00F2FF', paddingLeft: '1rem', margin: 0 }}>
                "{brandIdentityData.corePurpose.mission}"
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Primary Objective</h3>
              <p style={{ color: '#E2E8F0', margin: 0 }}>
                {brandIdentityData.corePurpose.objective}
              </p>
            </div>

            <div>
              <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '0.5rem' }}>The Vision</h3>
              <p style={{ color: '#E2E8F0', margin: 0 }}>
                {brandIdentityData.corePurpose.vision}
              </p>
            </div>
          </section>

          {/* Operational Pillars */}
          <section style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
            <h2 style={{ color: '#00F2FF', marginBottom: '1rem', borderBottom: '1px solid rgba(0,242,255,0.2)', paddingBottom: '0.5rem' }}>
              3. {brandIdentityData.operationalPillars.title}
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {brandIdentityData.operationalPillars.description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {brandIdentityData.operationalPillars.pillars.map((pillar, idx) => (
                <div key={idx} style={{ background: 'rgba(0,242,255,0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #00F2FF' }}>
                  <h3 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{pillar.name}</h3>
                  <span style={{ color: '#00F2FF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '1rem' }}>{pillar.subtitle}</span>
                  <p style={{ color: '#B0C4DE', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Brand DNA */}
          <section style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
            <h2 style={{ color: '#00F2FF', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,242,255,0.2)', paddingBottom: '0.5rem' }}>
              4. {brandIdentityData.brandDNA.title}
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Identity Archetype</h3>
              <p style={{ color: '#B0C4DE', fontStyle: 'italic', borderLeft: '4px solid #00F2FF', paddingLeft: '1rem', margin: 0 }}>
                "{brandIdentityData.brandDNA.archetype}"
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {brandIdentityData.brandDNA.attributes.map((attr, idx) => (
                <div key={idx} style={{ background: 'rgba(0,242,255,0.03)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(0,242,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: '#00F2FF', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Attribute</span>
                  <strong style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{attr.label}</strong>
                  <div style={{ width: '20px', height: '1px', background: '#00F2FF', marginBottom: '0.5rem' }}></div>
                  <span style={{ color: '#00F2FF', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Strategic Definition</span>
                  <p style={{ color: '#E2E8F0', margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{attr.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core Values / Ethics */}
          <section style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
            <h2 style={{ color: '#00F2FF', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,242,255,0.2)', paddingBottom: '0.5rem' }}>
              5. {brandIdentityData.differentiators.title}
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {brandIdentityData.differentiators.description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {brandIdentityData.differentiators.items.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(0,242,255,0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #00F2FF' }}>
                  <h3 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                  <p style={{ color: '#B0C4DE', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Ethics */}
          <section style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
            <h2 style={{ color: '#00F2FF', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,242,255,0.2)', paddingBottom: '0.5rem' }}>
              6. {brandIdentityData.ethics.title}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {brandIdentityData.ethics.items.map((item, idx) => (
                <div key={idx} style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#00F2FF' }}>//</span> {item.name}
                  </h3>
                  <p style={{ color: '#B0C4DE', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Strategic Outlook */}
          <section style={{ background: 'linear-gradient(135deg, rgba(0,242,255,0.1) 0%, rgba(11,28,56,0.5) 100%)', padding: '3rem', borderRadius: '12px', border: '1px solid rgba(0,242,255,0.2)', marginTop: '4rem', textAlign: 'center' }}>
            <h2 style={{ color: '#00F2FF', marginBottom: '1rem' }}>
              7. {brandIdentityData.outlook.title}
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.15rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '600px' }}>
              "{brandIdentityData.outlook.content}"
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandIdentity;
