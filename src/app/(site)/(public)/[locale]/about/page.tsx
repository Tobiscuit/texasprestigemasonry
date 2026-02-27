import React from 'react';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about_page' });
  const settings: any = {
    missionStatement: null,
    stats: [
        { value: '10+', label: 'Years Experience' },
        { value: '500+', label: 'Projects Completed' },
        { value: '100%', label: 'Satisfaction' },
        { value: '24/7', label: 'Support' }
    ],
    values: [
        { title: 'Craftsmanship', description: 'We believe in doing things once and doing them right.' },
        { title: 'Integrity', description: 'Honest pricing and clear communication.' }
    ],
    licenseNumber: null,
    insuranceAmount: null
  };

  return (
    <div className="min-h-screen bg-sandstone font-work-sans">
      
      {/* HERO: Blueprint Style */}
      <section className="bg-midnight-slate text-white pt-48 pb-24 relative overflow-hidden min-h-[50vh] flex flex-col justify-center">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-burnished-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        {t('since')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
                        {t('heading_1')} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnished-gold to-white">
                            {t('heading_2')}
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                        {settings.missionStatement || "Founded on the principle that a garage door is the primary moving part of your home's security envelope. We engineer reliability into every install."}
                    </p>
                </div>
            </div>
        </section>

        {/* STATS BAR */}
        <div className="bg-burnished-gold py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     {settings.stats?.map((stat: any, index: number) => (
                        <div key={index} className="text-center md:text-left border-r last:border-0 border-midnight-slate/10">
                            <div className="text-4xl md:text-5xl font-black text-midnight-slate mb-1">{stat.value}</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-midnight-slate/60">{stat.label}</div>
                        </div>
                     ))}
                </div>
            </div>
        </div>

        {/* CORE VALUES */}
        <section className="py-24 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <h2 className="text-4xl font-black text-midnight-slate mb-6">{t('standard_heading')}</h2>
                        <p className="text-steel-gray text-lg">
                            {t('standard_desc')}
                        </p>
                    </div>
                    
                    <div className="md:w-2/3 space-y-12">
                        {settings.values?.map((value: any, index: number) => (
                            <div key={index} className="flex gap-6 group">
                                <div className="text-5xl font-black text-gray-200 group-hover:text-burnished-gold transition-colors select-none">
                                    0{index + 1}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-midnight-slate mb-2">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
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
        <section className="bg-gray-100 py-24 px-6">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-black text-midnight-slate mb-12">{t('licensed_heading')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-center items-center h-48">
                        <div className="font-black text-gray-300 text-xl mb-2">LICENSE</div>
                        <div className="font-bold text-midnight-slate text-lg">{settings.licenseNumber || "TX Registered & Bonded"}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-center items-center h-48">
                        <div className="font-black text-gray-300 text-xl mb-2">INSURANCE</div>
                        <div className="font-bold text-midnight-slate text-lg">{settings.insuranceAmount || "$2M General Liability"}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-center items-center h-48">
                        <div className="font-black text-gray-300 text-xl mb-2">IDA MEMBER</div>
                        <div className="font-bold text-midnight-slate text-lg">Certified Techs</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-center items-center h-48">
                        <div className="font-black text-gray-300 text-xl mb-2">RATING</div>
                        <div className="font-bold text-midnight-slate text-lg">A+ BBB Accredited</div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="bg-midnight-slate py-24 px-6 text-center">
             <h2 className="text-white text-4xl font-black mb-8">{t('cta_heading')}</h2>
             <a href="/contact" className="inline-block bg-burnished-gold hover:bg-white text-midnight-slate font-bold py-4 px-10 rounded-xl transition-all transform hover:-translate-y-1 shadow-2xl">
                {t('cta_button')}
             </a>
        </section>

    </div>
  );
}
