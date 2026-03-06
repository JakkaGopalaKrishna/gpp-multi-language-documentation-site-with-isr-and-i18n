'use client'

import { createInstance, Resource } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import initTranslations from '@/app/i18n'

let i18n: any = null

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: {
  children: React.ReactNode
  locale: string
  namespaces: string[]
  resources: Resource
}) {
  const router = useRouter()
  const [instance, setInstance] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      if (!i18n) {
        i18n = createInstance()
        await initTranslations(locale, namespaces, i18n, resources)
      }
      setInstance(i18n)
    }
    init()
  }, [locale, namespaces, resources])

  if (!instance) {
    return null
  }

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>
}