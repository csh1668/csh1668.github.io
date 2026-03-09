import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

function readMdxFiles<T>(
  dir: string,
): { data: T; content: string; filename: string }[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];

  return (
    fs
      .readdirSync(fullPath)
      .filter((f) => f.endsWith(".mdx"))
      .map((file) => {
        const raw = fs.readFileSync(path.join(fullPath, file), "utf-8");
        const { data, content } = matter(raw);
        return { data: data as T, content: content.trim(), filename: file };
      })
      // 번호가 큰 파일이 상단에 위치한다
      .sort((a, b) => b.filename.localeCompare(a.filename))
  );
}

export interface Experience {
  period: string;
  company: string;
  role: string;
}

export interface Project {
  period: string;
  title: string;
  tech: string;
}

export interface Education {
  period: string;
  title: string;
}

export interface Activity {
  period: string;
  title: string;
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

export function getActivities() {
  return readMdxFiles<Activity>("activities");
}
