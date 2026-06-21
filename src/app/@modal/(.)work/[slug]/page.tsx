import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/data/caseStudies';
import { CaseStudyModal } from '@/components/caseStudy/CaseStudyModal';

export default async function ModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return <CaseStudyModal study={study} />;
}
