'use client';

import React from 'react';
import Link from 'next/link';
import { DataTable } from '@/features/admin/ui/DataTable';

interface TestimonialsTableClientProps {
    testimonials: any[];
}

export default function TestimonialsTableClient({ testimonials }: TestimonialsTableClientProps) {
    return (
        <DataTable
            data={testimonials}
            columns={[
                {
                    header: 'Author',
                    cell: (item: any) => (
                        <div>
                            <div className="font-bold text-lg text-[var(--staff-text)] group-hover:text-[#f1c40f] transition-colors">
                                {item.author}
                            </div>
                            <div className="text-xs text-[var(--staff-muted)]">{item.location}</div>
                        </div>
                    )
                },
                {
                    header: 'Rating',
                    cell: (item: any) => (
                        <div className="flex gap-1 text-[#f1c40f]">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-[var(--staff-border)] fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            ))}
                        </div>
                    )
                },
                {
                    header: 'Quote',
                    cell: (item: any) => (
                        <div className="text-sm text-[var(--staff-muted)] italic line-clamp-2 max-w-md">
                            "{item.quote}"
                        </div>
                    )
                },
                {
                    header: 'Featured',
                    cell: (item: any) => (
                        item.featured ? (
                            <span className="inline-block px-2 py-1 rounded bg-[#f1c40f20] text-[#f1c40f] text-xs font-bold uppercase tracking-wider">
                                Featured
                            </span>
                        ) : null
                    )
                },
                {
                    header: '',
                    className: 'text-right',
                    cell: (item: any) => (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/dashboard/testimonials/${item.id}`}
                                className="p-2 bg-[var(--staff-surface-alt)] hover:bg-[#f1c40f] hover:text-[#2c3e50] rounded-lg transition-colors"
                                title="Edit Testimonial"
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
