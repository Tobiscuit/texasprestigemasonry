'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ContactHero } from '@/features/contact/ContactHero';
import { AddressAutocomplete } from '@/shared/ui/AddressAutocomplete';
import { ServiceAreaMap } from '@/shared/ui/ServiceAreaMap';

const ContactContent = () => {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type');
    const t = useTranslations('contact_page');
    
    // Determine Hero Type (Fall back to general consultation)
    let heroType: 'repair' | 'install' | 'contractor' | 'general' = 'general';
    if (typeParam === 'install') heroType = 'install';
    if (typeParam === 'contractor') heroType = 'contractor';

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        project_details: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressSelect = (place: google.maps.places.PlaceResult) => {
        if (place.formatted_address) {
            setFormData(prev => ({ ...prev, address: place.formatted_address! }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Skip Square Payment for Masonry Consultation
        // Typically this would fire off a PayloadCMS webhook or SES email
        console.log('Consultation Request Submitted:', formData);
        setIsSubmitted(true);
    };

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    if (isSubmitted) {
        return (
             <>
                <ContactHero type={heroType} />
                <div className="container mx-auto max-w-4xl -mt-20 relative z-20 px-6 pb-24">
                    <div className="glass-panel rounded-[32px] shadow-2xl p-12 text-center border-t-8 border-burnished-gold bg-midnight-slate">
                        <div className="w-24 h-24 bg-burnished-gold/10 text-burnished-gold rounded-full flex items-center justify-center mx-auto mb-6">
                             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-sandstone mb-6 font-playfair tracking-normal">Consultation Requested</h2>
                        <p className="text-mortar-gray text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                            Thank you, <span className="text-sandstone font-medium">{formData.name}</span>. Our head architectural draftsman has received your request for <span className="text-sandstone font-medium">{formData.address || 'your property'}</span> and will be in contact shortly to discuss blueprints and stone materials.
                        </p>
                        
                        <p className="text-[10px] text-burnished-gold font-bold uppercase tracking-widest bg-burnished-gold/10 inline-block px-4 py-2 rounded-full border border-burnished-gold/20">
                            Reference ID: #{Math.floor(Math.random() * 100000)}
                        </p>
                    </div>
                </div>
             </>
        );
    }

    return (
        <>
            <ContactHero type={heroType} />
            <div className="container mx-auto max-w-6xl -mt-20 relative z-20 px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* LEFT: FORM SECTION */}
                    <div className="lg:col-span-7">
                        <div className="glass-card-light rounded-[32px] shadow-2xl p-8 md:p-12 relative overflow-hidden group border border-black/5 bg-white/90 backdrop-blur-xl">
                            
                            <h2 className="text-4xl font-black text-midnight-slate mb-4 font-playfair tracking-normal relative z-10">
                                {t('open_ticket')}
                            </h2>
                            <p className="text-steel-gray font-light leading-relaxed mb-10 relative z-10 text-lg">
                                {t('ticket_desc')}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-midnight-slate/60 uppercase tracking-widest">{t('contact_name')}</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        className="w-full bg-sandstone/50 border border-black/5 rounded-xl p-4 font-medium text-midnight-slate focus:ring-2 focus:ring-burnished-gold focus:border-transparent outline-none transition-all focus:bg-white"
                                        placeholder={t('full_name')}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-midnight-slate/60 uppercase tracking-widest">{t('email_label')}</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            required
                                            className="w-full bg-sandstone/50 border border-black/5 rounded-xl p-4 font-medium text-midnight-slate focus:ring-2 focus:ring-burnished-gold focus:border-transparent outline-none transition-all focus:bg-white"
                                            placeholder="architect@example.com"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-midnight-slate/60 uppercase tracking-widest">{t('phone_label')}</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            required
                                            className="w-full bg-sandstone/50 border border-black/5 rounded-xl p-4 font-medium text-midnight-slate focus:ring-2 focus:ring-burnished-gold focus:border-transparent outline-none transition-all focus:bg-white"
                                            placeholder="(555) 000-0000"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-midnight-slate/60 uppercase tracking-widest">{t('location_label')}</label>
                                    <AddressAutocomplete
                                        onAddressSelect={handleAddressSelect}
                                        className="w-full bg-sandstone/50 border border-black/5 rounded-xl p-4 font-medium text-midnight-slate focus:ring-2 focus:ring-burnished-gold focus:border-transparent outline-none transition-all focus:bg-white"
                                        placeholder={t('location_placeholder')}
                                        defaultValue={formData.address}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-midnight-slate/60 uppercase tracking-widest">{t('issue_label')}</label>
                                    <textarea 
                                        name="project_details"
                                        rows={5}
                                        required
                                        className="w-full bg-sandstone/50 border border-black/5 rounded-xl p-4 font-light text-midnight-slate focus:ring-2 focus:ring-burnished-gold focus:border-transparent outline-none transition-all resize-none focus:bg-white"
                                        placeholder="e.g. Looking to build a 400 sq ft outdoor kitchen using Austin Chalk stone and a massive wood-burning fire pit..."
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 bg-midnight-slate hover:bg-burnished-gold text-white hover:text-midnight-slate mt-4"
                                >
                                    {t('submit_standard')}
                                </button>
                                
                                <p className="text-center text-[10px] font-bold text-midnight-slate/40 uppercase tracking-widest mt-6">
                                    {t('secure_note')}
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: INFO & MAP */}
                    <div className="lg:col-span-5 space-y-8 pt-12 lg:pt-0">
                        
                        {/* INFO CARD */}
                        <div className="bg-midnight-slate text-white p-10 rounded-[32px] shadow-2xl relative overflow-hidden border border-white/10">
                            <div className="absolute top-0 right-0 p-32 bg-burnished-gold rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
                            
                            <h3 className="text-3xl font-black mb-10 relative z-10 flex items-center gap-4 font-playfair">
                                <span className="w-1.5 h-8 bg-burnished-gold rounded-full"></span>
                                {t('direct_contact')}
                            </h3>
                            
                            <div className="space-y-8 relative z-10">
                                <a href="tel:337-570-3004" className="flex items-start gap-5 group cursor-pointer hover:bg-white/5 p-5 -mx-5 rounded-2xl transition-colors">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-burnished-gold shrink-0 group-hover:bg-burnished-gold group-hover:text-midnight-slate transition-all shadow-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    </div>
                                    <div className="pt-1">
                                        <div className="text-[10px] font-bold text-sandstone/50 uppercase tracking-widest mb-1">{t('hotline')}</div>
                                        <div className="text-2xl font-black tracking-tight group-hover:text-burnished-gold transition-colors font-playfair">337-570-3004</div>
                                    </div>
                                </a>

                                <a href="mailto:office@texasprestigemasonry.com" className="flex items-start gap-5 group cursor-pointer hover:bg-white/5 p-5 -mx-5 rounded-2xl transition-colors">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-burnished-gold shrink-0 group-hover:bg-burnished-gold group-hover:text-midnight-slate transition-all shadow-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div className="pt-1">
                                        <div className="text-[10px] font-bold text-sandstone/50 uppercase tracking-widest mb-1">{t('email_support')}</div>
                                        <div className="text-lg font-light leading-snug group-hover:text-burnished-gold transition-colors">office@<br/>texasprestigemasonry.com</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* SERVICE AREA (Map Placeholder) */}
                        <ServiceAreaMap />
                    </div>
                </div>
            </div>
        </>
    );
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-sandstone font-work-sans flex flex-col texture-stone">
      <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-midnight-slate">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-burnished-gold mb-6"></div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Loading Gateway...</p>
            </div>
            </div>
      }>
        <ContactContent />
      </Suspense>
    </div>
  );
}