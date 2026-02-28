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
        
        {/* HEADER STATEMENT */}
        <div className="text-center max-w-4xl mx-auto mb-24">
           <div className="inline-block glass-panel text-burnished-gold font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest text-xs">
              {t('badge') || 'The Prestige Process'}
           </div>
           <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight font-playfair">
              {t('title_1') || 'Crafting Generations'} <span className="text-burnished-gold italic block">{t('title_2') || 'Of Stone.'}</span>
           </h2>
           <p className="text-xl text-mortar-gray leading-relaxed font-light max-w-3xl mx-auto">
              {t('desc') || 'We do not cut corners. From the first architectural drafted line to the final sealing of the stone, our white-glove construction process ensures uncompromising excellence.'}
           </p>
        </div>

        {/* HORIZONTAL TIMELINE */}
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 relative">
           <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-burnished-gold/50 to-transparent z-0"></div>
           
           {[
             { step: '01', title: 'Consultation & Drafting', desc: 'On-site conceptualization and structural engineering blueprints.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
             { step: '02', title: 'Material Selection', desc: 'Hand-selecting premium, climate-tested natural stone and brick.', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
             { step: '03', title: 'Master Construction', desc: 'Meticulous masonry by licensed, insured Texas artisans.', icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
             { step: '04', title: 'Final Reveal', desc: 'White-glove site cleanup and comprehensive client walkthrough.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
           ].map((phase, i) => (
             <div key={i} className="relative z-10 flex flex-col items-center text-center group">
               <div className="w-16 h-16 rounded-full bg-midnight-slate shadow-xl border-2 border-white/5 flex items-center justify-center text-burnished-gold group-hover:bg-burnished-gold group-hover:text-midnight-slate group-hover:scale-110 group-hover:border-burnished-gold transition-all duration-300 mb-6 relative">
                 <div className="absolute inset-0 rounded-full bg-burnished-gold/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={phase.icon}></path></svg>
               </div>
               <div className="text-xs font-bold text-burnished-gold uppercase tracking-widest mb-3 font-playfair">{phase.step}</div>
               <h3 className="font-bold text-sandstone text-xl font-playfair mb-3">{phase.title}</h3>
               <p className="text-mortar-gray font-light text-sm leading-relaxed max-w-xs">{phase.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
export default ValueStack;
