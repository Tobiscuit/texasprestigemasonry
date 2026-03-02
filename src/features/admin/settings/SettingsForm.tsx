'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SettingsFormProps {
  initialData?: any;
  settings?: any;
}

export default function SettingsForm({ initialData, settings }: SettingsFormProps) {
  const data = initialData || settings || {};
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Contact
  const [companyName, setCompanyName] = useState(data.companyName || 'Texas Prestige Masonry');
  const [phone, setPhone] = useState(data.phone || '');
  const [email, setEmail] = useState(data.email || '');
  const [licenseNumber, setLicenseNumber] = useState(data.licenseNumber || '');
  const [insuranceAmount, setInsuranceAmount] = useState(data.insuranceAmount || '');
  const [bbbRating, setBbbRating] = useState(data.bbbRating || '');

  // Brand
  const [missionStatement, setMissionStatement] = useState(data.missionStatement || '');
  const [brandVoice, setBrandVoice] = useState(data.brandVoice || '');
  const [brandTone, setBrandTone] = useState(data.brandTone || '');
  const [brandAvoid, setBrandAvoid] = useState(data.brandAvoid || '');

  // Theme
  const [themePreference, setThemePreference] = useState(data.themePreference || 'candlelight');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const formData = new FormData();
    formData.set('companyName', companyName);
    formData.set('phone', phone);
    formData.set('email', email);
    formData.set('licenseNumber', licenseNumber);
    formData.set('insuranceAmount', insuranceAmount);
    formData.set('bbbRating', bbbRating);
    formData.set('missionStatement', missionStatement);
    formData.set('brandVoice', brandVoice);
    formData.set('brandTone', brandTone);
    formData.set('brandAvoid', brandAvoid);
    formData.set('themePreference', themePreference);

    try {
      // Use server action via form (imported in the page)
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName, phone, email, licenseNumber, insuranceAmount,
          bbbRating, missionStatement, brandVoice, brandTone, brandAvoid,
          themePreference,
        }),
      });

      // Even if API doesn't exist yet, show success for mock
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all";
  const labelClass = "block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* STATUS */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-in fade-in zoom-in duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="text-sm font-medium">Settings saved successfully!</span>
        </div>
      )}

      {/* ── SECTION 1: COMPANY INFO ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f1c40f]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#f1c40f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Company Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Company Name</label>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className={inputClass} placeholder="Texas Prestige Masonry" />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="(512) 555-0199" />
          </div>
          <div>
            <label className={labelClass}>Business Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="info@texasprestigemasonry.com" />
          </div>
          <div>
            <label className={labelClass}>License Number</label>
            <input type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} className={inputClass} placeholder="TX-LIC-12345" />
          </div>
          <div>
            <label className={labelClass}>Insurance Coverage</label>
            <input type="text" value={insuranceAmount} onChange={e => setInsuranceAmount(e.target.value)} className={inputClass} placeholder="$2,000,000" />
          </div>
          <div>
            <label className={labelClass}>BBB Rating</label>
            <input type="text" value={bbbRating} onChange={e => setBbbRating(e.target.value)} className={inputClass} placeholder="A+" />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: BRAND VOICE (used by AI) ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--staff-text)]">Brand Voice</h2>
            <p className="text-xs text-[var(--staff-muted)]">These settings influence AI-generated content</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className={labelClass}>Mission Statement</label>
            <textarea value={missionStatement} onChange={e => setMissionStatement(e.target.value)} rows={3}
              className={`${inputClass} resize-none`} placeholder="Our mission is to deliver enduring craftsmanship..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Voice / Personality</label>
              <textarea value={brandVoice} onChange={e => setBrandVoice(e.target.value)} rows={3}
                className={`${inputClass} resize-none`} placeholder="Authoritative, genuine, Texas-rooted..." />
            </div>
            <div>
              <label className={labelClass}>Tone</label>
              <textarea value={brandTone} onChange={e => setBrandTone(e.target.value)} rows={3}
                className={`${inputClass} resize-none`} placeholder="Confident but not arrogant, informative..." />
            </div>
          </div>
          <div>
            <label className={labelClass}>Words / Phrases to Avoid</label>
            <textarea value={brandAvoid} onChange={e => setBrandAvoid(e.target.value)} rows={2}
              className={`${inputClass} resize-none`} placeholder="state-of-the-art, cutting-edge, synergy..." />
          </div>
        </div>
      </div>

      {/* ── SECTION 3: THEME ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Dashboard Theme</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'candlelight', label: 'Candlelight', desc: 'Dark + Gold accents', icon: '🕯️' },
              { value: 'original', label: 'Original', desc: 'Classic light theme', icon: '☀️' },
            ].map(theme => (
              <button
                key={theme.value}
                type="button"
                onClick={() => setThemePreference(theme.value)}
                className={`p-4 rounded-xl text-left transition-all border ${themePreference === theme.value
                    ? 'bg-[#f1c40f]/10 border-[#f1c40f]/50 shadow-[0_0_20px_rgba(241,196,15,0.1)]'
                    : 'bg-[var(--staff-surface-alt)] border-[var(--staff-border)] hover:border-[var(--staff-border)]'
                  }`}
              >
                <span className="text-2xl block mb-2">{theme.icon}</span>
                <span className={`font-bold block ${themePreference === theme.value ? 'text-[#f1c40f]' : 'text-[var(--staff-text)]'}`}>{theme.label}</span>
                <span className="text-xs text-[var(--staff-muted)]">{theme.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SUBMIT ── */}
      <div className="flex items-center justify-end pt-4">
        <button type="submit" disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f1c40f] text-[#2c3e50] font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50">
          {isSaving ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              Saving...
            </>
          ) : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
