import { ReactNode } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

interface LayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}

export default function DocsLayout({ children, params }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar locale={params.locale} />
      <div className="flex-1 flex flex-col">
        <Header locale={params.locale} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}