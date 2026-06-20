import { Reveal } from '@/components/animated/Reveal';

export function StatStatement() {
  return (
    <section className="border-y border-portfolio-faint/20 bg-portfolio-bg-soft">
      <div className="mx-auto max-w-[1180px] px-6 py-[clamp(48px,7vw,90px)] sm:px-10">
        <Reveal>
          <p className="m-0 max-w-[1020px] text-[clamp(23px,3.3vw,44px)] leading-[1.32] font-medium tracking-[-0.02em] text-balance text-portfolio-faint">
            <span className="text-[1.18em] font-bold tracking-[-0.03em] text-portfolio-purple">6 years</span> building.{' '}
            <span className="text-[1.18em] font-bold tracking-[-0.03em] text-portfolio-green">1.5+</span> commercial,
            with enterprise clients. Based in <span className="font-semibold text-portfolio-ink">Lahti</span>.{' '}
            <span className="text-[1.18em] font-bold tracking-[-0.03em] text-portfolio-green">Open</span> to the right
            work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
