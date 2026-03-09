import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

function readMdxFiles<T>(dir: string): { data: T; content: string }[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullPath, file), "utf-8");
      const { data, content } = matter(raw);
      return { data: data as T, content: content.trim() };
    })
    .sort(
      (a, b) =>
        ((a.data as { order?: number }).order ?? 0) -
        ((b.data as { order?: number }).order ?? 0),
    );
}

export interface Experience {
  period: string;
  company: string;
  role: string;
  order?: number;
}

export interface Project {
  period: string;
  title: string;
  tech: string;
  order?: number;
}

export interface Education {
  period: string;
  title: string;
  detail: string;
  order?: number;
}

export function getExperiences() {
  return readMdxFiles<Experience>("experiences");
}

export function getProjects() {
  return readMdxFiles<Project>("projects");
}

export function getEducation() {
  return readMdxFiles<Education>("education");
}
