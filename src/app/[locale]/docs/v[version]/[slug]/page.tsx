export const revalidate = 60

import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import TableOfContents from '@/components/TableOfContents'
import CodeBlockEnhancer from '@/components/CodeBlockEnhancer'
import { Metadata } from 'next'

interface PageProps {
  params: {
    locale: string
    version: string
    slug: string
  }
}

export async function generateStaticParams() {
  const locales = ['en', 'es', 'fr', 'de']
  const versions = ['v1', 'v2', 'v3']
  const params = []

  for (const locale of locales) {
    for (const version of versions) {
      const docsDir = path.join(process.cwd(), '_docs', version, locale)
      if (fs.existsSync(docsDir)) {
        const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'))
        for (const file of files) {
          const slug = file.replace('.md', '')
          params.push({ locale, version, slug })
        }
      }
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, version, slug } = params
  const filePath = path.join(process.cwd(), '_docs', version, locale, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    return {}
  }
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return {
    title: data.title || 'Documentation',
  }
}

export default async function DocPage({ params }: PageProps) {
  const { locale, version, slug } = params
  const filePath = path.join(process.cwd(), '_docs', version, locale, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          data-testid="doc-content"
        />
        <FeedbackWidget />
        <CodeBlockEnhancer />
      </div>
      <TableOfContents content={content} />
    </div>
  )
}