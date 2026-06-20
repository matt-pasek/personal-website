import { SectionLabel } from '@/components/homepageSections/SectionLabel';
import { Reveal } from '@/components/animated/Reveal';

const timeline = [
  {
    accent: 'purple',
    label: '2020',
    title: 'First real lines of code.',
    body: 'Before finishing high school. No plan, just a stubborn need to make the thing work, then make it good.',
  },
  {
    accent: 'green',
    label: 'enterprise',
    title: 'Shipped jAIn 2.0 into production.',
    body: 'Solo on the full frontend of an AI HR platform for Jeronimo Martins. Architecture, design system, every screen. Real users, real stakes.',
  },
  {
    accent: 'purple',
    label: 'now · helsinki',
    title: 'Studying, and building on my own terms.',
    body: 'Moved to Finland to study. Picking projects for the craft, not the brief.',
  },
];

export function TimelineSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-[clamp(72px,11vw,130px)] sm:px-10">
      <SectionLabel index="02" title="the short version" />
      <div className="flex flex-col border-l border-portfolio-faint/30">
        {timeline.map((item, index) => {
          const isGreen = item.accent === 'green';
          return (
            <Reveal key={item.title} delay={index * 0.07}>
              <div className="relative pb-[clamp(30px,4vw,44px)] pl-[clamp(28px,4vw,52px)] last:pb-1">
                <span
                  className={`absolute top-1.5 -left-[6.5px] size-3 rounded-full shadow-[0_0_0_4px_#0a0613] ${
                    isGreen
                      ? 'bg-portfolio-green shadow-portfolio-green/70'
                      : 'bg-portfolio-purple shadow-portfolio-purple/70'
                  }`}
                />
                <div
                  className={`mb-2 font-mono text-[13px] tracking-widest ${
                    isGreen ? 'text-portfolio-green' : 'text-portfolio-purple'
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-[clamp(18px,2.2vw,24px)] font-semibold tracking-[-0.01em] text-portfolio-ink">
                  {item.title}
                </div>
                <p className="mt-[7px] max-w-[560px] text-[15px] leading-[1.7] text-pretty text-portfolio-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
