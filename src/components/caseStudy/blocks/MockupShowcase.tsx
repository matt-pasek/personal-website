import Image, { type StaticImageData } from 'next/image';
import { Reveal } from '@/components/animated/Reveal';

interface Props {
  src: string | StaticImageData;
  caption?: string;
  badge?: string;
  variant: 'full' | 'inset';
}

export function MockupShowcase({ src, caption, badge, variant }: Props) {
  return (
    <Reveal>
      <div
        className={`relative overflow-hidden rounded-2xl bg-portfolio-surface-2 ${
          variant === 'inset' ? 'p-4 sm:p-6' : ''
        }`}
      >
        {badge && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-portfolio-bg/70 px-3 py-1.5 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-portfolio-green" />
            <span className="font-mono text-xs text-portfolio-ink">{badge}</span>
          </div>
        )}
        <div
          className={`relative w-full overflow-hidden rounded-xl ${variant === 'full' ? 'aspect-video' : 'aspect-video'}`}
        >
          <Image src={src} alt={caption ?? 'Case study mockup'} fill className="object-cover object-top" />
        </div>
        {caption && <p className="mt-3 text-center font-mono text-xs text-portfolio-muted">{caption}</p>}
      </div>
    </Reveal>
  );
}
