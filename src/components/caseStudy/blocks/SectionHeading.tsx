import { Reveal } from '@/components/animated/Reveal';

interface Props {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: Props) {
  return (
    <Reveal>
      <div className="mb-10">
        <p className="mb-3 font-mono text-xs tracking-[0.18em] text-portfolio-green uppercase">{eyebrow}</p>
        <h2 className="max-w-3xl text-[clamp(28px,4vw,48px)] leading-[1.15] font-bold tracking-[-0.02em] text-portfolio-ink">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
