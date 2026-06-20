import { Reveal } from '@/components/animated/Reveal';

export function StatTile({
  label,
  value,
  note,
  featured,
  tone,
}: {
  label: string;
  value: string;
  note?: string;
  featured?: boolean;
  tone?: 'purple' | 'green';
}) {
  const accent =
    tone === 'green' ? 'text-portfolio-green' : tone === 'purple' ? 'text-portfolio-purple' : 'text-portfolio-ink';
  return (
    <Reveal
      className={
        featured
          ? 'min-h-[200px] min-w-[300px] flex-1 basis-[300px]'
          : 'min-h-[150px] min-w-[220px] flex-1 basis-[220px]'
      }
    >
      <div
        className={`flex h-full flex-col justify-between rounded-[22px] p-[clamp(22px,2.6vw,34px)] ${
          tone === 'green'
            ? 'border border-portfolio-green/20 bg-portfolio-surface-2'
            : tone === 'purple' || featured
              ? 'border border-portfolio-violet/20 bg-linear-to-br from-portfolio-violet/10 to-portfolio-surface-2/60'
              : 'border border-portfolio-faint/20 bg-portfolio-surface-2'
        }`}
      >
        <span className="font-mono text-[11px] tracking-[0.14em] text-portfolio-muted uppercase">{label}</span>
        <div>
          <div
            className={`font-mono font-medium tracking-[-0.03em] tabular-nums ${accent} ${
              featured ? 'text-[clamp(46px,7vw,76px)] leading-[0.95]' : 'text-[clamp(30px,4.4vw,52px)]'
            }`}
          >
            {value}
          </div>
          {note ? <div className="mt-1 font-mono text-xs text-portfolio-faint">{note}</div> : null}
        </div>
      </div>
    </Reveal>
  );
}
