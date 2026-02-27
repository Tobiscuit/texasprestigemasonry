'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

const ValueStack: React.FC = () => {
  const t = useTranslations('value_stack');
  
  const items = [
    { title: t('licensed_title') || 'Master Draftsmen', desc: t('licensed_desc') || 'Every project is engineered for lasting structural integrity.', icon: 'shield' },
    { title: t('fees_title') || 'Generational Stone', desc: t('fees_desc') || 'We source only premium, time-tested materials for your build.', icon: 'tag' },
    { title: t('window_title') || 'White-Glove Service', desc: t('window_desc') || 'From consultation to cleanup, we treat your property with absolute respect.', icon: 'clock' },
    { title: t('background_title') || 'Fully Insured', desc: t('background_desc') || 'Comprehensive coverage for total peace of mind on every jobsite.', icon: 'user' }
  ];

  return (
    <section className="py-32 bg-midnight-slate text-sandstone relative overflow-hidden texture-stone border-t border-white/5">
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-terracotta-clay/10 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: The Proposition */}
          <div>
            <div className="inline-block glass-panel text-burnished-gold font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest text-xs">
              {t('badge') || 'The Prestige Standard'}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight font-playfair">
              {t('title_1') || 'Uncompromising'}<br />
              <span className="text-burnished-gold italic">{t('title_2') || 'Quality & Care.'}</span>
            </h2>
            <p className="text-lg text-mortar-gray mb-10 leading-relaxed font-light">
              {t('desc') || 'We do not cut corners. Whether we are laying a sprawling commercial foundation or hand-carving stones for a residential fire pit, our commitment to excellence remains absolute.'}
            </p>
            <a href="/contact" className="inline-flex items-center text-sandstone border-b border-burnished-gold/50 pb-1 font-semibold hover:text-burnished-gold hover:border-burnished-gold transition-colors">
              {t('sla_link') || 'Learn About Our Warranty'} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

          {/* RIGHT: The Stack */}
          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-6 glass-card-light p-6 rounded-2xl hover-lift transition-all group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-burnished-gold/10 flex items-center justify-center text-burnished-gold border border-burnished-gold/20 group-hover:bg-burnished-gold group-hover:text-midnight-slate transition-colors">
                  {item.icon === 'shield' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                  {item.icon === 'tag' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>}
                  {item.icon === 'clock' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                  {item.icon === 'user' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>}
                </div>
                <div>
                  <h3 className="font-bold text-sandstone text-xl font-playfair mb-2">{item.title}</h3>
                  <p className="text-mortar-gray font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
export default ValueStack;
