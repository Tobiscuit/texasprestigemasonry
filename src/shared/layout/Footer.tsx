import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const Footer: React.FC = async () => {
  const t = await getTranslations('footer');
  const tCommon = await getTranslations('common');

  return (
    <footer className="bg-midnight-slate text-white border-t border-white/10 pt-32 pb-12 relative overflow-hidden font-work-sans">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-burnished-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP SECTION: Massive Brand Presence */}
        <div className="mb-24 pb-16 border-b border-white/10 flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
                <h2 className="text-5xl md:text-7xl font-black font-playfair tracking-tight mb-6">
                    TEXAS<span className="text-burnished-gold italic">PRESTIGE</span>
                </h2>
                <p className="text-mortar-gray text-xl font-light max-w-md leading-relaxed">
                    Forging enduring legacies through masterful stone and brick craftsmanship.
                </p>
            </div>
            <div className="text-right">
                <Link href="/contact" className="inline-block border border-burnished-gold/30 hover:bg-burnished-gold text-white hover:text-midnight-slate font-bold py-4 px-10 rounded-full transition-all tracking-widest uppercase text-xs hover:-translate-y-1">
                    Commission a Project
                </Link>
            </div>
        </div>

        {/* MIDDLE SECTION: Minimalist Columns */}
        <div className="grid grid-cols-1 select-none md:grid-cols-12 gap-16 mb-24">
          
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-8">
            <h3 className="text-burnished-gold text-xs font-bold uppercase tracking-widest mb-8">Direct Contact</h3>
            <div>
                <a href="tel:337-570-3004" className="text-4xl font-playfair hover:text-burnished-gold transition-colors block mb-2">337-570-3004</a>
                <span className="text-xs text-mortar-gray font-bold uppercase tracking-widest">Master Mason Hotline</span>
            </div>
            <div className="pt-4">
                <a href="mailto:office@texasprestigemasonry.com" className="text-xl font-light hover:text-burnished-gold transition-colors block mb-2">office@texasprestigemasonry.com</a>
                <span className="text-xs text-mortar-gray font-bold uppercase tracking-widest">Blueprint & Project Inquiries</span>
            </div>
            <div className="pt-4">
                <p className="text-lg font-light text-white mb-2">Houston, Texas & Surrounding Areas</p>
                <span className="text-xs text-mortar-gray font-bold uppercase tracking-widest">Headquarters</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="text-burnished-gold text-xs font-bold uppercase tracking-widest mb-8">Expertise</h3>
            <ul className="space-y-4 text-base font-light text-sandstone">
              <li><Link href="/services" className="hover:text-white transition-colors">Residential Stonework</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Commercial Block</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Outdoor Kitchens</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Custom Pavers</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-burnished-gold text-xs font-bold uppercase tracking-widest mb-8">Company</h3>
            <ul className="space-y-4 text-base font-light text-sandstone">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Curated Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Request Consultation</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-xs text-mortar-gray font-bold uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Texas Prestige Masonry. All rights reserved.</p>
            <div className="flex gap-8 text-sandstone">
                <Link href="#" className="hover:text-burnished-gold transition-colors">Instagram</Link>
                <Link href="#" className="hover:text-burnished-gold transition-colors">LinkedIn</Link>
                <Link href="#" className="hover:text-burnished-gold transition-colors">Houzz</Link>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
