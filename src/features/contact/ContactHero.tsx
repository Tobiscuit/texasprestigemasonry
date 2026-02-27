'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

interface ContactHeroProps {
  type: 'repair' | 'install' | 'contractor' | 'general';
}

export function ContactHero({ type }: ContactHeroProps) {
  const t = useTranslations('contact_hero');
  const isEmergency = type === 'repair';
  const isContractor = type === 'contractor';

  const accentColor = isEmergency ? 'text-red-500' : 'text-burnished-gold';
  const bgColor = isEmergency ? 'bg-midnight-slate' : 'bg-midnight-slate';
  const patternColor = isEmergency ? '#ef4444' : '#f1c40f';

  return (
    <section className={`relative pt-48 pb-32 px-6 overflow-hidden font-display ${bgColor}`}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(${patternColor} 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border ${isEmergency ? 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse' : 'bg-burnished-gold/10 border-burnished-gold/20 text-burnished-gold'}`}>
          {isEmergency ? (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              {t('emergency_badge')}
            </>
          ) : isContractor ? (
            <>
              <span className="w-2 h-2 rounded-full bg-burnished-gold"></span>
              {t('contractor_badge')}
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-burnished-gold"></span>
              {t('consultation_badge')}
            </>
          )}
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
          {isEmergency ? (
            <>{t('emergency_heading')} <span className="text-red-500">{t('emergency_accent')}</span></>
          ) : isContractor ? (
            <>{t('contractor_heading')} <span className="text-burnished-gold">{t('contractor_accent')}</span></>
          ) : (
            type === 'install' ? (
              <>{t('install_heading')} <span className="text-burnished-gold">{t('install_accent')}</span></>
            ) : (
              <>{t('general_heading')} <span className="text-burnished-gold">{t('general_accent')}</span></>
            )
          )}
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {isEmergency
            ? t('emergency_desc')
            : isContractor
            ? t('contractor_desc')
            : t('general_desc')
          }
        </p>
      </div>
    </section>
  );
}
