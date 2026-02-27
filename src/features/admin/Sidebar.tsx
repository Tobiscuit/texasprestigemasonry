'use client';
import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[280px] fixed inset-y-0 left-0 z-30 bg-[var(--staff-surface)] border-r border-[var(--staff-border)] p-6">
      <div className="text-xl font-black text-[var(--staff-text)] mb-8">⚡ Command Center</div>
      <nav className="space-y-2 flex-grow">
        {[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Projects', href: '/dashboard/projects' },
          { label: 'Services', href: '/dashboard/services' },
          { label: 'Posts', href: '/dashboard/posts' },
          { label: 'Testimonials', href: '/dashboard/testimonials' },
          { label: 'Media', href: '/dashboard/media' },
          { label: 'Users', href: '/dashboard/users' },
          { label: 'Emails', href: '/dashboard/emails' },
          { label: 'Settings', href: '/dashboard/settings' },
        ].map(item => (
          <a
            key={item.href}
            href={item.href}
            className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--staff-muted)] hover:text-[var(--staff-text)] hover:bg-[var(--staff-surface-alt)] transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
