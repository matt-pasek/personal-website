import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { Reveal } from '@/components/animated/Reveal';

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-[1180px] px-6 py-[clamp(72px,11vw,140px)] sm:px-10">
      <SectionLabel index="01" title="about" />
      <div className="flex flex-wrap gap-[clamp(40px,7vw,90px)]">
        <Reveal className="min-w-[300px] flex-1 basis-[380px]">
          <h2 className="m-0 text-[clamp(30px,4.2vw,52px)] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-portfolio-ink">
            I care about the details <span className="text-portfolio-green">most people skip.</span>
          </h2>
        </Reveal>
        <Reveal className="flex min-w-[300px] flex-1 basis-[380px] flex-col gap-[18px]" delay={0.08}>
          <p className="m-0 text-base leading-[1.78] text-pretty text-portfolio-muted">
            Designer and developer at the intersection of aesthetics and engineering. I&apos;m drawn to the moments
            where an interface stops being a tool and starts feeling like a conversation: the 20ms animation that
            changes everything, the hierarchy that guides without announcing itself.
          </p>
          <p className="m-0 text-base leading-[1.78] text-pretty text-portfolio-muted">
            Got into this before finishing high school. Worked with enterprise clients. Moved to Finland to study. Still
            building things that feel right, not just things that work.
          </p>
          <div className="mt-2.5 inline-flex items-center gap-2.5 text-sm text-portfolio-green">
            <span className="relative size-2">
              <span className="absolute inset-0 rounded-full bg-portfolio-green" />
              <span className="absolute inset-0 animate-[green-ping_2s_ease-out_infinite] rounded-full bg-portfolio-green" />
            </span>
            Open to the right opportunities
          </div>
        </Reveal>
      </div>
    </section>
  );
}
