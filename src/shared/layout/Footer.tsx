import React from 'react';
import { getTranslations } from 'next-intl/server';

const Footer: React.FC = async () => {
  const t = await getTranslations('footer');
  const tCommon = await getTranslations('common');

  return (
    <footer className="bg-black text-mortar-gray border-t border-white/10 pt-20 pb-10 text-sm font-sans">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sandstone text-xl font-bold mb-6 font-playfair tracking-tight">TEXAS<span className="text-burnished-gold">PRESTIGE</span></h3>
            <p className="leading-relaxed mb-6">
              {t('brand_description') || 'Premium masonry services across Texas. Commercial & residential outdoor kitchens, pavers, chimneys, brick & block, fire pits, and stone repairs.'}
            </p>
            <div className="flex gap-4">
               <div className="w-8 h-8 bg-white/10 rounded-full hover:bg-burnished-gold hover:text-black transition-colors flex items-center justify-center cursor-pointer">IG</div>
               <div className="w-8 h-8 bg-white/10 rounded-full hover:bg-burnished-gold hover:text-black transition-colors flex items-center justify-center cursor-pointer">FB</div>
            </div>
          </div>

          {/* SERVICE AREA */}
          <div>
            <h4 className="text-sandstone font-bold mb-6 uppercase tracking-wider text-xs">{t('deployment_zones') || 'Service Areas'}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-sandstone transition-colors">Greater Houston</a></li>
              <li><a href="#" className="hover:text-sandstone transition-colors">Dallas-Fort Worth</a></li>
              <li><a href="#" className="hover:text-sandstone transition-colors">San Antonio</a></li>
              <li><a href="#" className="hover:text-sandstone transition-colors">Austin & Central Texas</a></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-sandstone font-bold mb-6 uppercase tracking-wider text-xs">{t('client_support') || 'Our Services'}</h4>
            <ul className="space-y-3">
              <li><a href="/services" className="hover:text-sandstone transition-colors">Outdoor Kitchens</a></li>
              <li><a href="/services" className="hover:text-sandstone transition-colors">Custom Pavers</a></li>
              <li><a href="/services" className="hover:text-sandstone transition-colors">Fire Pits & Chimneys</a></li>
              <li><a href="/contact" className="hover:text-sandstone transition-colors">Free Estimate</a></li>
            </ul>
          </div>

          {/* CREDENTIALS */}
          <div>
            <h4 className="text-sandstone font-bold mb-6 uppercase tracking-wider text-xs">{t('official_data') || 'Credentials'}</h4>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-600 uppercase">{t('state_license') || 'Licensed & Insured'}</div>
                <div className="text-sandstone font-mono">Texas State Licensed</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase">Coverage</div>
                <div className="text-sandstone font-mono">Commercial & Residential</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase">Estimates</div>
                <div className="text-sandstone">
                  Free On-Site Consultations<br />
                  All of Texas
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{tCommon('copyright', { year: new Date().getFullYear() }) || `© ${new Date().getFullYear()} Texas Prestige Masonry. All rights reserved.`}</p>
          <div className="flex gap-6 text-xs">
            <a href="/privacy" className="hover:text-sandstone">{tCommon('privacy_policy') || 'Privacy Policy'}</a>
            <a href="#" className="hover:text-sandstone">{t('terms') || 'Terms'}</a>
            <a href="#" className="hover:text-sandstone">{t('sitemap') || 'Sitemap'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
