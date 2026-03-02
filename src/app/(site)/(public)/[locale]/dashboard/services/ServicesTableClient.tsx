'use client';

import React from 'react';
import Link from 'next/link';
import { DataTable } from '@/features/admin/ui/DataTable';

interface ServicesTableClientProps {
    services: any[];
}

export default function ServicesTableClient({ services }: ServicesTableClientProps) {
    return (
        <DataTable
            data={services}
            columns={[
                {
                    header: 'Service Name',
                    cell: (item: any) => (
                        <div>
                            <div className="font-bold text-lg text-[var(--staff-text)] group-hover:text-[#f1c40f] transition-colors">
                                {item.title}
                            </div>
                            <div className="text-xs text-[var(--staff-muted)] line-clamp-1">{item.description}</div>
                        </div>
                    )
                },
                {
                    header: 'Category',
                    cell: (item: any) => (
                        <span className="inline-block px-3 py-1 rounded-md bg-[var(--staff-surface-alt)] border border-[var(--staff-border)] text-xs font-bold text-[var(--staff-muted)]">
                            {item.category}
                        </span>
                    )
                },
                {
                    header: 'Price',
                    cell: (item: any) => (
                        <div className="text-[#2ecc71] font-bold font-mono">
                            ${item.price}
                        </div>
                    )
                },
                {
                    header: 'Highlight',
                    cell: (item: any) => (
                        item.highlight ? <span className="text-[#f1c40f] text-xs font-bold uppercase">Featured</span> : <span className="text-[var(--staff-muted)] text-xs">-</span>
                    )
                },
                {
                    header: '',
                    className: 'text-right',
                    cell: (item: any) => (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/dashboard/services/${item.id}`}
                                className="p-2 bg-[var(--staff-surface-alt)] hover:bg-[#f1c40f] hover:text-[#2c3e50] rounded-lg transition-colors"
                                title="Edit Service"
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
