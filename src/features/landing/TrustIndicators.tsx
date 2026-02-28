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

        {/* METRICS MARQUEE */}
        <div className="w-full relative overflow-hidden mb-32 border-y border-white/5 py-12 bg-black/10">
          <div className="flex gap-16 md:gap-32 justify-center items-center flex-wrap md:flex-nowrap">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center flex-shrink-0 text-center hover-lift transition-transform">
                <div className={`text-5xl font-playfair font-black ${stat.color} mb-3 drop-shadow-lg`}>{stat.value}</div>
                <div className="text-sm text-sandstone font-medium uppercase tracking-widest">{stat.label}</div>
                {stat.sub && <div className="text-xs text-mortar-gray mt-2 italic">{stat.sub}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* SINGLE VERIFIED FOCUS TESTIMONIAL */}
        <div className="max-w-5xl mx-auto">
           {displayTestimonials.slice(0, 1).map((testimonial, i) => (
             <div key={i} className="glass-panel p-12 md:p-24 rounded-[40px] relative text-center border overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-burnished-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="absolute top-10 left-10 text-9xl font-playfair text-white/5 leading-none select-none">"</div>
               <div className="absolute bottom-[-20px] right-10 text-9xl font-playfair text-white/5 leading-none rotate-180 select-none">"</div>
               
               <div className="flex justify-center mb-10 relative z-10">
                 <div className="flex gap-2 text-burnished-gold">
                   {Array.from({ length: testimonial.rating }).map((_, star) => (
                     <svg key={star} className="w-6 h-6 fill-current drop-shadow-md" viewBox="0 0 24 24">
                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                     </svg>
                   ))}
                 </div>
               </div>
               
               <p className="text-3xl md:text-5xl font-light text-sandstone mb-16 leading-relaxed italic relative z-10 font-playfair max-w-4xl mx-auto">
                 &quot;{testimonial.quote}&quot;
               </p>
               
               <div className="flex flex-col items-center gap-2 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-midnight-slate shadow-[0_0_20px_rgba(197,160,89,0.2)] flex items-center justify-center text-burnished-gold font-bold text-2xl font-playfair border border-burnished-gold/30 mb-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="font-bold text-sandstone uppercase tracking-widest text-lg">{testimonial.author}</div>
                  <div className="text-sm text-burnished-gold italic tracking-wide">{testimonial.location}</div>
               </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};
export default TrustIndicators;
