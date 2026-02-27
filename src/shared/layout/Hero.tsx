'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const t = useTranslations('hero');
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden texture-stone">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-midnight-slate z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta-clay/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-burnished-gold/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Prestige Badge */}
        <div className="inline-flex items-center gap-2 glass-panel text-burnished-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 hover-lift">
          <span className="w-2 h-2 rounded-full bg-burnished-gold animate-pulse"></span>
          {t('excellence_badge') || 'Excellence in Craftsmanship'}
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 tracking-tight font-playfair drop-shadow-2xl text-sandstone">
          {t('title_line1') || 'Enduring Beauty.'}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnished-gold to-yellow-600">
            {t('title_line2') || 'Masterful Masonry.'}
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-mortar-gray mb-12 max-w-2xl leading-relaxed font-light">
          {t('subtitle') || 'Elevating Texas properties with premium outdoor kitchens, custom pavers, elegant fire pits, and structural brick & block work. Built to last generations.'}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <Link href="/contact?type=estimate" className="btn-premium w-full sm:w-auto text-center hover-lift flex items-center justify-center gap-2">
            {t('free_estimate') || 'Claim Free Estimate'}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link href="/portfolio" className="glass-card-light text-sandstone font-semibold py-3 px-8 rounded flex items-center justify-center gap-2 hover-lift transition-all hover:bg-white/10 w-full sm:w-auto text-center">
            {t('view_portfolio') || 'View Our Work'}
          </Link>
        </div>

        {/* Stats / Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10 w-full">
          {[
            { label: 'Commercial & Residential', value: '100%' },
            { label: 'Free Estimates', value: '24hr' },
            { label: 'Stone Repairs', value: 'Expert' },
            { label: 'Outdoor Living', value: 'Custom' }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl font-playfair text-burnished-gold mb-2">{stat.value}</span>
              <span className="text-xs text-mortar-gray uppercase tracking-wider text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
