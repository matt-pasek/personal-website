'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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

const mobileLabelExitMs = 130;
const mobilePillTravelMs = 260;

const mobileLabelVariants = {
  hidden: { opacity: 0, maxWidth: 0 },
  visible: {
    opacity: 1,
    maxWidth: 150,
    transition: {
      opacity: { duration: 0.14 },
      maxWidth: { duration: 0.22, ease: [0.25, 0, 0, 1] as const },
    },
  },
  exit: {
    opacity: 0,
    maxWidth: 0,
    transition: {
      opacity: { duration: 0.08 },
      maxWidth: { duration: 0.13, ease: [0.4, 0, 1, 1] as const },
    },
  },
};

type PillBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isCaseStudy = pathname.startsWith('/work/');
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
  const [activePillHref, setActivePillHref] = useState('#home');
  const [visibleLabelHref, setVisibleLabelHref] = useState('#home');
  const [labelIsVisible, setLabelIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const mobileAnimationTarget = useRef('#home');
  const mobileAnimationTimers = useRef<number[]>([]);
  const tabRowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const activeVisualHref = isMobile ? activePillHref : activeSection;
  const [pillBounds, setPillBounds] = useState<PillBounds | null>(null);

  const measureActivePill = useCallback(() => {
    const tabRow = tabRowRef.current;
    const item = itemRefs.current[activeVisualHref];

    if (!tabRow || !item) return;

    const tabRowRect = tabRow.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const nextBounds = {
      x: itemRect.left - tabRowRect.left,
      y: itemRect.top - tabRowRect.top,
      width: itemRect.width,
      height: itemRect.height,
    };

    setPillBounds((currentBounds) => {
      if (
        currentBounds &&
        Math.abs(currentBounds.x - nextBounds.x) < 0.5 &&
        Math.abs(currentBounds.y - nextBounds.y) < 0.5 &&
        Math.abs(currentBounds.width - nextBounds.width) < 0.5 &&
        Math.abs(currentBounds.height - nextBounds.height) < 0.5
      ) {
        return currentBounds;
      }

      return nextBounds;
    });
  }, [activeVisualHref]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 96);
  });

  useEffect(() => {
    const tabRow = tabRowRef.current;
    const item = itemRefs.current[activeVisualHref];

    if (!tabRow || !item) return;

    const frame = window.requestAnimationFrame(measureActivePill);
    const observer = new ResizeObserver(measureActivePill);

    observer.observe(tabRow);
    observer.observe(item);
    window.addEventListener('resize', measureActivePill);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measureActivePill);
    };
  }, [activeVisualHref, measureActivePill]);

  useEffect(() => {
    const clearMobileAnimationTimers = () => {
      mobileAnimationTimers.current.forEach((timer) => window.clearTimeout(timer));
      mobileAnimationTimers.current = [];
    };

    clearMobileAnimationTimers();

    if (!isMobile) {
      mobileAnimationTarget.current = activeSection;
      return clearMobileAnimationTimers;
    }

    if (mobileAnimationTarget.current === activeSection) {
      const syncMobileStateTimer = window.setTimeout(() => {
        setActivePillHref(activeSection);
        setVisibleLabelHref(activeSection);
        setLabelIsVisible(true);
      }, 0);

      mobileAnimationTimers.current.push(syncMobileStateTimer);
      return clearMobileAnimationTimers;
    }

    mobileAnimationTarget.current = activeSection;

    const hideLabelTimer = window.setTimeout(() => {
      setLabelIsVisible(false);
    }, 0);
    const movePillTimer = window.setTimeout(() => {
      setActivePillHref(activeSection);
      setVisibleLabelHref(activeSection);

      const showLabelTimer = window.setTimeout(() => {
        setLabelIsVisible(true);
      }, mobilePillTravelMs);

      mobileAnimationTimers.current.push(showLabelTimer);
    }, mobileLabelExitMs);

    mobileAnimationTimers.current.push(hideLabelTimer, movePillTimer);

    return clearMobileAnimationTimers;
  }, [activeSection, isMobile]);

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
        <AnimatePresence mode="wait" initial={false}>
          {isCaseStudy ? (
            <motion.div
              key="case-study-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.22 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex items-center gap-1 px-1"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                className="flex h-11 items-center"
                aria-label="Matt Pasek home"
              >
                <WordMark size="sm" bgColor="#0c0915" />
              </a>
              <span className="mx-1 h-5 w-px bg-portfolio-ink/15" aria-hidden="true" />
              <button
                onClick={() => router.back()}
                className="flex min-h-11 items-center rounded-full px-4 text-[14px] font-semibold text-portfolio-muted transition-colors hover:text-portfolio-ink sm:text-[16px]"
              >
                go back
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="main-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.22 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex items-center"
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

              <div ref={tabRowRef} className="relative flex items-center gap-1">
                {pillBounds && (
                  <motion.span
                    className="pointer-events-none absolute rounded-full bg-portfolio-ink/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    initial={false}
                    animate={{
                      x: pillBounds.x,
                      y: pillBounds.y,
                      width: pillBounds.width,
                      height: pillBounds.height,
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 42, mass: 0.8 }}
                    aria-hidden="true"
                  />
                )}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const hasPill = (isMobile ? activePillHref : activeSection) === item.href;
                  const shouldShowLabel = !isMobile || (visibleLabelHref === item.href && labelIsVisible);
                  return (
                    <a
                      ref={(node) => {
                        itemRefs.current[item.href] = node;
                      }}
                      key={item.href}
                      href={item.href}
                      className={`group relative flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-[14px] font-semibold tracking-[-0.01em] sm:px-5 sm:text-[16px] ${
                        hasPill ? 'text-portfolio-ink' : 'text-portfolio-muted hover:text-portfolio-ink'
                      }`}
                    >
                      <Icon className="relative size-[18px] shrink-0 text-current opacity-90 sm:size-5" />
                      <AnimatePresence initial={false}>
                        {shouldShowLabel && (
                          <motion.span
                            key="label"
                            className="relative overflow-hidden whitespace-nowrap"
                            variants={isMobile ? mobileLabelVariants : undefined}
                            initial={isMobile ? 'hidden' : false}
                            animate={isMobile ? 'visible' : { opacity: 1, maxWidth: 150 }}
                            exit={isMobile ? 'exit' : undefined}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
