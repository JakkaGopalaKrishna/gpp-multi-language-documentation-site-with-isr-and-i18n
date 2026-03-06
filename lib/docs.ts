import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';

const docsDirectory = path.join(process.cwd(), '_docs');

export async function getDocData(locale: string, version: string, id: string) {
  const fullPath = path.join(docsDirectory, locale, version, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  // Added 'as any' to bypass the version-mismatch type error in Next.js 15
  const processedContent = await remark()
    .use(slug as any)
    .use(html as any)
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  // Basic heading extraction for TOC (Requirement 11)
  const headings = matterResult.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.split('#').length - 1;
      const text = line.replace(/#/g, '').trim();
      return { level, text, id: text.toLowerCase().replace(/\s+/g, '-') };
    });

  return {
    id,
    contentHtml,
    headings,
    ...(matterResult.data as { title: string }),
  };
}