interface SectionLabelProps {
  index: string;
  title: string;
  aside?: string;
}

export function SectionLabel({ index, title, aside }: SectionLabelProps) {
  return (
    <div className="mb-[clamp(34px,5vw,56px)] flex items-center gap-[18px] font-mono text-xs tracking-[0.18em] text-portfolio-ink uppercase">
      <span className="text-portfolio-green">{index}</span>
      <span>{title}</span>
      <span className="h-px flex-1 bg-linear-to-r from-portfolio-violet/35 to-transparent" />
      {aside ? <span className="hidden text-portfolio-faint sm:inline">{aside}</span> : null}
    </div>
  );
}
