import { Reveal } from '@/components/animated/Reveal';
import type { BentoCell } from '@/data/caseStudies';
import { TextCard } from './TextCard';
import { MetricCard } from './MetricCard';
import { InfoCard } from './InfoCard';

interface Props {
  eyebrow?: string;
  title?: string;
  cells: BentoCell[];
}

export function BentoGrid({ eyebrow, title, cells }: Props) {
  type TextCard = Extract<BentoCell, { block: 'text-card' }>;
  const wideCells = cells.filter((c): c is TextCard => c.block === 'text-card' && c.span === 'wide');
  const metricCells = cells.filter((c): c is Extract<BentoCell, { block: 'metric' }> => c.block === 'metric');
  const infoCells = cells.filter(
    (c): c is Extract<BentoCell, { block: 'info-card' | 'tech-stack' }> =>
      c.block === 'info-card' || c.block === 'tech-stack',
  );

  const hasAsymmetricTop = wideCells.length > 0 && metricCells.length > 0;

  return (
    <div>
      {(eyebrow || title) && (
        <Reveal>
          <div className="mb-8">
            {eyebrow && (
              <p className="mb-2 font-mono text-xs tracking-[0.18em] text-portfolio-green uppercase">{eyebrow}</p>
            )}
            {title && (
              <h2 className="text-[clamp(24px,3.5vw,40px)] font-bold tracking-[-0.02em] text-portfolio-ink">{title}</h2>
            )}
          </div>
        </Reveal>
      )}

      <div className="flex flex-col gap-3">
        {hasAsymmetricTop && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
            <Reveal>
              {wideCells.map((cell, i) => (
                <TextCard
                  key={i}
                  label={cell.label}
                  labelIcon={cell.labelIcon}
                  title={cell.title}
                  body={cell.body}
                  richText={cell.richText}
                />
              ))}
            </Reveal>
            <div className="flex flex-col gap-3">
              {metricCells.map((cell, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <MetricCard value={cell.value} label={cell.label} icon={cell.icon} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {!hasAsymmetricTop && metricCells.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {metricCells.map((cell, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <MetricCard value={cell.value} label={cell.label} icon={cell.icon} />
              </Reveal>
            ))}
          </div>
        )}

        {infoCells.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {infoCells.map((cell, i) => {
              if (cell.block === 'info-card') {
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    <InfoCard icon={cell.icon} label={cell.label} content={cell.content} />
                  </Reveal>
                );
              }
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <InfoCard
                    icon={(cell.icon as 'user' | 'calendar' | 'layers') ?? 'layers'}
                    label={cell.label ?? 'STACK'}
                    variant="tech-stack"
                    tags={cell.tags}
                  />
                </Reveal>
              );
            })}
          </div>
        )}

        {!hasAsymmetricTop &&
          cells
            .filter(
              (c): c is Extract<BentoCell, { block: 'text-card' }> => c.block === 'text-card' && c.span !== 'wide',
            )
            .map((cell, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <TextCard
                  label={cell.label}
                  labelIcon={cell.labelIcon}
                  title={cell.title}
                  body={cell.body}
                  richText={cell.richText}
                />
              </Reveal>
            ))}
      </div>
    </div>
  );
}
