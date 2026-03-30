import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// In an NPM module, this could be configured via an initialization function.
// For Next.js, we default to the local content directory.
export const DEFAULT_CONTENT_DIR = path.resolve(process.cwd(), "content");

export function validateSlug(slug: string): boolean {
  const safeRegex = /^[a-z0-9-_]+$/i;
  return safeRegex.test(slug);
}

export function isPathContained(targetPath: string, baseDir: string = DEFAULT_CONTENT_DIR): boolean {
  const resolvedPath = path.resolve(targetPath);
  return resolvedPath.startsWith(baseDir);
}

export async function getJsonFile<T>(filename: string, baseDir: string = DEFAULT_CONTENT_DIR): Promise<T> {
  const filePath = path.join(baseDir, filename);
  if (!isPathContained(filePath, baseDir)) {
    throw new Error(`Security violation: Path traversal detected for ${filename}`);
  }

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      throw new Error(`Content file not found: ${filename}. Please ensure it exists in the content directory.`);
    }
    throw new Error(`Failed to parse content file ${filename}: ${(error as Error).message}`);
  }
}

export async function getMarkdownFiles<T>(directory: string, baseDir: string = DEFAULT_CONTENT_DIR): Promise<T[]> {
  const dirPath = path.join(baseDir, directory);
  if (!isPathContained(dirPath, baseDir)) {
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

export async function getMarkdownBySlug<T>(directory: string, slug: string, baseDir: string = DEFAULT_CONTENT_DIR): Promise<T | null> {
  if (!validateSlug(slug)) {
    console.warn(`Blocked potentially malicious slug attempt: ${slug}`);
    return null;
  }

  try {
    const filePath = path.join(baseDir, directory, `${slug}.md`);
    if (!isPathContained(filePath, baseDir)) {
      console.warn(`Blocked out-of-bounds path access: ${filePath}`);
      return null;
    }

    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content: body } = matter(fileContent);
    return { ...data, body } as T;
  } catch (error) {
    console.error(`Error processing markdown for ${slug}:`, error);
    return null;
  }
}
