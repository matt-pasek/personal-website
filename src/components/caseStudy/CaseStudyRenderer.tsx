import type { CaseStudySection } from '@/data/caseStudies';
import { SectionHeading } from './blocks/SectionHeading';
import { BentoGrid } from './blocks/BentoGrid';
import { StatBento } from './blocks/StatBento';
import { StepList } from './blocks/StepList';
import { Pullquote } from './blocks/Pullquote';
import { MockupShowcase } from './blocks/MockupShowcase';

interface Props {
  sections: CaseStudySection[];
}

export function CaseStudyRenderer({ sections }: Props) {
  return (
    <div className="pb-32">
      {sections.map((section, i) => (
        <section key={i} className="mx-auto max-w-5xl px-6 py-14 sm:px-10">
          {section.type === 'section-heading' && <SectionHeading eyebrow={section.eyebrow} title={section.title} />}

          {section.type === 'bento-grid' && (
            <BentoGrid eyebrow={section.eyebrow} title={section.title} cells={section.cells} />
          )}

          {section.type === 'stat-bento' && (
            <div>
              {(section.eyebrow || section.title) && (
                <div className="mb-10">
                  {section.eyebrow && (
                    <p className="mb-2 font-mono text-xs tracking-[0.18em] text-portfolio-green uppercase">
                      {section.eyebrow}
                    </p>
                  )}
                  {section.title && (
                    <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.02em] text-portfolio-ink">
                      {section.title}
                    </h2>
                  )}
                </div>
              )}
              <StatBento stats={section.stats} />
            </div>
          )}

          {section.type === 'step-list' && (
            <div>
              <div className="mb-10">
                {section.eyebrow && (
                  <p className="mb-2 font-mono text-xs tracking-[0.18em] text-portfolio-green uppercase">
                    {section.eyebrow}
                  </p>
                )}
                <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.02em] text-portfolio-ink">
                  {section.title}
                </h2>
              </div>
              <StepList steps={section.steps} />
            </div>
          )}

          {section.type === 'pullquote' && <Pullquote quote={section.quote} attribution={section.attribution} />}

          {section.type === 'mockup' && (
            <MockupShowcase
              src={section.src}
              caption={section.caption}
              badge={section.badge}
              variant={section.variant}
            />
          )}
        </section>
      ))}
    </div>
  );
}
