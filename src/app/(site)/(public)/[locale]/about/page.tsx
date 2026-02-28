import React from 'react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about_page' });
  const settings: any = {
    missionStatement: null,
    stats: [
        { value: '45+', label: 'Years Experience' },
        { value: '1,250', label: 'Projects Built' },
        { value: '100%', label: 'Craftsmanship' },
        { value: '5-Star', label: 'Satisfaction' }
    ],
    values: [
        { title: 'Generational Craftsmanship', description: 'We believe in building structures once, engineering them to endure for a lifetime. Every stone is hand-selected and precisely laid.' },
        { title: 'Architectural Integrity', description: 'From foundational blockwork to the final mortar joint, we adhere strictly to the highest structural codes in Texas masonry.' },
        { title: 'White-Glove Service', description: 'We treat your property with absolute respect, maintaining pristine jobsites and guaranteeing transparent communication from draft to final walkthrough.' }
    ],
    licenseNumber: null,
    insuranceAmount: null
  };

  return (
    <div className="min-h-screen bg-sandstone font-work-sans text-midnight-slate flex flex-col">
      
      {/* HERO: Heritage Story */}
      <section className="bg-midnight-slate text-white pt-48 pb-32 relative overflow-hidden min-h-[60vh] flex flex-col justify-center border-b border-white/10">
            {/* Texture Background */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, #000 10px), repeating-linear-gradient(#c5a05955, #c5a05955)' }}>
            </div>
            
            {/* Soft Glow */}
            <div className="absolute bottom-0 left-1/4 w-1/2 h-full bg-gradient-to-t from-burnished-gold/10 to-transparent pointer-events-none blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-burnished-gold/10 border border-burnished-gold/30 text-burnished-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-10">
                        {t('since')}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black leading-tight mb-8 font-playfair tracking-normal">
                        {t('heading_1')} <br/>
                        <span className="text-burnished-gold italic">
                            {t('heading_2')}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-sandstone max-w-3xl mx-auto leading-relaxed font-light mt-12 pb-8 border-b border-white/10">
                        {settings.missionStatement || "Founded on the principle that masterful masonry is the foundation of a lasting legacy. We engineer enduring beauty and structural integrity into every project we touch."}
                    </p>
                </div>
            </div>
        </section>

        {/* STATS LUXURY BAR */}
        <div className="relative z-20 -mt-16 w-full max-w-6xl mx-auto px-6">
            <div className="glass-panel rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10 flex flex-wrap lg:flex-nowrap justify-between gap-8 backdrop-blur-xl">
                 {settings.stats?.map((stat: any, index: number) => (
                    <div key={index} className="flex-1 text-center md:text-left border-b lg:border-b-0 lg:border-r last:border-0 border-white/10 pb-6 lg:pb-0 px-4">
                        <div className="text-5xl md:text-6xl font-black text-white mb-2 font-playfair">{stat.value}</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-burnished-gold">{stat.label}</div>
                    </div>
                 ))}
            </div>
        </div>

        {/* CORE VALUES: Editorial Layout */}
        <section className="py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    <div className="lg:w-1/3 sticky top-32">
                        <div className="w-16 h-1 bg-burnished-gold mb-8"></div>
                        <h2 className="text-5xl font-black text-midnight-slate mb-6 font-playfair leading-tight">{t('standard_heading')}</h2>
                        <p className="text-mortar-gray text-xl font-light">
                            {t('standard_desc')}
                        </p>
                    </div>
                    
                    <div className="lg:w-2/3 space-y-16 mt-12 lg:mt-0">
                        {settings.values?.map((value: any, index: number) => (
                            <div key={index} className="flex gap-8 group">
                                <div className="text-6xl font-black text-black/5 group-hover:text-burnished-gold/30 transition-colors select-none font-playfair">
                                    0{index + 1}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-3xl font-black text-midnight-slate mb-4 font-playfair">{value.title}</h3>
                                    <p className="text-steel-gray leading-relaxed text-lg font-light">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* TRUST / CERTIFICATIONS */}
        <section className="bg-midnight-slate py-32 px-6 border-t border-white/5 texture-stone">
            <div className="container mx-auto text-center max-w-5xl">
                <h2 className="text-4xl md:text-5xl font-black text-sandstone mb-16 font-playfair">{t('licensed_heading')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <div className="glass-card-light p-8 rounded-3xl flex flex-col justify-center items-center h-56 hover-lift border border-white/5">
                        <svg className="w-10 h-10 text-burnished-gold mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4L15 9V3H9zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div className="font-bold text-sandstone/50 text-[10px] uppercase tracking-widest mb-2">LICENSING</div>
                        <div className="font-bold text-white text-lg font-playfair">{settings.licenseNumber || "TX Registered Builder"}</div>
                    </div>
                    <div className="glass-card-light p-8 rounded-3xl flex flex-col justify-center items-center h-56 hover-lift border border-white/5">
                        <svg className="w-10 h-10 text-burnished-gold mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        <div className="font-bold text-sandstone/50 text-[10px] uppercase tracking-widest mb-2">PROTECTION</div>
                        <div className="font-bold text-white text-lg font-playfair">{settings.insuranceAmount || "$2M General Liability"}</div>
                    </div>
                    <div className="glass-card-light p-8 rounded-3xl flex flex-col justify-center items-center h-56 hover-lift border border-white/5">
                        <svg className="w-10 h-10 text-burnished-gold mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                        <div className="font-bold text-sandstone/50 text-[10px] uppercase tracking-widest mb-2">MATERIALS</div>
                        <div className="font-bold text-white text-lg font-playfair">Premium Sourced Stone</div>
                    </div>
                    <div className="glass-card-light p-8 rounded-3xl flex flex-col justify-center items-center h-56 hover-lift border border-white/5">
                         <svg className="w-10 h-10 text-burnished-gold mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                        <div className="font-bold text-sandstone/50 text-[10px] uppercase tracking-widest mb-2">REPUTATION</div>
                        <div className="font-bold text-white text-lg font-playfair">5-Star BBB Rated</div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="bg-sandstone py-24 px-6 text-center">
             <h2 className="text-midnight-slate text-4xl md:text-5xl font-black mb-10 font-playfair">{t('cta_heading')}</h2>
             <Link href="/contact" className="inline-block bg-midnight-slate hover:bg-burnished-gold text-white hover:text-midnight-slate font-black py-5 px-12 rounded-xl transition-all transform hover:-translate-y-1 shadow-2xl uppercase tracking-widest text-sm">
                {t('cta_button')}
             </Link>
        </section>

    </div>
  );
}
