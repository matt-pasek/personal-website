'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BriefcaseIcon } from '@/components/navbar/icons/BriefcaseIcon';
import { AsteriskIcon } from '@/components/navbar/icons/AsteriskIcon';
import { PulseIcon } from '@/components/navbar/icons/PulseIcon';
import { MailIcon } from '@/components/navbar/icons/MailIcon';
import { WordMark } from '@/components/WordMark';

const navItems = [
  { label: 'Home', href: '#home', icon: AsteriskIcon },
  { label: 'Work', href: '#work', icon: BriefcaseIcon },
  { label: 'Currently', href: '#currently', icon: PulseIcon },
  { label: 'Contact', href: '#contact', icon: MailIcon },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const update = () => setPageHeight(document.documentElement.scrollHeight - window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const wordmarkOpacity = useTransform(scrollY, [250, 480, pageHeight - 400, pageHeight - 230], [0, 1, 1, 0]);
  const wordmarkWidth = useTransform(scrollY, [250, 480, pageHeight - 400, pageHeight - 230], [0, 150, 150, 0]);
  const separatorOpacity = useTransform(scrollY, [310, 500, pageHeight - 400, pageHeight - 230], [0, 1, 1, 0]);
  const separatorMargin = useTransform(scrollY, [310, 500, pageHeight - 400, pageHeight - 230], [0, 8, 8, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 96);
  });

  useEffect(() => {
    const ids = ['home', 'work', 'currently', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-6"
      initial={false}
      animate={{ y: isScrolled ? 0 : 0 }}
    >
      <nav
        aria-label="Primary"
        className="flex max-w-[calc(100vw-24px)] items-center overflow-x-auto rounded-full border border-portfolio-ink/10 bg-[#0c0915]/82 p-1.5 text-portfolio-muted shadow-[0_14px_42px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <motion.div
          style={{ width: wordmarkWidth, opacity: wordmarkOpacity }}
          className="hidden h-11 overflow-hidden sm:block"
        >
          <a href="#home" className="flex h-full items-center" aria-label="Matt Pasek home">
            <WordMark size="sm" bgColor="#0c0915" />
          </a>
        </motion.div>

        <motion.span
          style={{ opacity: separatorOpacity, marginInline: separatorMargin }}
          className="hidden h-6 w-px shrink-0 bg-portfolio-ink/10 sm:block"
          aria-hidden="true"
        />

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group relative flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-[14px] font-semibold tracking-[-0.01em] sm:px-5 sm:text-[16px] ${
                  isActive ? 'text-portfolio-ink' : 'text-portfolio-muted hover:text-portfolio-ink'
                }`}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-portfolio-ink/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    />
                  )}
                </AnimatePresence>
                <Icon className="relative size-[18px] shrink-0 text-current opacity-90 sm:size-5" />
                <span className="relative">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
