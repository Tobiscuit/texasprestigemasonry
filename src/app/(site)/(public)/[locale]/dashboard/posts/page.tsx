
import React from 'react';
import Link from 'next/link';
import { getPosts } from './actions';
import PostsTableClient from './PostsTableClient';
import type { Post } from '@/types/models';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard" className="text-[var(--staff-muted)] hover:text-[#f1c40f] text-sm font-bold uppercase tracking-widest transition-colors">
              Command Center
            </Link>
            <span className="text-[var(--staff-border)]">/</span>
            <span className="text-[#f1c40f] text-sm font-bold uppercase tracking-widest">
              Content
            </span>
          </div>
          <h1 className="text-4xl font-black text-[var(--staff-text)]">Blog Posts</h1>
        </div>

        <Link
          href="/dashboard/posts/create"
          className="
            flex items-center gap-2 bg-[#f1c40f] text-[#2c3e50] font-bold px-6 py-3 rounded-xl 
            shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] 
            hover:-translate-y-1 transition-all duration-300
          "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Write Post</span>
        </Link>
      </div>

      {/* DATA TABLE */}
      <PostsTableClient posts={posts} />
    </div>
  );
}
