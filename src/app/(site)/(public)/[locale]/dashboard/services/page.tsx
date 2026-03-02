import React from 'react';
import Link from 'next/link';
import { getServices } from './actions';
import ServicesTableClient from './ServicesTableClient';
import type { Service } from '@/types/models';

// This is a Server Component
export default async function ServicesPage() {
  const services = await getServices();

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
              Operations
            </span>
          </div>
          <h1 className="text-4xl font-black text-[var(--staff-text)]">Services</h1>
        </div>

        <Link
          href="/dashboard/services/create"
          className="
            flex items-center gap-2 bg-[#f1c40f] text-[#2c3e50] font-bold px-6 py-3 rounded-xl 
            shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] 
            hover:-translate-y-1 transition-all duration-300
          "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Service</span>
        </Link>
      </div>

      {/* DATA TABLE */}
      <ServicesTableClient services={services} />
    </div>
  );
}
