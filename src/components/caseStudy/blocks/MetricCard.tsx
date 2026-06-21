import { CaseStudyIcon } from '@/components/caseStudy/CaseStudyIcon';

type IconName = 'users' | 'grid' | 'check' | 'star';

interface Props {
  value: string;
  label: string;
  icon: IconName;
}

export function MetricCard({ value, label, icon }: Props) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-portfolio-surface p-6">
      <p className="text-[56px] leading-none font-bold tracking-[-0.04em] text-portfolio-ink/60">{value}</p>
      <span className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-portfolio-surface-2 px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-portfolio-muted">
        <CaseStudyIcon name={icon} size={12} />
        {label}
      </span>
    </div>
  );
}
