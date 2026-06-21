import { Reveal } from '@/components/animated/Reveal';
import { CaseStudyIcon } from '@/components/caseStudy/CaseStudyIcon';
import type { StatItem } from '@/data/caseStudies';

interface Props {
  stats: StatItem[];
}

export function StatBento({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <div className="flex flex-col justify-between rounded-2xl bg-portfolio-surface p-8">
            <p className="text-[clamp(64px,8vw,96px)] leading-none font-black tracking-[-0.04em] text-portfolio-ink">
              {stat.value}
              {stat.suffix && <span className="text-portfolio-green">{stat.suffix}</span>}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-portfolio-surface-2 px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-portfolio-muted">
              <CaseStudyIcon name={stat.icon} size={12} />
              {stat.label}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
