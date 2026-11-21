import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projectCases } from '@/app/data/projects';
import { ProjectDetail } from '@/app/components/ProjectDetail';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectCases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — JOBA's Portfolio`,
    description: project.tagline.en,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return <ProjectDetail slug={slug} />;
}
