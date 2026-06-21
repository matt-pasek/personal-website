interface Tag {
  label: string;
  color?: string;
}

interface Props {
  tags: Tag[];
}

export function TechStackTags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.label}
          style={tag.color ? { borderColor: `${tag.color}40`, color: tag.color } : undefined}
          className="rounded-full border border-portfolio-faint/40 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-portfolio-muted uppercase"
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
