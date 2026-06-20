import type { RichSpan } from '@/data/caseStudies';
import { CaseStudyIcon } from '@/components/caseStudy/CaseStudyIcon';

type LabelIcon = 'target' | 'users' | 'grid' | 'search';

interface Props {
  label?: string;
  labelIcon?: LabelIcon;
  title: string;
  body: string;
  richText?: RichSpan[];
}

export function TextCard({ label, labelIcon, title, body, richText }: Props) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-portfolio-surface p-6 sm:p-8">
      {label && (
        <div className="mb-4 flex items-center gap-2">
          {labelIcon && (
            <span className="flex size-8 items-center justify-center rounded-lg bg-portfolio-surface-2 text-portfolio-green">
              <CaseStudyIcon name={labelIcon} size={15} />
            </span>
          )}
          <span className="font-mono text-[10px] tracking-[0.18em] text-portfolio-green uppercase">{label}</span>
        </div>
      )}
      <h3 className="mb-4 text-xl leading-snug font-bold tracking-[-0.01em] text-portfolio-ink">{title}</h3>
      {richText && richText.length > 0 ? (
        <p className="text-[15px] leading-[1.7] text-portfolio-muted">
          {richText.map((span, i) =>
            span.bold ? (
              <strong key={i} className="font-semibold text-portfolio-ink">
                {span.text}
              </strong>
            ) : (
              <span key={i}>{span.text}</span>
            ),
          )}
        </p>
      ) : (
        <p className="text-[15px] leading-[1.7] text-portfolio-muted">{body}</p>
      )}
    </div>
  );
}
