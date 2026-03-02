'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const UI_STRINGS: Record<string, {
  heading: string; subheading: string; submitButton: string; exitLabel: string;
  nameLabel: string; namePlaceholder: string; emailLabel: string; emailPlaceholder: string;
  projectTypeLabel: string; descriptionLabel: string; descriptionPlaceholder: string;
  timelineLabel: string; budgetLabel: string;
  resultTitle: string; resultDisclaimer: string; ctaButton: string;
}> = {
  en: {
    heading: 'AI Project Estimator', subheading: 'Describe your masonry project and our AI will generate a preliminary scope and estimate range.',
    submitButton: 'Generate Estimate', exitLabel: 'Back',
    nameLabel: 'Your Name', namePlaceholder: 'John Smith',
    emailLabel: 'Email', emailPlaceholder: 'john@example.com',
    projectTypeLabel: 'Project Type', descriptionLabel: 'Describe Your Vision',
    descriptionPlaceholder: 'Tell us what you\'re looking for — materials, size, any inspiration or reference photos you\'ve seen...',
    timelineLabel: 'Ideal Timeline', budgetLabel: 'Budget Range',
    resultTitle: 'Your Estimate', resultDisclaimer: 'This is an AI-generated preliminary estimate. Final pricing depends on site conditions, materials selected, and design complexity. A Texas Prestige Masonry specialist will follow up within 24 hours.',
    ctaButton: 'Request Full Consultation',
  },
  es: {
    heading: 'Estimador de Proyectos IA', subheading: 'Describa su proyecto de albañilería y nuestra IA generará un alcance preliminar y un rango de estimación.',
    submitButton: 'Generar Estimación', exitLabel: 'Atrás',
    nameLabel: 'Su Nombre', namePlaceholder: 'Juan Pérez',
    emailLabel: 'Correo', emailPlaceholder: 'juan@ejemplo.com',
    projectTypeLabel: 'Tipo de Proyecto', descriptionLabel: 'Describa Su Visión',
    descriptionPlaceholder: 'Díganos qué busca — materiales, tamaño, inspiración...',
    timelineLabel: 'Cronograma Ideal', budgetLabel: 'Rango de Presupuesto',
    resultTitle: 'Su Estimación', resultDisclaimer: 'Esta es una estimación preliminar generada por IA. El precio final depende de las condiciones del sitio, los materiales seleccionados y la complejidad del diseño.',
    ctaButton: 'Solicitar Consulta Completa',
  },
};

const PROJECT_TYPES = [
  { value: 'outdoor-kitchen', label: '🍳 Outdoor Kitchen' },
  { value: 'pavers-patio', label: '🧱 Pavers & Patio' },
  { value: 'fire-pit', label: '🔥 Fire Pit / Fireplace' },
  { value: 'retaining-wall', label: '🏗️ Retaining Wall' },
  { value: 'stone-veneer', label: '🏠 Stone Veneer' },
  { value: 'commercial', label: '🏢 Commercial Masonry' },
  { value: 'pool-deck', label: '🏊 Pool Deck' },
  { value: 'driveway', label: '🚗 Driveway' },
  { value: 'other', label: '✨ Other / Custom' },
];

const TIMELINES = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-3-months', label: '1-3 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: 'flexible', label: 'Flexible' },
];

const BUDGETS = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-35k', label: '$15,000 - $35,000' },
  { value: '35k-75k', label: '$35,000 - $75,000' },
  { value: '75k-plus', label: '$75,000+' },
  { value: 'unsure', label: 'Not Sure Yet' },
];

interface EstimateResult {
  estimatedRange: string;
  scope: string;
  materials: string[];
  timelineEstimate: string;
  considerations: string[];
  nextSteps: string;
}

export default function EstimatePage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const ui = UI_STRINGS[lang] || UI_STRINGS.en;

  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EstimateResult | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setError(null);

    try {
      const res = await fetch('/api/ai/generate-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, projectType, description, timeline, budget }),
      });

      if (!res.ok) throw new Error('Estimation failed');
      const data = await res.json();
      setResult(data);
      setStep('result');
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
      setStep('form');
    }
  };

  return (
    <div className="min-h-screen bg-midnight-slate text-white">
      {/* HERO HEADER */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,160,89,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

        <div className="container mx-auto px-6 pt-8 pb-16 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-mortar-gray hover:text-burnished-gold transition-colors mb-8 group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-sm font-bold uppercase tracking-widest">{ui.exitLabel}</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-burnished-gold/10 border border-burnished-gold/20 text-burnished-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              AI-Powered
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 font-playfair">
              {ui.heading.split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnished-gold to-white italic">{ui.heading.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-mortar-gray text-lg md:text-xl leading-relaxed max-w-2xl">
              {ui.subheading}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 pb-24 -mt-4">
        {error && (
          <div className="max-w-3xl mx-auto mb-8 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* CONTACT INFO */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-burnished-gold/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-burnished-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-mortar-gray uppercase tracking-wider mb-2">{ui.nameLabel}</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-burnished-gold/50 focus:border-burnished-gold transition-all"
                    placeholder={ui.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-mortar-gray uppercase tracking-wider mb-2">{ui.emailLabel}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-burnished-gold/50 focus:border-burnished-gold transition-all"
                    placeholder={ui.emailPlaceholder} />
                </div>
              </div>
            </div>

            {/* PROJECT TYPE */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                {ui.projectTypeLabel}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PROJECT_TYPES.map(pt => (
                  <button key={pt.value} type="button" onClick={() => setProjectType(pt.value)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border ${projectType === pt.value
                      ? 'bg-burnished-gold/10 border-burnished-gold/50 text-burnished-gold shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                      : 'bg-white/5 border-white/10 text-mortar-gray hover:border-white/20 hover:bg-white/10'
                      }`}>
                    <span className="text-lg block mb-1">{pt.label.split(' ')[0]}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{pt.label.split(' ').slice(1).join(' ')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                {ui.descriptionLabel}
              </h2>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-burnished-gold/50 focus:border-burnished-gold transition-all resize-none text-lg leading-relaxed"
                placeholder={ui.descriptionPlaceholder} />
            </div>

            {/* TIMELINE & BUDGET */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  {ui.timelineLabel}
                </h2>
                <div className="space-y-2">
                  {TIMELINES.map(t => (
                    <button key={t.value} type="button" onClick={() => setTimeline(t.value)}
                      className={`w-full p-3 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-all border ${timeline === t.value
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-white/5 border-white/10 text-mortar-gray hover:border-white/20'
                        }`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  {ui.budgetLabel}
                </h2>
                <div className="space-y-2">
                  {BUDGETS.map(b => (
                    <button key={b.value} type="button" onClick={() => setBudget(b.value)}
                      className={`w-full p-3 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-all border ${budget === b.value
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-white/5 border-white/10 text-mortar-gray hover:border-white/20'
                        }`}>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <button type="submit" disabled={!projectType || !description}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-burnished-gold to-[#d4a84b] text-midnight-slate font-black text-lg uppercase tracking-widest shadow-[0_4px_30px_rgba(197,160,89,0.3)] hover:shadow-[0_8px_40px_rgba(197,160,89,0.5)] hover:-translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {ui.submitButton}
            </button>
          </form>
        )}

        {step === 'loading' && (
          <div className="max-w-3xl mx-auto text-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 rounded-full border-4 border-burnished-gold/20" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-burnished-gold animate-spin" />
              <div className="absolute inset-3 rounded-full bg-burnished-gold/5 flex items-center justify-center">
                <svg className="w-8 h-8 text-burnished-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <h2 className="text-2xl font-black mb-3">Analyzing Your Project</h2>
            <p className="text-mortar-gray max-w-md mx-auto">Our AI is evaluating materials, labor, and local market conditions to generate your custom estimate...</p>
          </div>
        )}

        {step === 'result' && result && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-center mb-2">{ui.resultTitle}</h2>

            {/* ESTIMATE RANGE (Hero Card) */}
            <div className="glass-panel rounded-3xl p-8 md:p-12 border border-burnished-gold/20 text-center bg-gradient-to-br from-burnished-gold/5 to-transparent">
              <p className="text-xs font-bold text-burnished-gold uppercase tracking-widest mb-4">Estimated Investment</p>
              <p className="text-5xl md:text-6xl font-black text-burnished-gold mb-4">{result.estimatedRange}</p>
              <p className="text-mortar-gray max-w-lg mx-auto leading-relaxed">{result.scope}</p>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MATERIALS */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-sky-500/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  Recommended Materials
                </h3>
                <ul className="space-y-2">
                  {result.materials.map((m, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-mortar-gray">
                      <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* TIMELINE */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  Estimated Timeline
                </h3>
                <p className="text-2xl font-black text-emerald-400 mb-2">{result.timelineEstimate}</p>
                <p className="text-sm text-mortar-gray">From design approval to final walkthrough</p>
              </div>
            </div>

            {/* CONSIDERATIONS */}
            {result.considerations?.length > 0 && (
              <div className="glass-panel rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-amber-500/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  Key Considerations
                </h3>
                <ul className="space-y-3">
                  {result.considerations.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-mortar-gray">
                      <span className="text-amber-400 font-bold mt-0.5">{i + 1}.</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* DISCLAIMER + CTA */}
            <div className="text-center space-y-6">
              <p className="text-xs text-mortar-gray/60 max-w-lg mx-auto leading-relaxed">{ui.resultDisclaimer}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-burnished-gold text-midnight-slate font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:shadow-[0_6px_25px_rgba(197,160,89,0.5)] hover:-translate-y-0.5 transition-all">
                  {ui.ctaButton}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <button type="button" onClick={() => { setStep('form'); setResult(null); }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-mortar-gray hover:text-white hover:border-white/30 font-bold uppercase tracking-wider transition-all">
                  New Estimate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
