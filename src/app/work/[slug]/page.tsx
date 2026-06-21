import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/data/caseStudies';
import { CaseStudyHero } from '@/components/caseStudy/CaseStudyHero';
import { CaseStudyRenderer } from '@/components/caseStudy/CaseStudyRenderer';

export function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.client} — Case Study`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-portfolio-bg">
      <CaseStudyHero study={study} />
      <CaseStudyRenderer sections={study.sections} />
    </main>
  );
}
