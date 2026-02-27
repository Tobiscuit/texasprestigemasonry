'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const isActive = (path: string) => pathname === path || pathname.endsWith(path);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-xl bg-midnight-slate/90 text-sandstone supports-[backdrop-filter]:bg-midnight-slate/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-burnished-gold/10 p-2 rounded-lg border border-burnished-gold/20 group-hover:border-burnished-gold/50 transition-colors">
              <svg className="h-6 w-6 text-burnished-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight font-playfair">
              TEXAS<span className="text-burnished-gold font-light">PRESTIGE</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {[
              { path: '/services', label: t('services') },
              { path: '/portfolio', label: t('portfolio') },
              { path: '/blog', label: t('blog') },
              { path: '/about', label: t('about') }
            ].map((link) => (
              <Link 
                key={link.path}
                href={link.path} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive(link.path) 
                    ? 'bg-white/10 text-sandstone shadow-inner' 
                    : 'text-mortar-gray hover:text-sandstone hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="btn-premium text-xs">
              {t('free_estimate') || 'Free Estimate'}
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden p-2 text-mortar-gray hover:text-sandstone"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              )}
            </svg>
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <div className={`fixed inset-0 z-40 bg-midnight-slate/98 backdrop-blur-3xl transition-all duration-300 md:hidden flex flex-col pt-24 px-6 ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
      }`}>
        <div className="flex flex-col gap-6 text-center">
          {[
            { path: '/services', label: t('services') },
            { path: '/portfolio', label: t('portfolio') },
            { path: '/blog', label: t('blog') },
            { path: '/about', label: t('about') }
          ].map((link) => (
            <Link 
              key={link.path}
              href={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-bold font-playfair transition-colors ${
                isActive(link.path) ? 'text-burnished-gold' : 'text-sandstone hover:text-burnished-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px w-20 mx-auto bg-white/10 my-4"></div>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-premium mx-auto">
            {t('free_estimate') || 'Free Estimate'}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
