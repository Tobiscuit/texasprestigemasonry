'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const CATEGORIES = [
  'masonry-tips', 'outdoor-living', 'commercial', 'materials',
  'design-trends', 'maintenance', 'case-study', 'industry-news',
];

export default function PostForm({ initialData, isEdit }: PostFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.htmlContent || initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
  const [status, setStatus] = useState(initialData?.status || 'draft');
  const [keywords, setKeywords] = useState(initialData?.keywords || '');
  const [quickNotes, setQuickNotes] = useState(initialData?.quickNotes || '');
  const [publishedAt, setPublishedAt] = useState(initialData?.publishedAt || '');

  const autoSlug = (t: string) => t.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const handleAIGenerate = async () => {
    if (!title) { setError('Enter a title/topic first.'); return; }
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, quickNotes }),
      });
      if (!res.ok) throw new Error('AI generation failed');
      const data = await res.json();
      if (data.content) setContent(data.content);
      if (data.excerpt) setExcerpt(data.excerpt);
      if (data.keywords) setKeywords(data.keywords);
    } catch {
      setError('AI generation failed. Write the post manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const body = {
      title, slug: slug || autoSlug(title), excerpt,
      content, htmlContent: content, category, status,
      keywords, quickNotes,
      publishedAt: status === 'published' ? (publishedAt || new Date().toISOString()) : publishedAt,
    };

    try {
      const url = isEdit ? `/api/posts/${initialData.id}` : '/api/posts';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save');
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/posts'), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

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
          <span className="text-sm font-medium">Post {isEdit ? 'updated' : 'created'}! Redirecting...</span>
        </div>
      )}

      {/* ── META ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f1c40f]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#f1c40f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Post Details</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Title *</label>
            <input type="text" value={title} onChange={e => { setTitle(e.target.value); if (!isEdit) setSlug(autoSlug(e.target.value)); }} required
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all text-lg font-semibold"
              placeholder="How to Choose the Right Stone for Your Patio" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Slug</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all">
              {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Status</label>
            <div className="flex gap-2">
              {['draft', 'published'].map(s => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${status === s
                    ? s === 'published'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#f1c40f]/20 text-[#f1c40f] border border-[#f1c40f]/30'
                    : 'bg-[var(--staff-surface-alt)] text-[var(--staff-muted)] border border-[var(--staff-border)] hover:border-[var(--staff-text)]/20'
                    }`}>
                  {s === 'published' ? '🟢 ' : '📝 '}{s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Publish Date</label>
            <input type="datetime-local" value={publishedAt ? publishedAt.substring(0, 16) : ''} onChange={e => setPublishedAt(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Excerpt</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all resize-none"
              placeholder="A short summary for blog cards..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">SEO Keywords</label>
            <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all text-sm"
              placeholder="Comma-separated: patio stone, Texas masonry, outdoor living" />
          </div>
        </div>
      </div>

      {/* ── CONTENT (with AI + preview) ── */}
      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-[var(--staff-text)]">Content</h2>
            <span className="text-xs text-[var(--staff-muted)] bg-[var(--staff-surface-alt)] px-2 py-0.5 rounded-full">{wordCount} words</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] text-[var(--staff-text)] text-xs font-bold hover:border-[#f1c40f]/50 transition-colors">
              {previewMode ? '✏️ Edit' : '👁 Preview'}
            </button>
            <button type="button" onClick={handleAIGenerate} disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isGenerating ? (
                <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Generating...</>
              ) : (
                <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> AI Draft</>
              )}
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Quick Notes for AI</label>
            <input type="text" value={quickNotes} onChange={e => setQuickNotes(e.target.value)}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
              placeholder="Context for AI: e.g. 'Focus on limestone for pool areas in Houston heat'" />
          </div>
          {previewMode ? (
            <div className="prose prose-invert max-w-none bg-[var(--staff-surface-alt)] rounded-xl p-6 border border-[var(--staff-border)] min-h-[400px]"
              dangerouslySetInnerHTML={{ __html: content || '<p style="color: var(--staff-muted)">Nothing to preview yet...</p>' }} />
          ) : (
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={16}
              className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all resize-none font-mono text-sm leading-relaxed"
              placeholder="Write your blog post content here (HTML supported)..." />
          )}
        </div>
      </div>

      {/* ── SUBMIT ── */}
      <div className="flex items-center justify-between pt-4">
        <button type="button" onClick={() => router.push('/dashboard/posts')}
          className="px-6 py-3 rounded-xl text-[var(--staff-muted)] hover:text-[var(--staff-text)] font-medium transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSaving || success}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f1c40f] text-[#2c3e50] font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {isSaving ? 'Saving...' : success ? '✓ Saved' : isEdit ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
}
