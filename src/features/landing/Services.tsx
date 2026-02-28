'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ServiceFeature {
  feature: string;
}

interface Service {
  title: string;
  slug: string;
  category: string;
  description: string;
  highlight?: boolean | null;
  icon: string;
  features?: ServiceFeature[] | null;
}

interface ServicesProps {
  services?: Service[];
}

const IconMap: Record<string, React.ReactNode> = {
  fire: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 7.143 10.857c0 0 .5-3 3-5 .5 3 2.5 4 4 6 1 1 2 2.5 2 4a3.5 3.5 0 01-1 3.2v.057z" />
    </svg>
  ),
  stone: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  home: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  default: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
    </svg>
  )
};

const Services: React.FC<ServicesProps> = ({ services = [] }) => {
  const t = useTranslations('services_landing');
  
  // High fidelity default data if DB is empty or during redesign
  const displayServices = services.length > 0 ? services : [
    { slug: 'kitchens', title: 'Outdoor Kitchens', category: 'Residential', description: 'Fully custom outdoor culinary spaces built with premium stone and state-of-the-art appliances.', highlight: true, icon: 'home' },
    { slug: 'pavers', title: 'Custom Pavers', category: 'Residential', description: 'Durable, beautiful paver installations for driveways, patios, and walkways.', icon: 'stone' },
    { slug: 'fire-pits', title: 'Elegant Fire Pits', category: 'Residential', description: 'Gather around a masterful stone fire pit or outdoor fireplace.', icon: 'fire' },
    { slug: 'commercial', title: 'Commercial Brick & Block', category: 'Commercial', description: 'Structural masonry, custom retaining walls, and large-scale brickwork for businesses.', icon: 'stone' }
  ];

  return (
    <section id="services" className="py-32 bg-midnight-slate relative overflow-hidden texture-stone">
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-terracotta-clay/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-sandstone mb-6 font-playfair tracking-normal">
            {t('heading') || 'Our Core'} <span className="text-burnished-gold italic">{t('heading_accent') || 'Expertise'}</span>
          </h2>
          <p className="text-lg text-mortar-gray font-light">
            {t('subheading') || 'From sprawling commercial structural work to breathtaking residential outdoor living spaces, our masonry masters deliver on every dimension.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {displayServices.map((service, i) => {
            const isFeatured = i === 0;
            const isWide = i === 1;
            
            return (
            <div 
              key={service.slug}
              className={`
                rounded-3xl p-8 transition-all duration-500 hover-lift relative overflow-hidden group flex flex-col
                ${service.highlight ? 'glass-panel text-sandstone shadow-[0_0_40px_rgba(197,160,89,0.1)]' : 'glass-card-light text-sandstone'}
                ${isFeatured ? 'md:col-span-2 md:row-span-2 min-h-[500px] justify-end' : ''}
                ${isWide ? 'md:col-span-2 min-h-[240px]' : ''}
                ${!isFeatured && !isWide ? 'md:col-span-1 min-h-[240px]' : ''}
              `}
            >
              {service.category === 'Commercial' && (
                 <div className="absolute top-0 right-0 bg-mortar-gray/20 text-mortar-gray text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest backdrop-blur-md">
                   PRO
                 </div>
              )}
              
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 transition-transform group-hover:scale-110 shadow-lg ${service.highlight ? 'bg-burnished-gold text-midnight-slate' : 'bg-midnight-slate/50 border border-white/10 text-burnished-gold'}`}>
                {IconMap[service.icon] || IconMap.default}
              </div>
              
              <h3 className={`font-bold mb-4 font-playfair group-hover:text-burnished-gold transition-colors ${isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                {service.title}
              </h3>
              
              <p className={`text-mortar-gray font-light leading-relaxed mb-8 flex-grow ${isFeatured ? 'text-lg max-w-md' : 'text-sm'}`}>
                {service.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-burnished-gold/30 transition-colors">
                <Link href={`/contact?service=${service.slug}`} className="text-sm font-semibold uppercase tracking-wider text-burnished-gold flex items-center gap-2 group/link">
                  {t('cta_learn_more') || 'Request Quote'}
                  <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Services;
