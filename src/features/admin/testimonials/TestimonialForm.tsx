'use client';
import React from 'react';

export default function TestimonialForm({ testimonial, action, initialData, buttonLabel, ...props }: any) {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl p-6 border border-[var(--staff-border)]">
      <p className="text-[var(--staff-muted)]">Testimonial form - stub component (will be connected to Hono API)</p>
    </div>
  );
}
