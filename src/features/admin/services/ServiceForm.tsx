'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Feature { feature: string; }

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit }: ServiceFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'Residential');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [icon, setIcon] = useState(initialData?.icon || 'building');
  const [highlight, setHighlight] = useState(initialData?.highlight || false);
  const [order, setOrder] = useState(initialData?.order?.toString() || '0');

  const [features, setFeatures] = useState<string[]>(() => {
    try {
      const parsed = initialData?.features ? JSON.parse(initialData.features) : [];
      return Array.isArray(parsed) ? parsed.map((f: any) => typeof f === 'string' ? f : f.feature || '') : [];
    } catch { return []; }
  });
  const [newFeature, setNewFeature] = useState('');

  const autoSlug = (t: string) => t.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleAIEnhance = async () => {
    if (!title) { setError('Enter a title first.'); return; }
    setIsEnhancing(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/generate-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, existingDescription: description }),
      });
      if (!res.ok) throw new Error('AI enhancement failed');
      const data = await res.json();
      if (data.description) setDescription(data.description);
      if (data.features) setFeatures(data.features);
    } catch {
      setError('AI enhancement failed. Fill in manually.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const body = {
      title, slug: slug || autoSlug(title), category, description,
      price: price ? parseFloat(price) : null,
      features: JSON.stringify(features.map(f => ({ feature: f }))),
      icon, highlight, order: parseInt(order) || 0,
    };

    try {
      const url = isEdit ? `/api/services/${initialData.id}` : '/api/services';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save');
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/services'), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const iconOptions = [
    { value: 'home', label: '🏠 Home' },
    { value: 'fire', label: '🔥 Fire' },
    { value: 'stone', label: '🧱 Stone' },
    { value: 'building', label: '🏢 Building' },
    { value: 'lightning', label: '⚡ Lightning' },
    { value: 'clipboard', label: '📋 Clipboard' },
    { value: 'phone', label: '📱 Phone' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
          <span className="text-sm font-medium">{error}</span>
          <button type="button" onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">✕</button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-in fade-in zoom-in duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="text-sm font-medium">Service {isEdit ? 'updated' : 'created'}! Redirecting...</span>
        </div>
      )}

      {/* ── CORE INFO ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f1c40f]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#f1c40f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Service Details</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Title *</label>
            <input type="text" value={title} onChange={e => { setTitle(e.target.value); if (!isEdit) setSlug(autoSlug(e.target.value)); }} required
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all text-lg font-semibold"
              placeholder="Outdoor Kitchens" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Slug</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
              placeholder="auto-generated" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all">
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Premium Build">Premium Build</option>
              <option value="Hardscaping">Hardscaping</option>
              <option value="Fire Features">Fire Features</option>
              <option value="Structural">Structural</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Price</label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
              placeholder="Optional" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Icon</label>
            <select value={icon} onChange={e => setIcon(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all">
              {iconOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Display Order</label>
            <input type="number" value={order} onChange={e => setOrder(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all" />
          </div>
          <div className="flex items-center gap-3 md:col-span-2">
            <button type="button" onClick={() => setHighlight(!highlight)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${highlight ? 'bg-[#f1c40f]' : 'bg-[var(--staff-border)]'}`}>
              <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${highlight ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm font-medium text-[var(--staff-text)]">Featured / Highlighted Service</span>
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION (with AI) ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-[var(--staff-text)]">Description</h2>
          </div>
          <button type="button" onClick={handleAIEnhance} disabled={isEnhancing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {isEnhancing ? (
              <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Enhancing...</>
            ) : (
              <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> AI Enhance</>
            )}
          </button>
        </div>
        <div className="p-6">
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
            className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all resize-none"
            placeholder="Describe what this service offers..." />
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Features</h2>
        </div>
        <div className="p-6">
          <div className="space-y-2 mb-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 group animate-in fade-in duration-200">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="flex-1 text-sm text-[var(--staff-text)]">{f}</span>
                <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))}
                  className="p-1 text-[var(--staff-muted)] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newFeature} onChange={e => setNewFeature(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
              className="flex-1 bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
              placeholder="Add a feature..." />
            <button type="button" onClick={addFeature}
              className="px-4 py-2.5 rounded-xl bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] text-[var(--staff-text)] text-sm font-bold hover:border-[#f1c40f]/50 transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ── SUBMIT ── */}
      <div className="flex items-center justify-between pt-4">
        <button type="button" onClick={() => router.push('/dashboard/services')}
          className="px-6 py-3 rounded-xl text-[var(--staff-muted)] hover:text-[var(--staff-text)] font-medium transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSaving || success}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f1c40f] text-[#2c3e50] font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {isSaving ? 'Saving...' : success ? '✓ Saved' : isEdit ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
}
