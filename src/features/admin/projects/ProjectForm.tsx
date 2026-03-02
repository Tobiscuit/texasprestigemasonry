'use client';
import React, { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Stat { label: string; value: string; }
interface GalleryItem { image: string; caption: string; }

interface ProjectFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const API_BASE = '';

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [title, setTitle] = useState(initialData?.title || '');
  const [client, setClient] = useState(initialData?.client || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [completionDate, setCompletionDate] = useState(initialData?.completionDate || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [challenge, setChallenge] = useState(initialData?.challenge || '');
  const [solution, setSolution] = useState(initialData?.solution || '');
  const [imageStyle, setImageStyle] = useState(initialData?.imageStyle || 'grid');

  // Dynamic arrays
  const [tags, setTags] = useState<string[]>(() => {
    try { return initialData?.tags ? JSON.parse(initialData.tags) : []; } catch { return []; }
  });
  const [newTag, setNewTag] = useState('');
  const [stats, setStats] = useState<Stat[]>(() => {
    try { return initialData?.stats ? JSON.parse(initialData.stats) : []; } catch { return []; }
  });
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try { return initialData?.gallery ? JSON.parse(initialData.gallery) : []; } catch { return []; }
  });

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => setTags(tags.filter((_, i) => i !== index));

  const addStat = () => setStats([...stats, { label: '', value: '' }]);
  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };
  const removeStat = (index: number) => setStats(stats.filter((_, i) => i !== index));

  const addGalleryItem = () => setGallery([...gallery, { image: '', caption: '' }]);
  const updateGalleryItem = (index: number, field: keyof GalleryItem, value: string) => {
    const updated = [...gallery];
    updated[index][field] = value;
    setGallery(updated);
  };
  const removeGalleryItem = (index: number) => setGallery(gallery.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const body = {
      title, client, location, completionDate, description,
      challenge, solution, imageStyle,
      tags: JSON.stringify(tags),
      stats: JSON.stringify(stats.filter(s => s.label && s.value)),
      gallery: JSON.stringify(gallery.filter(g => g.image)),
    };

    try {
      const url = isEdit ? `/api/projects/${initialData.id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save project');
      }

      setSuccess(true);
      setTimeout(() => router.push('/dashboard/projects'), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!title && !client && !location) {
      setError('Please fill in at least a title, client, or location before generating.');
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, client, location, gallery,
          existingDescription: description,
        }),
      });

      if (!res.ok) throw new Error('AI generation failed');

      const data = await res.json();
      if (data.description) setDescription(data.description);
      if (data.challenge) setChallenge(data.challenge);
      if (data.solution) setSolution(data.solution);
      if (data.tags) setTags(data.tags);
      if (data.stats) setStats(data.stats);
    } catch (err: any) {
      setError('AI generation failed. You can still fill in the fields manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* STATUS MESSAGES */}
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
          <span className="text-sm font-medium">Project {isEdit ? 'updated' : 'created'} successfully! Redirecting...</span>
        </div>
      )}

      {/* ── SECTION 1: CORE INFO ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f1c40f]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#f1c40f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Project Details</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Project Title *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all text-lg font-semibold"
              placeholder="e.g. Highland Estate Outdoor Kitchen" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Client *</label>
            <input type="text" value={client} onChange={e => setClient(e.target.value)} required
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all"
              placeholder="Private Residence" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Location *</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} required
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all"
              placeholder="Austin, TX" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Completion Date</label>
            <input type="date" value={completionDate} onChange={e => setCompletionDate(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Image Style</label>
            <select value={imageStyle} onChange={e => setImageStyle(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all">
              <option value="grid">Grid</option>
              <option value="masonry">Masonry</option>
              <option value="carousel">Carousel</option>
              <option value="before-after">Before / After</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: WRITE-UP (with AI button) ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-[var(--staff-text)]">Write-Up</h2>
          </div>
          <button type="button" onClick={handleAIGenerate} disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {isGenerating ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span>AI Generate</span>
              </>
            )}
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all resize-none"
              placeholder="Describe the project scope and outcome..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Challenge</label>
              <textarea value={challenge} onChange={e => setChallenge(e.target.value)} rows={3}
                className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all resize-none"
                placeholder="What was the challenge?" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Solution</label>
              <textarea value={solution} onChange={e => setSolution(e.target.value)} rows={3}
                className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all resize-none"
                placeholder="How did your team solve it?" />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: GALLERY ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-[var(--staff-text)]">Gallery</h2>
            <span className="text-xs text-[var(--staff-muted)] bg-[var(--staff-surface-alt)] px-2 py-0.5 rounded-full">{gallery.length} images</span>
          </div>
          <button type="button" onClick={addGalleryItem}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] text-[var(--staff-text)] text-xs font-bold hover:border-[#f1c40f]/50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Image
          </button>
        </div>
        <div className="p-6">
          {gallery.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[var(--staff-border)] rounded-xl">
              <svg className="w-12 h-12 mx-auto text-[var(--staff-muted)]/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-sm text-[var(--staff-muted)]">No gallery images yet</p>
              <button type="button" onClick={addGalleryItem} className="mt-3 text-xs font-bold text-[#f1c40f] hover:underline">+ Add your first image</button>
            </div>
          ) : (
            <div className="space-y-4">
              {gallery.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[var(--staff-surface-alt)] rounded-xl border border-[var(--staff-border)] group animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="url" value={item.image} onChange={e => updateGalleryItem(i, 'image', e.target.value)}
                      className="bg-[var(--staff-surface)] border border-[var(--staff-border)] rounded-lg px-3 py-2 text-sm text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
                      placeholder="Image URL" />
                    <input type="text" value={item.caption} onChange={e => updateGalleryItem(i, 'caption', e.target.value)}
                      className="bg-[var(--staff-surface)] border border-[var(--staff-border)] rounded-lg px-3 py-2 text-sm text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
                      placeholder="Caption (optional)" />
                  </div>
                  <button type="button" onClick={() => removeGalleryItem(i)}
                    className="p-2 text-[var(--staff-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 4: TAGS ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Tags</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1c40f]/10 text-[#f1c40f] text-xs font-bold border border-[#f1c40f]/20 animate-in fade-in zoom-in duration-200">
                {tag}
                <button type="button" onClick={() => removeTag(i)} className="hover:text-red-400 transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              className="flex-1 bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
              placeholder="Type a tag and press Enter..." />
            <button type="button" onClick={addTag}
              className="px-4 py-2.5 rounded-xl bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] text-[var(--staff-text)] text-sm font-bold hover:border-[#f1c40f]/50 transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: STATS ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-[var(--staff-text)]">Project Stats</h2>
          </div>
          <button type="button" onClick={addStat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] text-[var(--staff-text)] text-xs font-bold hover:border-[#f1c40f]/50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Stat
          </button>
        </div>
        <div className="p-6">
          {stats.length === 0 ? (
            <p className="text-sm text-[var(--staff-muted)] text-center py-6">No stats added. Click "Add Stat" to show key metrics like build time, sq ft, etc.</p>
          ) : (
            <div className="space-y-3">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 group animate-in fade-in slide-in-from-left-2 duration-300">
                  <input type="text" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)}
                    className="flex-1 bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-lg px-3 py-2 text-sm text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
                    placeholder="Label (e.g. Build Time)" />
                  <input type="text" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)}
                    className="flex-1 bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-lg px-3 py-2 text-sm text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
                    placeholder="Value (e.g. 3 Weeks)" />
                  <button type="button" onClick={() => removeStat(i)}
                    className="p-2 text-[var(--staff-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SUBMIT ── */}
      <div className="flex items-center justify-between pt-4">
        <button type="button" onClick={() => router.push('/dashboard/projects')}
          className="px-6 py-3 rounded-xl text-[var(--staff-muted)] hover:text-[var(--staff-text)] font-medium transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSaving || success}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f1c40f] text-[#2c3e50] font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {isSaving ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              Saving...
            </>
          ) : success ? (
            <>✓ Saved</>
          ) : (
            <>{isEdit ? 'Update Project' : 'Create Project'}</>
          )}
        </button>
      </div>
    </form>
  );
}
