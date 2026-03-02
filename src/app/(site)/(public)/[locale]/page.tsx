import React from 'react';
import Hero from '@/shared/layout/Hero';
import Services from '@/features/landing/Services';
import TrustIndicators from '@/features/landing/TrustIndicators';
import ValueStack from '@/features/landing/ValueStack';
import { getServices } from './dashboard/services/actions';
import { getTestimonials } from './dashboard/testimonials/actions';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const services = await getServices();
  const testimonials = await getTestimonials();

  return (
    <>
      <Hero />
      <Services services={services} />
      <ValueStack />
      <TrustIndicators testimonials={testimonials} />
    </>
  );
}

