import { Reveal } from '@/components/animated/Reveal';
import { SectionLabel } from '@/components/homepageSections/SectionLabel';

export function NowSection() {
  const items = [
    ['where', 'Lahti, Finland. Studying, freezing, shipping.', 'purple'],
    ['building', "This site, and a couple of things I'm not ready to show.", 'green'],
    ['learning', 'Shaders, type, and how to say no to good-enough.', 'purple'],
    ['this site', 'Next.js, TypeScript, hand-rolled. Type set in Fira.', 'green'],
  ];

  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="09" title="now" aside="as of june 2026" />
      <Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px overflow-hidden rounded-[20px] border border-portfolio-faint/20 bg-portfolio-faint/20">
          {items.map(([label, body, tone]) => (
            <div key={label} className="bg-portfolio-bg p-[clamp(24px,3vw,34px)]">
              <div
                className={`mb-3 font-mono text-[11px] tracking-[0.16em] uppercase ${
                  tone === 'green' ? 'text-portfolio-green' : 'text-portfolio-purple'
                }`}
              >
                {label}
              </div>
              <p className="m-0 text-[15.5px] leading-[1.7] text-pretty text-portfolio-muted">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
