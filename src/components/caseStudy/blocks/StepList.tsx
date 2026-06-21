import { Reveal } from '@/components/animated/Reveal';
import { CaseStudyIcon } from '@/components/caseStudy/CaseStudyIcon';
import type { Step } from '@/data/caseStudies';

interface Props {
  steps: Step[];
}

export function StepList({ steps }: Props) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <Reveal key={i} delay={i * 0.07}>
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-portfolio-surface text-portfolio-green">
                <CaseStudyIcon name={step.icon} size={18} />
              </span>
              {i < steps.length - 1 && <div className="mt-1 h-full min-h-[48px] w-px bg-portfolio-faint/30" />}
            </div>
            <div className={`${i < steps.length - 1 ? 'pb-10' : 'pb-0'}`}>
              <p className="mb-1 font-mono text-[11px] tracking-[0.14em] text-portfolio-faint">0{i + 1}</p>
              <h4 className="mb-2 text-lg font-bold tracking-[-0.01em] text-portfolio-ink">{step.title}</h4>
              <p className="text-[15px] leading-[1.7] text-portfolio-muted">{step.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
