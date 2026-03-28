import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import DOMPurify from "isomorphic-dompurify";

const CONTENT_DIR = path.resolve(process.cwd(), "content");

// --- SECURITY UTILITIES ---

/**
 * Validates a slug to prevent path traversal (LFI) and ensure it only contains safe characters.
 * Rejects slugs with '..', '/', or '\'.
 */
function validateSlug(slug: string): boolean {
  // Only allow alphanumeric, hyphens, and underscores
  const safeRegex = /^[a-z0-9-_]+$/i;
  return safeRegex.test(slug);
}

/**
 * Ensures a resolved path is strictly within the CONTENT_DIR to prevent RCE/LFI.
 */
function isPathContained(targetPath: string): boolean {
  const resolvedPath = path.resolve(targetPath);
  return resolvedPath.startsWith(CONTENT_DIR);
}

// --- UTILITIES ---

async function getJsonFile<T>(filename: string): Promise<T> {
  // filenames are controlled by our code (constants), not user input,
  // but we still apply containment check for consistency.
  const filePath = path.join(CONTENT_DIR, filename);
  if (!isPathContained(filePath)) {
    throw new Error("Security violation: Path traversal detected.");
  }

  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

async function getMarkdownFiles<T>(directory: string): Promise<T[]> {
  const dirPath = path.join(CONTENT_DIR, directory);
  if (!isPathContained(dirPath)) {
    throw new Error("Security violation: Path traversal detected.");
  }

  const files = await fs.readdir(dirPath);
  
  const content = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(dirPath, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content: body } = matter(fileContent);
        return { ...data, body, slug: file.replace(/\.md$/, "") } as T;
      })
  );
  
  return content;
}

async function getMarkdownBySlug<T>(directory: string, slug: string): Promise<T | null> {
  // 1. Validate slug input (LFI prevention)
  if (!validateSlug(slug)) {
    console.warn(`Blocked potentially malicious slug attempt: ${slug}`);
    return null;
  }

  try {
    const filePath = path.join(CONTENT_DIR, directory, `${slug}.md`);
    
    // 2. Path containment check (LFI/RCE prevention)
    if (!isPathContained(filePath)) {
      console.warn(`Blocked out-of-bounds path access: ${filePath}`);
      return null;
    }

    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content: body } = matter(fileContent);
    
    // 3. Convert Markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(body);
    
    // 4. Sanitize HTML (XSS prevention)
    const rawHtml = processedContent.toString();
    const contentHtml = DOMPurify.sanitize(rawHtml);

    return { ...data, body, contentHtml } as T;
  } catch (error) {
    return null;
  }
}

// --- PUBLIC API ---

export const getLandingPageData = () => getJsonFile<any>("landing-page.json");
export const getExperiencesData = () => getJsonFile<any[]>("experiences.json");
export const getContactData = () => getJsonFile<any>("contact.json");

export interface Article {
  title: string;
  date: string;
  tags: string[];
  category: string;
  slug: string;
  image: string;
  excerpt: string;
  body: string;
  contentHtml?: string;
  language?: string;
}

export const getArticles = () => getMarkdownFiles<Article>("blog");
export const getArticleBySlug = (slug: string) => getMarkdownBySlug<Article>("blog", slug);

export interface Project {
  title: string;
  description: string;
  image: string;
  images?: string[];
  slug: string;
  category: string;
  tags: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  body: string;
  contentHtml?: string;
}

export const getProjects = () => getMarkdownFiles<Project>("projects");
export const getProjectBySlug = (slug: string) => getMarkdownBySlug<Project>("projects", slug);
