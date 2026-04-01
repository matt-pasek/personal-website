import Blob from '@/components/Blob';
import Image from 'next/image';
import jain from '@/assets/images/jain.webp';
import Background from '@/components/Background';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Background />

      <div className="relative z-10 grid min-h-screen w-3/5 min-w-6xl grid-cols-[1fr_500px_1fr] items-center gap-16 overflow-visible">
        <h1 className="z-10 flex flex-col items-start justify-center text-7xl leading-[0.95] font-bold tracking-[-0.02em] text-white">
          <div>Crafting</div>
          <div>narrative</div>
          <div className="opacity-60">through</div>
          <div className="bg-linear-to-tr from-[#C896FF] to-[#936EDC] bg-clip-text pb-3 text-transparent">design</div>
        </h1>
        <div className="relative flex items-center justify-center overflow-visible">
          <Blob />
        </div>
        <div className="flex w-full justify-end">
          <p className="w-64 text-right text-lg">I believe good design is key to building strong connections.</p>
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-2.5 select-none">
        <div className="relative flex size-9 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-[#C896FF]/25 [animation-duration:2s]" />
          <span className="absolute inset-[3px] animate-ping rounded-full border border-[#C896FF]/15 [animation-delay:0.65s] [animation-duration:2s]" />
          <svg
            className="relative size-3.5 animate-bounce text-[#C896FF]/55 [animation-duration:2.5s]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="text-[0.7rem] tracking-[0.2em] text-[#C896FF]/40 uppercase">scroll now</span>
      </div>

      <div className="flex w-full flex-col items-center bg-[#0d0520]">
        <div className="h-px w-3/5 min-w-6xl bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent" />
        <section id="about" className="grid w-3/5 min-w-6xl grid-cols-2 gap-16 py-20">
          <div>
            <span className="mb-5 block text-xs tracking-[0.14em] text-[#C896FF]/45 uppercase">About</span>
            <h2 className="text-[1.85rem] leading-[1.2] font-bold tracking-[-0.02em] text-white">
              I care about the details{' '}
              <span className="bg-linear-to-tr from-[#C896FF] to-[#936EDC] bg-clip-text text-transparent">
                most people skip.
              </span>
            </h2>
          </div>
          <div className="pt-1.5">
            <p className="text-[0.95rem] leading-[1.75] text-white/60">
              Designer and developer who sits at the intersection of aesthetics and engineering. I&apos;m drawn to the
              moments where an interface stops being a tool and starts feeling like a conversation — the 20ms animation
              that changes everything, the hierarchy that guides without announcing itself.
            </p>
            <p className="mt-3.5 text-[0.95rem] leading-[1.75] text-white/60">
              Currently building things that feel right, not just things that work.
            </p>
            <div className="mt-7 inline-flex items-center gap-2 text-[0.8rem] text-[#C896FF]/70">
              <span className="size-[7px] animate-pulse rounded-full bg-[#C896FF] shadow-[0_0_8px_rgba(200,150,255,0.8)]" />
              Open to the right opportunities
            </div>
          </div>
        </section>

        <div className="h-px w-3/5 min-w-6xl bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent" />

        <section id="work" className="w-3/5 min-w-6xl py-[72px]">
          <div className="-mx-6 rounded-2xl bg-[rgba(15,7,30,0.5)] px-6">
            <div className="mb-9 flex items-baseline justify-between">
              <span className="text-xs tracking-[0.14em] text-[#C896FF]/45 uppercase">Work</span>
              <span className="text-[0.8rem] text-white/30">more coming soon</span>
            </div>
            <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-[#C896FF]/12 bg-[rgba(10,5,21,0.6)]">
              <div className="relative aspect-16/10 overflow-hidden border-r border-[#C896FF]/8">
                <Image src={jain} alt="Preview of the JAIN 2.0 platform" fill className="object-cover" />
              </div>
              <div className="p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {['Frontend Development', 'UI Design', 'Design System'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#C896FF]/20 px-2.5 py-0.5 text-[0.65rem] tracking-widest text-[#C896FF]/60 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2.5 text-[1.4rem] font-bold tracking-[-0.01em] text-white">JAIN 2.0</h3>
                <p className="mb-6 text-[0.88rem] leading-[1.65] text-white/55">
                  A full visual overhaul of the JAIN platform — rethinking hierarchy, and experience from the ground up.
                </p>
                <a
                  href="https://bluesoft.com/project/jain-ai-platform-supporting-leadership-development-at-biedronka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-flex items-center gap-2 text-[0.82rem] text-[#C896FF]/40 transition-colors hover:text-[#C896FF]/70">
                    View case study
                    <span>→</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="mt-5 text-center text-[0.8rem] text-white/20">· · ·</div>
          </div>
        </section>

        <div className="h-px w-3/5 min-w-6xl bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent" />

        <section id="currently" className="w-3/5 min-w-6xl py-20">
          <span className="mb-8 block text-xs tracking-[0.14em] text-[#C896FF]/45 uppercase">Currently</span>
          <div className="flex items-center gap-10">
            <div className="w-[220px] shrink-0 overflow-hidden rounded-xl border border-[#C896FF]/15 bg-[rgba(15,7,30,0.8)]">
              <div className="flex items-center gap-2 border-b border-[#C896FF]/10 px-3.5 py-3 text-[0.65rem] tracking-widest text-[#C896FF]/50 uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-[#C896FF] shadow-[0_0_6px_rgba(200,150,255,0.8)]" />
                Now playing
              </div>
              <div className="flex items-center gap-3 px-3.5 py-3.5">
                <div className="flex size-[38px] shrink-0 items-center justify-center rounded-md bg-linear-to-br from-[#8C50FF]/50 to-[#3C1E96]/60 text-sm">
                  ♪
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[0.8rem] font-semibold text-white">Song Title</div>
                  <div className="truncate text-[0.72rem] text-white/45">Artist Name</div>
                </div>
              </div>
              <p className="px-3.5 pb-3.5 text-[0.68rem] leading-snug text-[#C896FF]/35 italic">
                live via Last.fm — what&apos;s actually on right now
              </p>
            </div>
            <div>
              <h3 className="mb-2.5 text-[1.5rem] font-bold tracking-[-0.01em] text-white">
                What I&apos;m listening to
              </h3>
              <p className="max-w-sm text-[0.9rem] leading-[1.7] text-white/50">
                Music is always on. This pulls live from Last.fm — a small window into whatever&apos;s soundtracking the
                work.
              </p>
              <span className="mt-3.5 inline-block rounded-full border border-dashed border-[#C896FF]/25 px-3 py-1 text-[0.68rem] tracking-widest text-[#C896FF]/50 uppercase">
                ✦ live data, coming soon
              </span>
            </div>
          </div>
        </section>

        <div className="h-px w-3/5 min-w-6xl bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent" />

        <section id="contact" className="flex w-3/5 min-w-6xl flex-col items-center py-[72px] text-center">
          <p className="mb-7 text-[1.5rem] font-bold tracking-[-0.01em] text-white/60">
            Got something <span className="text-white">interesting?</span> Let&apos;s talk.
          </p>
          <a
            href="mailto:m_pasek@icloud.com"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#C896FF]/35 bg-linear-to-br from-[#8C50FF]/25 to-[#6432DC]/20 px-7 py-3 text-[0.9rem] text-[#C896FF]/90 transition-all hover:-translate-y-px hover:border-[#C896FF]/60 hover:text-[#C896FF]"
          >
            Say hello →
          </a>
          <span className="mt-4 text-[0.8rem] text-white/25">m_pasek@icloud.com</span>
        </section>
      </div>
    </main>
  );
}
