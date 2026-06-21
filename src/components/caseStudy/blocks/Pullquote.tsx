import { Reveal } from '@/components/animated/Reveal';
import { PullquoteSphere } from './PullquoteSphere';

interface Props {
  quote: string;
  attribution?: string;
}

export function Pullquote({ quote, attribution }: Props) {
  return (
    <Reveal>
      <div className="mx-auto max-w-3xl py-4 text-center">
        <PullquoteSphere />
        <blockquote className="text-[clamp(18px,2.5vw,26px)] leading-[1.4] font-bold tracking-[-0.01em] text-portfolio-ink">
          {quote}
        </blockquote>
        {attribution && <p className="mt-5 font-mono text-sm text-portfolio-muted">{attribution}</p>}
      </div>
    </Reveal>
  );
}
