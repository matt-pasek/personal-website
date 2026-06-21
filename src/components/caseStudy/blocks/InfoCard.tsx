import { CaseStudyIcon } from '@/components/caseStudy/CaseStudyIcon';
import { TechStackTags } from './TechStackTags';

type InfoIcon = 'user' | 'calendar' | 'layers';

interface Tag {
  label: string;
  color?: string;
}

interface TextInfoCardProps {
  icon: InfoIcon;
  label: string;
  variant?: 'text';
  content: string;
}

interface TechStackInfoCardProps {
  icon: InfoIcon;
  label: string;
  variant: 'tech-stack';
  tags: Tag[];
}

type Props = TextInfoCardProps | TechStackInfoCardProps;

export function InfoCard(props: Props) {
  const { icon, label } = props;

  return (
    <div className="flex h-full flex-col rounded-2xl bg-portfolio-surface p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-portfolio-surface-2 text-portfolio-green">
          <CaseStudyIcon name={icon} size={15} />
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-portfolio-green uppercase">{label}</span>
      </div>
      {props.variant === 'tech-stack' ? (
        <TechStackTags tags={props.tags} />
      ) : (
        <p className="text-[15px] leading-[1.6] text-portfolio-ink">{(props as TextInfoCardProps).content}</p>
      )}
    </div>
  );
}
