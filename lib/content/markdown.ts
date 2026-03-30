import { Article, Project } from "../types";
import { getMarkdownFiles, getMarkdownBySlug } from "./core";

export const getArticles = async (): Promise<Article[]> => {
  const articles = await getMarkdownFiles<Article>("blog");
  return articles.filter(article => article.published !== false);
};

export const getArticleBySlug = (slug: string) => getMarkdownBySlug<Article>("blog", slug);

export const getProjects = async (): Promise<Project[]> => {
  const projects = await getMarkdownFiles<Project>("projects");
  return projects.filter(project => project.published !== false);
};

export const getProjectBySlug = (slug: string) => getMarkdownBySlug<Project>("projects", slug);
