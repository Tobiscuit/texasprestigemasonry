'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

interface Testimonial {
  author: string;
  location: string;
  quote: string;
  rating: number;
}

interface TrustIndicatorsProps {
  testimonials?: Testimonial[];
}

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ testimonials = [] }) => {
  const t = useTranslations('trust');

  const stats = [
    { label: t('active_techs') || 'Combined Experience', value: '45+', sub: 'Years', color: 'text-burnished-gold' },
    { label: t('projects_completed') || 'Projects Completed', value: '1,250', sub: 'Texas Wide', color: 'text-sandstone' },
    { label: t('satisfaction') || '5-Star Reviews', value: '100+', sub: 'Verified', color: 'text-sandstone' },
    { label: t('avg_response') || 'Commercial Partners', value: '15', sub: 'Active', color: 'text-sandstone' },
  ];
  
  // Dummy data if empty
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    { author: 'James R.', location: 'Austin, TX', quote: 'The outdoor kitchen they built for us completely transformed our backyard. The stonework is flawless.', rating: 5 },
    { author: 'Sarah M.', location: 'Dallas, TX', quote: 'Professional, clean, and incredible attention to detail. Our new fire pit is the centerpiece of our home.', rating: 5 }
  ];

  return (
    <section className="py-32 bg-midnight-slate texture-stone border-t border-white/5 relative z-10">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-sandstone mb-4 font-playfair tracking-normal">
              {t('title') || 'Trusted by Texas'}
            </h2>
            <p className="text-lg text-mortar-gray font-light">
              {t('subtitle') || 'Our reputation is built on solid stone. See what our clients say about the Texas Prestige difference.'}
            </p>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card-light p-8 rounded-2xl flex flex-col justify-center text-center hover-lift transition-all">
              <div className={`text-4xl font-playfair font-black ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-mortar-gray font-medium uppercase tracking-widest">{stat.label}</div>
              {stat.sub && <div className="text-xs text-white/40 mt-2 italic">{stat.sub}</div>}
            </div>
          ))}
        </div>

        {/* VERIFIED REVIEWS */}
        <div className="grid md:grid-cols-2 gap-8">
           {displayTestimonials.map((testimonial, i) => (
             <div key={i} className="glass-panel p-10 rounded-3xl hover-lift transition-all duration-500 relative">
               <div className="absolute top-8 right-10 text-6xl font-playfair text-white/5 leading-none">"</div>
               <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className="flex gap-1 text-burnished-gold">
                   {Array.from({ length: testimonial.rating }).map((_, star) => (
                     <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                     </svg>
                   ))}
                 </div>
               </div>
               <p className="text-xl font-light text-sandstone mb-10 leading-relaxed italic relative z-10">
                 &quot;{testimonial.quote}&quot;
               </p>
               <div className="flex items-center gap-5 pt-6 border-t border-white/10 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-burnished-gold/20 flex items-center justify-center text-burnished-gold font-bold text-lg font-playfair border border-burnished-gold/30">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sandstone uppercase tracking-wide text-sm">{testimonial.author}</div>
                    <div className="text-xs text-mortar-gray">{testimonial.location}</div>
                  </div>
               </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};
export default TrustIndicators;
