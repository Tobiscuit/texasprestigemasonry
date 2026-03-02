'use client';

import React from 'react';
import Link from 'next/link';
import { DataTable } from '@/features/admin/ui/DataTable';

interface PostsTableClientProps {
    posts: any[];
}

export default function PostsTableClient({ posts }: PostsTableClientProps) {
    return (
        <DataTable
            data={posts}
            columns={[
                {
                    header: 'Title',
                    cell: (item: any) => (
                        <div>
                            <div className="font-bold text-lg text-[var(--staff-text)] group-hover:text-[#f1c40f] transition-colors line-clamp-1">
                                {item.title}
                            </div>
                            <div className="text-xs text-[var(--staff-muted)]">/{item.slug}</div>
                        </div>
                    )
                },
                {
                    header: 'Category',
                    cell: (item: any) => (
                        <span className="inline-block px-3 py-1 rounded-md bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] text-xs font-bold text-[var(--staff-muted)]">
                            {item.category || 'Uncategorized'}
                        </span>
                    )
                },
                {
                    header: 'Status',
                    cell: (item: any) => (
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.status === 'published' ? 'bg-[#2ecc71]' : 'bg-[#95a5a6]'}`}></div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${item.status === 'published' ? 'text-[#2ecc71]' : 'text-[#95a5a6]'}`}>
                                {item.status || 'Draft'}
                            </span>
                        </div>
                    )
                },
                {
                    header: 'Published',
                    cell: (item: any) => (
                        <div className="text-sm text-[var(--staff-muted)]">
                            {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : '-'}
                        </div>
                    )
                },
                {
                    header: '',
                    className: 'text-right',
                    cell: (item: any) => (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/dashboard/posts/${item.id}`}
                                className="p-2 bg-[var(--staff-surface-alt)] hover:bg-[#f1c40f] hover:text-[#2c3e50] rounded-lg transition-colors"
                                title="Edit Post"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </Link>
                        </div>
                    )
                }
            ]}
        />
    );
}
