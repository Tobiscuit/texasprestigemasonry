'use client';
import React, { useState, useRef } from 'react';

interface UploadedFile {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export default function QuickUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Upload failed');
        }
        const data = await res.json();
        setUploaded(prev => [data, ...prev]);
      } catch (err: any) {
        setError(err.message);
      }
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* DROP ZONE */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${dragOver
            ? 'border-[#f1c40f] bg-[#f1c40f]/5 scale-[1.02]'
            : 'border-[var(--staff-border)] hover:border-[#f1c40f]/50 hover:bg-[var(--staff-surface-alt)]'
          }`}
      >
        <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => handleUpload(e.target.files)} />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-[#f1c40f] animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            <span className="text-sm text-[var(--staff-muted)]">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-[var(--staff-muted)]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <span className="text-xs font-bold text-[var(--staff-muted)] uppercase tracking-wider">Drop files or click</span>
            <span className="text-[10px] text-[var(--staff-muted)]/60">JPEG, PNG, WebP, AVIF • Max 10MB</span>
          </div>
        )}
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 rounded-lg p-2 border border-red-500/20">
          {error}
        </div>
      )}

      {/* UPLOADED FILES */}
      {uploaded.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-[var(--staff-muted)] uppercase tracking-wider">Recently Uploaded</p>
          {uploaded.map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--staff-surface)] border border-[var(--staff-border)] overflow-hidden shrink-0">
                <img src={file.url} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[var(--staff-text)] truncate">{file.filename}</p>
                <p className="text-[10px] text-[var(--staff-muted)]">{formatSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(file.url); }}
                className="p-1.5 rounded-md hover:bg-[#f1c40f]/10 text-[var(--staff-muted)] hover:text-[#f1c40f] transition-colors"
                title="Copy URL"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
