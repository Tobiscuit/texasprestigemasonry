import React from 'react';
import Hero from '@/shared/layout/Hero';
import Services from '@/features/landing/Services';
import TrustIndicators from '@/features/landing/TrustIndicators';
import ValueStack from '@/features/landing/ValueStack';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Fall back to empty arrays so components use their built-in mock/default data
  const services: any[] = [];
  const testimonials: any[] = [];

  return (
    <>
      <Hero />
      <Services services={services} />
      <ValueStack />
      <TrustIndicators testimonials={testimonials} />
    </>
  );
}
