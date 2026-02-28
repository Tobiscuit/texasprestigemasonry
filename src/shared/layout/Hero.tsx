'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const t = useTranslations('hero');
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden texture-stone py-24 lg:py-0">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-midnight-slate z-0"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-terracotta-clay/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-burnished-gold/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Typography */}
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 glass-panel text-burnished-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 hover-lift">
            <span className="w-2 h-2 rounded-full bg-burnished-gold animate-pulse"></span>
            {t('excellence_badge') || 'Excellence in Craftsmanship'}
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight font-playfair drop-shadow-2xl text-sandstone">
            {t('title_line1') || 'Enduring Beauty.'}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnished-gold to-yellow-600">
              {t('title_line2') || 'Masterful Masonry.'}
            </span>
          </h1>
          
          <p className="text-lg text-mortar-gray mb-10 max-w-xl leading-relaxed font-light">
            {t('subtitle') || 'Elevating Texas properties with premium outdoor kitchens, custom pavers, elegant fire pits, and structural brick & block work. Built to last generations.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/contact?type=estimate" className="btn-premium justify-center hover-lift flex items-center gap-2">
              {t('free_estimate') || 'Claim Free Estimate'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/portfolio" className="glass-card-light text-sandstone font-semibold py-3 px-8 rounded flex items-center justify-center gap-2 hover-lift transition-all hover:bg-white/10">
              {t('view_portfolio') || 'View Our Work'}
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-white/10 w-full max-w-md">
            {[
              { label: 'Commercial & Residential', value: '100%' },
              { label: 'Bespoke Stonework', value: 'Custom' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <span className="text-3xl font-playfair text-burnished-gold mb-1">{stat.value}</span>
                <span className="text-[10px] text-mortar-gray uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Asymmetrical Grid */}
        <div className="relative w-full h-full min-h-[500px] hidden lg:block">
          <div className="absolute top-0 right-0 w-[45%] h-[60%] glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover-lift transition-all duration-700">
            <div className="absolute inset-0 bg-midnight-slate/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center text-burnished-gold/30">
               <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
          </div>
          <div className="absolute bottom-[10%] left-0 w-[55%] h-[50%] glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover-lift transition-all duration-700 z-10 translate-y-4">
            <div className="absolute inset-0 bg-terracotta-clay/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center text-burnished-gold/30">
               <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
          </div>
          <div className="absolute bottom-[-5%] right-[10%] w-[35%] h-[40%] glass-card-light rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover-lift transition-all duration-700 delay-100">
             <div className="absolute inset-0 bg-burnished-gold/10 mix-blend-multiply"></div>
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="text-4xl font-playfair text-burnished-gold mb-1">45+</div>
                <div className="text-[10px] text-sandstone uppercase tracking-widest font-bold">Years Combined<br/>Experience</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
