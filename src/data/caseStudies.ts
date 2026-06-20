import type { StaticImageData } from 'next/image';
import sisuPlusHero from '@/assets/images/sisu_plus1.png';

export interface RichSpan {
  text: string;
  bold?: boolean;
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  icon: 'users' | 'check' | 'grid' | 'star' | 'arrow-right' | 'clock';
}

export interface Step {
  icon: 'search' | 'palette' | 'grid' | 'rocket';
  title: string;
  body: string;
}

export type BentoCell =
  | {
      block: 'text-card';
      label?: string;
      labelIcon?: 'target' | 'users' | 'grid' | 'search';
      title: string;
      body: string;
      span?: 'wide';
      richText?: RichSpan[];
    }
  | { block: 'metric'; value: string; label: string; icon: 'users' | 'grid' | 'check' | 'star' }
  | { block: 'info-card'; icon: 'user' | 'calendar' | 'layers'; label: string; content: string }
  | { block: 'tech-stack'; icon?: 'layers'; label?: string; tags: Array<{ label: string; color?: string }> };

export type CaseStudySection =
  | { type: 'section-heading'; eyebrow: string; title: string }
  | { type: 'bento-grid'; eyebrow?: string; title?: string; cells: BentoCell[] }
  | { type: 'stat-bento'; eyebrow?: string; title?: string; stats: StatItem[] }
  | { type: 'step-list'; eyebrow?: string; title: string; steps: Step[] }
  | { type: 'pullquote'; quote: string; attribution?: string }
  | { type: 'mockup'; src: string; caption?: string; badge?: string; variant: 'full' | 'inset' };

export interface CaseStudy {
  slug: string;
  client: string;
  year: string;
  headline: string;
  headlineAccent: string;
  tagline: string;
  accentColor: string;
  meta: {
    role: string;
    timeline: string;
    surface: string;
    users: string;
  };
  link?: { label: string; url: string };
  tags?: string[];
  heroImage?: string | StaticImageData;
  sections: CaseStudySection[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'sisu-plus',
    client: 'Sisu+',
    year: '2026 — onwards',
    headline: 'The Sisu we',
    headlineAccent: 'deserve, finally.',
    tagline:
      "Reimagining a Finnish university's student portal as a browser extension, a full replacement for the dreaded original, not a coat of paint.",
    accentColor: '#52c989',
    heroImage: sisuPlusHero,
    meta: {
      role: 'Solo design + build',
      timeline: '2 months',
      surface: 'Chrome extension',
      users: '30+ students',
    },
    link: { label: 'Experience Sisu+', url: 'https://sisu-plus.matt-pasek.dev' },
    tags: ['Product Design', 'Design System', 'Browser Extension', 'Data Viz'],
    sections: [
      {
        type: 'bento-grid',
        eyebrow: 'THE BRIEF',
        title: 'Sisu, but it respects your time.',
        cells: [
          {
            block: 'text-card',
            label: 'PROBLEM',
            labelIcon: 'target',
            title: 'Required, dreaded, unavoidable.',
            span: 'wide',
            richText: [
              {
                text: "Every Finnish university student lives in Sisu: enrolments, study plans, degree progress. It's clunky, table-heavy, and stressful to navigate under deadline pressure. The goal wasn't to skin it. It was to ",
              },
              { text: 'replace the student-facing surface entirely', bold: true },
              { text: ' with something calmer and more capable.' },
            ],
            body: '',
          },
          { block: 'metric', value: '30+', label: 'Active Chrome users', icon: 'users' },
          { block: 'metric', value: '4', label: 'Surfaces rebuilt', icon: 'grid' },
          {
            block: 'info-card',
            icon: 'user',
            label: 'ROLE',
            content: 'Solo. Research, API reverse engineering, product design, design system, and the full build.',
          },
          {
            block: 'info-card',
            icon: 'calendar',
            label: 'TIMELINE',
            content: '2 months, nights and weekends, alongside studies and professional work.',
          },
          {
            block: 'tech-stack',
            icon: 'layers',
            label: 'STACK',
            tags: [
              { label: 'REACT', color: '#38bdf8' },
              { label: 'VITE', color: '#a78bfa' },
              { label: 'BUN', color: '#f97316' },
              { label: 'TAILWIND', color: '#38bdf8' },
            ],
          },
        ],
      },
      {
        type: 'section-heading',
        eyebrow: 'THE APPROACH',
        title:
          'A serious instrument for academic work. Dark enough to recede, structured enough to handle density, with a single earned green that lights up only when something real has happened.',
      },
      {
        type: 'step-list',
        eyebrow: 'HOW IT WAS BUILT',
        title: 'Four moves, one person.',
        steps: [
          {
            icon: 'search',
            title: 'Audit the original',
            body: 'Mapped every student-facing Sisu flow and where it broke down. Like the prerequisite puzzles, the page-hunting, the institutional gray.',
          },
          {
            icon: 'palette',
            title: 'Define the system',
            body: 'Built the Night Canvas palette, Fira pairing, and ring-shadow elevation before a single screen, so density never turned into noise.',
          },
          {
            icon: 'grid',
            title: 'Rebuild the surfaces',
            body: 'Dashboard, study timeline, registration, and structure. Each redesigned from scratch for the job, not dark-moded.',
          },
          {
            icon: 'rocket',
            title: 'Ship and iterate',
            body: 'Released as a free Chrome extension, gathered feedback from real students, and tuned the calm-by-default motion.',
          },
        ],
      },
      {
        type: 'stat-bento',
        eyebrow: 'OUTCOME',
        title: 'What changed.',
        stats: [
          { value: '30', suffix: '+', label: 'Students switched', icon: 'users' },
          { value: '0', label: 'Trips back to OG Sisu', icon: 'check' },
          { value: '100', suffix: '%', label: 'Open source', icon: 'star' },
        ],
      },

      {
        type: 'pullquote',
        quote: "Replace, don't decorate. Every screen should feel like it was designed from scratch for this job.",
        attribution: '— design principle #1, from the system doc',
      },
    ],
  },
];
