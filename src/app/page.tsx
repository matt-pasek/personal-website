import Blob from '@/components/Blob';
import Image from 'next/image';
import jain from '@/assets/images/jain.webp';
import Background from '@/components/Background';
import CurrentlySection from '@/components/currently/CurrentlySection';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Background />

      <div className="relative z-10 flex min-h-screen w-full flex-col overflow-hidden px-6 pt-20 md:grid md:w-3/5 md:min-w-6xl md:grid-cols-[1fr_500px_1fr] md:items-center md:gap-16 md:overflow-visible md:px-0 md:pt-0">
        <div className="z-10 pb-5 text-xs font-bold tracking-[0.18em] text-white/45 uppercase md:hidden">
          Mateusz Pasek
        </div>
        <h1 className="z-10 flex flex-col items-start text-5xl leading-[0.95] font-bold tracking-[-0.02em] text-white md:justify-center md:text-7xl">
          <div>Designer</div>
          <div className="bg-linear-to-tr from-[#C896FF] to-[#936EDC] bg-clip-text pb-3 text-transparent">by eye,</div>
          <div>
            dev <span className="opacity-60">by</span>
          </div>
          <div className="bg-linear-to-tr from-[#C896FF] to-[#936EDC] bg-clip-text pb-3 text-transparent">hand.</div>
        </h1>
        <div className="absolute right-0 bottom-0 z-0 translate-x-1/3 translate-y-1/6 md:relative md:flex md:translate-x-0 md:translate-y-0 md:items-center md:justify-center md:overflow-visible">
          <Blob />
        </div>
        <div className="relative flex w-full justify-start md:mt-0 md:justify-end">
          <p className="max-w-[260px] text-left text-base text-white/60 md:w-64 md:max-w-none md:text-right md:text-lg md:text-white">
            Creative developer. Enterprise background. Currently studying in Finland and building things I actually care
            about.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2.5 select-none">
        <div className="relative flex size-9 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-[#C896FF]/25 [animation-duration:2s]" />
          <span className="absolute inset-[3px] animate-ping rounded-full border border-[#C896FF]/15 [animation-delay:0.65s] [animation-duration:2s]" />
          <svg
            className="relative size-3.5 text-[#C896FF]/55"
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
        <div className="h-px w-full bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent md:w-3/5 md:min-w-6xl" />
        <section
          id="about"
          className="grid w-full grid-cols-1 gap-8 px-6 py-12 md:w-3/5 md:min-w-6xl md:grid-cols-2 md:gap-16 md:px-0 md:py-20"
        >
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
            <p className="text-[0.95rem] leading-[1.75] text-white/60">
              I got into this industry before finishing high school. Worked with enterprise clients. Moved to Finland to
              study. Still building things that feel right, not just things that work.
            </p>
            <div className="mt-7 inline-flex items-center gap-2 text-[0.8rem] text-[#C896FF]/70">
              <span className="size-[7px] animate-pulse rounded-full bg-[#C896FF] shadow-[0_0_8px_rgba(200,150,255,0.8)]" />
              Open to the right opportunities
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent md:w-3/5 md:min-w-6xl" />

        <section id="work" className="w-full px-6 py-12 md:w-3/5 md:min-w-6xl md:px-0 md:py-[72px]">
          <div className="-mx-6 rounded-2xl bg-[rgba(15,7,30,0.5)] px-6 md:mx-0">
            <div className="mb-9 flex items-baseline justify-between">
              <span className="text-xs tracking-[0.14em] text-[#C896FF]/45 uppercase">Work</span>
              <span className="text-[0.8rem] text-white/30">more coming soon</span>
            </div>
            <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#C896FF]/12 bg-[rgba(10,5,21,0.6)] md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden border-b border-[#C896FF]/8 md:aspect-16/10 md:border-r md:border-b-0">
                <Image src={jain} alt="Preview of the JAIN 2.0 platform" fill className="object-cover" />
              </div>
              <div className="my-auto px-5 py-6 md:px-8 md:py-0">
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
                <h3 className="mb-2.5 text-[1.4rem] font-bold tracking-[-0.01em] text-white">jAIn 2.0</h3>
                <p className="mb-6 text-[0.88rem] leading-[1.65] text-white/55">
                  Solo frontend developer and UI designer on an AI-powered HR platform built for Jeronimo Martins.
                  Responsible for the full frontend layer: architecture, design system and every user-facing feature.
                  Now in active use across the organisation.
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

        <div className="h-px w-full bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent md:w-3/5 md:min-w-6xl" />

        <section id="currently" className="mx-auto px-6 py-12 md:px-0 md:py-20">
          <span className="mb-8 block text-xs tracking-[0.14em] text-[#C896FF]/45 uppercase">Currently</span>
          <CurrentlySection />
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-[#C896FF]/15 to-transparent md:w-3/5 md:min-w-6xl" />

        <section
          id="contact"
          className="flex w-full flex-col items-center gap-5 px-6 py-12 text-center md:w-3/5 md:min-w-6xl md:px-0 md:py-[72px]"
        >
          <p className="text-[1.5rem] font-bold tracking-[-0.01em] text-white/60">
            Got something <span className="text-white">worth building?</span> I&apos;m listening.
          </p>
          <a
            href="mailto:contact@matt-pasek.dev"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#C896FF]/35 bg-linear-to-br from-[#8C50FF]/25 to-[#6432DC]/20 px-7 py-3 text-[0.9rem] text-[#C896FF]/90 transition-all hover:-translate-y-px hover:border-[#C896FF]/60 hover:text-[#C896FF]"
          >
            Say hello →
          </a>
          <div className="mt-2 flex items-center gap-4 text-[0.8rem] text-white/25">
            <span>contact@matt-pasek.dev</span>
            <span className="text-white/10">·</span>
            <a
              href="https://github.com/matt-pasek"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/50"
            >
              github.com/matt-pasek
            </a>
          </div>
        </section>
        <footer className="w-full px-6 py-5 md:px-0">
          <div className="mx-auto flex w-full flex-col items-center gap-1 md:w-3/5 md:min-w-6xl md:flex-row md:justify-between">
            <span className="text-[0.72rem] text-white/20">
              © {new Date().getFullYear()} Mateusz Pasek. All rights reserved.
            </span>
            <a
              href="https://matt-pasek.dev"
              className="text-[0.72rem] text-white/20 transition-colors hover:text-white/40"
            >
              matt-pasek.dev
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
