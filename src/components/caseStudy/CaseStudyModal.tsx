'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import type { CaseStudy } from '@/data/caseStudies';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyRenderer } from './CaseStudyRenderer';

const EXIT_MS = 420;

interface Props {
  study: CaseStudy;
}

export function CaseStudyModal({ study }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 10);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    setTimeout(() => router.back(), EXIT_MS);
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dismiss]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-portfolio-bg/60 backdrop-blur-sm"
        animate={{ opacity: open ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={dismiss}
        aria-hidden="true"
      />

      <motion.div
        className="fixed inset-x-0 top-24 bottom-0 z-45 mx-auto max-w-7xl overflow-y-auto rounded-2xl bg-portfolio-bg shadow-[0_-8px_48px_rgba(0,0,0,0.5)]"
        animate={{ y: open ? 0 : '100%' }}
        initial={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 38, mass: 0.9 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${study.client} case study`}
      >
        <CaseStudyHero study={study} />
        <CaseStudyRenderer sections={study.sections} />
      </motion.div>
    </>
  );
}
