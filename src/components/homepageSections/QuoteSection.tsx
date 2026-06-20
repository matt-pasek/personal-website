import { Reveal } from '@/components/animated/Reveal';

export function QuoteSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-[clamp(20px,4vw,60px)] pb-[clamp(72px,11vw,130px)] sm:px-10">
      <Reveal>
        <figure className="m-0 max-w-[900px]">
          <blockquote className="m-0 text-[clamp(26px,3.8vw,48px)] leading-[1.18] font-bold tracking-[-0.025em] text-balance text-portfolio-ink">
            <span className="text-portfolio-green">“</span>Good software gets out of the way. You feel the result, never
            the machinery.<span className="text-portfolio-green">”</span>
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-3.5 font-mono text-xs tracking-widest text-portfolio-muted">
            <span className="h-px w-[34px] bg-portfolio-faint" />
            <span>a thing I believe</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
