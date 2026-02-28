import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SmartLink from '@/shared/ui/SmartLink';
import ProjectCardImage from '@/features/landing/ProjectCardImage';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio_page' });
  
  // Replace with actual payload API later.
  const projects: any[] = [];

  return (
    <div className="min-h-screen bg-sandstone font-work-sans text-midnight-slate flex flex-col">
      <main className="flex-grow">
        
        {/* HERO: Exquisite Gallery */}
        <section className="bg-midnight-slate pt-40 pb-32 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-burnished-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto relative z-10 text-center max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-burnished-gold/10 border border-burnished-gold/20 text-burnished-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                    {t('badge')}
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tight text-white font-playfair">
                    {t('heading')} <span className="text-burnished-gold italic">{t('heading_accent')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-mortar-gray max-w-3xl mx-auto leading-relaxed font-light">
                    {t('subheading')}
                </p>
            </div>
        </section>

        {/* PROJECTS GRID */}
        <section className="py-24 px-6 bg-sandstone texture-stone">
            <div className="container mx-auto">
                
                {/* Filter/Status Bar */}
                <div className="flex justify-between items-center mb-16 border-b border-black/10 pb-6">
                    <div className="text-sm font-bold text-sandstone uppercase tracking-widest">
                        {t('showing')} <span className="text-burnished-gold">{projects.length}</span> {t('verified')}
                    </div>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-32 glass-panel border border-white/20 rounded-3xl">
                        <div className="w-20 h-20 rounded-full bg-burnished-gold/10 flex items-center justify-center text-burnished-gold mx-auto mb-6">
                             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-3xl font-playfair font-bold text-sandstone mb-4">{t('no_projects')}</h3>
                        <p className="text-mortar-gray text-lg font-light max-w-md mx-auto">{t('check_back')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {projects.map((project, index) => {
                            const firstGalleryItem = Array.isArray(project.gallery) && project.gallery.length > 0 ? project.gallery[0].image : null;
                            const imageUrl = typeof firstGalleryItem === 'object' && firstGalleryItem !== null && 'url' in firstGalleryItem
                                ? (firstGalleryItem.url || null)
                                : null;
                            
                            return (
                                <SmartLink 
                                    href={`/portfolio/${project.slug}`} 
                                    key={project.id}
                                    className="group relative block w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 bg-midnight-slate"
                                >
                                    {/* IMAGE LAYER */}
                                    <ProjectCardImage 
                                      slug={project.slug || ''} 
                                      imageUrl={imageUrl} 
                                      title={project.title} 
                                    />

                                    {/* OVERLAY GRADIENT */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-slate via-midnight-slate/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                                    {/* CONTENT LAYER */}
                                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10 transition-transform duration-500">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2 text-burnished-gold text-xs font-bold uppercase tracking-widest mb-3">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {project.location || 'Houston, TX'}
                                            </div>
                                            
                                            <h2 className="text-3xl md:text-5xl font-black text-sandstone leading-tight mb-4 group-hover:text-burnished-gold transition-colors font-playfair">
                                                {project.title}
                                            </h2>

                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                 <svg className="w-5 h-5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </SmartLink>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>

        {/* CALL TO ACTION: Consultation */}
        <section className="bg-midnight-slate py-32 border-t border-white/5 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-burnished-gold/5 rounded-full blur-[100px]"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="inline-block glass-panel text-burnished-gold font-bold px-5 py-2 rounded-full mb-8 uppercase tracking-widest text-xs">
                    {t('commercial_residential')}
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-sandstone mb-10 leading-tight font-playfair">
                    {t('cta_heading')} <br/><span className="text-burnished-gold italic">{t('cta_accent')}</span>
                </h2>
                <div className="flex justify-center">
                    <Link href="/contact" className="bg-burnished-gold hover:bg-white text-midnight-slate font-black py-5 px-10 rounded-xl transition-all shadow-xl hover:-translate-y-1 text-lg uppercase tracking-wider">
                        {t('cta_general')}
                    </Link>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
