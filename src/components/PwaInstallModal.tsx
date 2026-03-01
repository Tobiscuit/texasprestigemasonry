'use client';

import React, { useState, useEffect } from 'react';

interface PwaInstallModalProps {
  show: boolean;
  onClose: () => void;
  onInstall: () => void;
  platform: 'ios' | 'android' | 'other';
}

export function PwaInstallModal({ show, onClose, onInstall, platform }: PwaInstallModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-midnight-slate/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md glass-panel rounded-2xl overflow-hidden p-8 text-center">
        {/* Glow accents */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-burnished-gold/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-terracotta-clay/10 blur-[100px] rounded-full" />

        <div className="relative">
          {/* Brand Icon */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-burnished-gold blur-2xl opacity-20 rounded-full animate-pulse" />
            <div className="relative bg-midnight-slate border border-burnished-gold/30 rounded-2xl p-4 shadow-inner">
              {/* Masonry trowel icon */}
              <svg className="w-full h-full text-burnished-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75">
                {/* Trowel blade */}
                <path d="M3 17l4-4 7-7a2.828 2.828 0 114 4L11 17H3z" />
                {/* Handle */}
                <path d="M14 10l2.5 2.5" />
                <path d="M16.5 12.5L20 16" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-black text-sandstone mb-2 tracking-tight font-playfair">
            {platform === 'ios' ? 'Add to Home Screen' : 'Install Texas Prestige'}
          </h2>
          <p className="text-mortar-gray mb-8 leading-relaxed">
            {platform === 'ios'
              ? 'Save the Texas Prestige Masonry app for faster access to estimates, projects, and scheduling.'
              : 'Get instant access to your projects, estimates, and field dispatch with the full native experience.'}
          </p>

          {platform === 'ios' ? (
            <div className="space-y-6 text-left glass-card-light rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-burnished-gold font-bold font-playfair">1</div>
                <p className="text-sm text-sandstone">Tap the <span className="text-burnished-gold font-bold">Share</span> menu below.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-burnished-gold font-bold font-playfair">2</div>
                <p className="text-sm text-sandstone">Scroll down and select <span className="text-burnished-gold font-bold">&quot;Add to Home Screen&quot;</span>.</p>
              </div>

              {/* Pointing animation */}
              <div className="flex justify-center pt-4">
                <div className="animate-bounce text-burnished-gold">
                  <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={onInstall}
              className="w-full btn-premium py-4 rounded-xl hover-lift text-base"
            >
              INSTALL NOW
            </button>
          )}

          <button
            onClick={onClose}
            className="mt-6 text-mortar-gray text-sm font-medium hover:text-sandstone transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
