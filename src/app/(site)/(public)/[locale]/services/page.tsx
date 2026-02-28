import React from 'react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// Icon mapping helper
const getIcon = (iconName: string, highlight: boolean) => {
  const className = `w-8 h-8 ${highlight ? 'text-midnight-slate' : 'text-burnished-gold'}`;
  
  switch (iconName) {
    case 'fire':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 7.143 10.857c0 0 .5-3 3-5 .5 3 2.5 4 4 6 1 1 2 2.5 2 4a3.5 3.5 0 01-1 3.2v.057z" /></svg>;
    case 'stone':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
    case 'home':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    default:
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>;
  }
};

export const dynamic = 'force-dynamic';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services_page' });
  
  // High fidelity default data if DB is empty or during redesign
  const services = [
    { slug: 'kitchens', title: 'Outdoor Kitchens', category: 'Residential', description: 'Fully custom outdoor culinary spaces built with premium stone and state-of-the-art appliances.', highlight: true, icon: 'home', features: [{feature: 'Custom Grills & Smokers'}, {feature: 'Stone Prep Surfaces'}, {feature: 'Integrated Fire Features'}] },
    { slug: 'pavers', title: 'Custom Pavers', category: 'Residential', description: 'Durable, beautiful paver installations for driveways, patios, and walkways.', icon: 'stone', features: [{feature: 'Travertine & Slate'}, {feature: 'Cobblestone Driveways'}, {feature: 'Pool Decking'}] },
    { slug: 'fire-pits', title: 'Elegant Fire Pits', category: 'Residential', description: 'Gather around a masterful stone fire pit or outdoor fireplace.', icon: 'fire', features: [{feature: 'Wood Burning'}, {feature: 'Gas Inserts'}, {feature: 'Custom Seating Walls'}] },
    { slug: 'commercial', title: 'Commercial Block', category: 'Commercial', description: 'Structural masonry, custom retaining walls, and large-scale brickwork for businesses.', icon: 'stone', features: [{feature: 'Structural CMU'}, {feature: 'Dumpster Enclosures'}, {feature: 'Brick Veneer'}] }
  ];

  return (
    <div className="min-h-screen bg-sandstone font-work-sans">
      
      {/* UNIFIED HERO: Master Craftsmanship */}
      <section className="relative bg-midnight-slate text-white overflow-hidden min-h-[50vh] flex flex-col justify-center py-24">
            <div className="absolute inset-0 opacity-10 blur-xl" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(197, 160, 89, 0.4) 0%, transparent 60%)' }}></div>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-burnished-gold/10 border border-burnished-gold/20 text-burnished-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                        {t('expert_craft')} || Master Artisans
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 font-playfair">
                        {t('new_title')} || Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnished-gold to-white italic">Stone & Brick</span>
                    </h1>
                    <p className="text-mortar-gray text-xl md:text-2xl mb-10 font-light max-w-2xl leading-relaxed">
                        {t('new_desc')} || Providing unmatched structural integrity and bespoke aesthetic design for Texas's finest residential and commercial properties.
                    </p>
                    <Link href="/contact" className="inline-flex items-center text-sandstone border-b border-burnished-gold/50 pb-1 font-semibold hover:text-burnished-gold hover:border-burnished-gold transition-colors tracking-wider uppercase text-sm">
                        {t('start_project')} || Consult with our draftsmen <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>
            </div>
        </section>

        {/* SERVICE MATRIX (Luxury Grid) */}
        <section className="py-32 bg-sandstone px-6 border-t border-white/10 texture-stone relative">
            <div className="container mx-auto relative z-10">
                <div className="max-w-3xl mb-20 text-center mx-auto">
                    <h2 className="text-midnight-slate text-4xl md:text-5xl font-black mb-6 font-playfair">{t('capabilities_heading')} || Core Capabilities</h2>
                    <p className="text-steel-gray text-lg font-light">
                        {t('capabilities_desc')} || Precision engineering meets generations of stonework tradition. We specialize strictly in premium new installations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className={`group relative p-10 rounded-[32px] transition-all duration-500 hover:-translate-y-2 flex flex-col ${service.highlight ? 'bg-burnished-gold text-midnight-slate shadow-xl' : 'glass-card-light bg-white/70 text-midnight-slate border border-black/5 hover:border-burnished-gold/30 shadow-lg'}`}>
                            
                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${service.highlight ? 'bg-midnight-slate shadow-lg' : 'bg-midnight-slate/5 border border-black/5 shadow-inner group-hover:bg-burnished-gold/10 transition-colors'}`}>
                                    {getIcon(service.icon, service.highlight || false)}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full ${service.highlight ? 'bg-midnight-slate/10 text-midnight-slate border border-midnight-slate/20' : 'bg-black/5 text-steel-gray'}`}>
                                    {service.category}
                                </span>
                            </div>

                            <h3 className="text-3xl font-black mb-4 font-playfair">{service.title}</h3>
                            <p className={`mb-10 font-light leading-relaxed flex-grow ${service.highlight ? 'text-midnight-slate/80' : 'text-steel-gray'}`}>
                                {service.description}
                            </p>

                            <div className={`mt-auto pt-8 border-t ${service.highlight ? 'border-midnight-slate/10' : 'border-black/5'}`}>
                                <Link href={`/contact?service=${service.slug}`} className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 group/link ${service.highlight ? 'text-midnight-slate' : 'text-burnished-gold'}`}>
                                    {t('configure_service')} || Learn More
                                    <svg className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}
