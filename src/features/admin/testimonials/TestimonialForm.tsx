'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TestimonialFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function TestimonialForm({ initialData, isEdit }: TestimonialFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [quote, setQuote] = useState(initialData?.quote || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [featured, setFeatured] = useState(initialData?.featured || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const body = { quote, author, location, rating, featured };

    try {
      const url = isEdit ? `/api/testimonials/${initialData.id}` : '/api/testimonials';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save');
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/testimonials'), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

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
          <span className="text-sm font-medium">Testimonial {isEdit ? 'updated' : 'created'}! Redirecting...</span>
        </div>
      )}

      <div className="bg-[var(--staff-surface)] rounded-2xl border border-[var(--staff-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--staff-border)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f1c40f]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#f1c40f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--staff-text)]">Testimonial</h2>
        </div>
        <div className="p-6 space-y-6">
          {/* QUOTE */}
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Quote *</label>
            <div className="relative">
              <span className="absolute top-3 left-4 text-3xl text-[#f1c40f]/30 font-serif leading-none">&ldquo;</span>
              <textarea value={quote} onChange={e => setQuote(e.target.value)} rows={4} required
                className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl pl-12 pr-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all resize-none text-lg italic leading-relaxed"
                placeholder="They transformed our backyard into a masterpiece..." />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Author *</label>
              <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required
                className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
                placeholder="John & Sarah M." />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-2">Location *</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} required
                className="w-full bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] rounded-xl px-4 py-3 text-[var(--staff-text)] placeholder:text-[var(--staff-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 transition-all"
                placeholder="Westlake, TX" />
            </div>
          </div>

          {/* STAR RATING */}
          <div>
            <label className="block text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-3">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type="button" onClick={() => setRating(star)}
                  className="group p-1 transition-transform hover:scale-125 active:scale-95">
                  <svg className={`w-8 h-8 transition-colors duration-200 ${star <= rating ? 'text-[#f1c40f] drop-shadow-[0_0_8px_rgba(241,196,15,0.5)]' : 'text-[var(--staff-border)]'}`}
                    fill={star <= rating ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              ))}
              <span className="ml-3 text-sm font-bold text-[var(--staff-text)]">{rating}/5</span>
            </div>
          </div>

          {/* FEATURED TOGGLE */}
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setFeatured(!featured)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${featured ? 'bg-[#f1c40f]' : 'bg-[var(--staff-border)]'}`}>
              <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${featured ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm font-medium text-[var(--staff-text)]">Featured on Homepage</span>
          </div>

          {/* PREVIEW CARD */}
          {quote && (
            <div className="mt-6 p-6 rounded-xl bg-[var(--staff-surface-alt)] border border-[var(--staff-border)]">
              <p className="text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-3">Preview</p>
              <blockquote className="text-lg italic text-[var(--staff-text)] leading-relaxed mb-4">&ldquo;{quote}&rdquo;</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f1c40f]/20 flex items-center justify-center text-[#f1c40f] font-bold text-sm">
                  {author ? author.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <div className="font-bold text-sm text-[var(--staff-text)]">{author || 'Author Name'}</div>
                  <div className="text-xs text-[var(--staff-muted)]">{location || 'Location'}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className={`w-4 h-4 ${s <= rating ? 'text-[#f1c40f]' : 'text-[var(--staff-border)]'}`}
                      fill={s <= rating ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── SUBMIT ── */}
      <div className="flex items-center justify-between pt-4">
        <button type="button" onClick={() => router.push('/dashboard/testimonials')}
          className="px-6 py-3 rounded-xl text-[var(--staff-muted)] hover:text-[var(--staff-text)] font-medium transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSaving || success}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f1c40f] text-[#2c3e50] font-black text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {isSaving ? 'Saving...' : success ? '✓ Saved' : isEdit ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </div>
    </form>
  );
}
