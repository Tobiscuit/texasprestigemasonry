import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import PublicLayoutWrapper from '@/shared/layout/PublicLayoutWrapper'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PublicLayoutWrapper>
        {children}
      </PublicLayoutWrapper>
    </NextIntlClientProvider>
  )
}
