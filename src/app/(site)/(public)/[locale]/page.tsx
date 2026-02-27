import React from 'react';
import Hero from '@/shared/layout/Hero';
import Services from '@/features/landing/Services';
import TrustIndicators from '@/features/landing/TrustIndicators';
import ValueStack from '@/features/landing/ValueStack';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Attempt to load data from Payload CMS, fall back to empty arrays if DB isn't configured
  let services: any[] = [];
  let testimonials: any[] = [];

  try {
    const { getPayload } = await import('payload');
    const configPromise = (await import('@/payload.config')).default;
    const payload = await getPayload({ config: configPromise });

    const servicesResult = await payload.find({
      collection: 'services',
      sort: 'order',
      locale: locale as 'en' | 'es',
    });
    services = servicesResult.docs;

    const testimonialsResult = await payload.find({
      collection: 'testimonials',
      where: {
        featured: {
          equals: true,
        },
      },
      locale: locale as 'en' | 'es',
    });
    testimonials = testimonialsResult.docs;
  } catch (e) {
    // Payload/DB not available — render with mock data from components
    console.log('[Home] Payload not available, using component defaults.');
  }

  return (
    <>
      <Hero />
      <Services services={services} />
      <ValueStack />
      <TrustIndicators testimonials={testimonials} />
    </>
  );
}
