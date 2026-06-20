'use client';

import LiquidBars from '@/components/animated/LiquidBars';
import { Reveal } from '@/components/animated/Reveal';
import { motion } from 'framer-motion';

export function ConnectSection() {
  return (
    <section id="contact" className="relative z-20 px-6 pt-[clamp(48px,8vw,88px)] pb-0 sm:px-10">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="relative z-10 overflow-hidden rounded-[28px] bg-portfolio-bg px-6 py-[clamp(52px,7vw,84px)] text-center text-portfolio-connect-card shadow-[0_26px_90px_rgba(0,0,0,0.28)] sm:rounded-4xl sm:px-10">
            <div
              data-react-bits-bg-slot
              className="pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden"
              aria-hidden="true"
            >
              <LiquidBars color="#3E9D57" />
            </div>

            <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center">
              <h2 className="m-0 text-[clamp(34px,5vw,64px)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
                Got something <span className="text-portfolio-green-dark">worth building?</span>
              </h2>

              <motion.a
                href="mailto:contact@matt-pasek.dev"
                whileTap={{ scale: 0.96 }}
                className="mt-[clamp(34px,5vw,56px)] inline-flex min-h-14 w-full max-w-[510px] items-center overflow-hidden rounded-[18px] bg-portfolio-bg p-2 pl-5 text-left text-sm font-medium text-portfolio-ink shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="mr-3 flex size-5 shrink-0 items-center justify-center text-portfolio-muted">
                  <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
                    <path
                      d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m5.25 7.25 6.75 5.4 6.75-5.4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 truncate text-portfolio-muted">contact@matt-pasek.dev</span>
                <span className="ml-4 inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-portfolio-connect-card px-4 text-portfolio-bg sm:px-6">
                  Say hello <span className="text-portfolio-green-dark">→</span>
                </span>
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
