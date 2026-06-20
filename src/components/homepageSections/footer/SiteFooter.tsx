import { WordMark } from '@/components/WordMark';

function FooterLinks({
  title,
  links,
  hoverColorClass,
}: {
  title: string;
  links: [string, string][];
  hoverColorClass: string;
}) {
  return (
    <div>
      <div className="mb-4 font-mono text-[12px] tracking-[0.14em] text-portfolio-muted uppercase">{title}</div>
      <div className="flex flex-col text-[15.5px] text-portfolio-ink">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`flex min-h-9 items-center transition-colors duration-200 ${hoverColorClass}`}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 -mt-[clamp(132px,16vw,220px)] w-full overflow-hidden rounded-t-[30px] bg-portfolio-bg px-6 pt-[clamp(190px,22vw,300px)] pb-[clamp(42px,7vw,72px)] text-portfolio-ink sm:rounded-t-[38px] sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(230,227,242,.26),rgba(82,201,137,.24),transparent)]" />
      <div className="pointer-events-none absolute top-[-34%] right-[-10%] h-[105%] w-[50%] bg-[radial-gradient(circle,rgba(139,92,246,.2),transparent_62%)]" />
      <div className="pointer-events-none absolute bottom-[-46%] left-[-12%] h-[120%] w-[52%] bg-[radial-gradient(circle,rgba(82,201,137,.16),transparent_64%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,11,31,.74),rgba(10,6,19,0)_42%,rgba(16,11,31,.58))]" />
      <div className="relative mx-auto flex max-w-[1160px] flex-col justify-between gap-[clamp(54px,7vw,88px)]">
        <div className="grid gap-[clamp(42px,7vw,92px)] md:grid-cols-[minmax(260px,1fr)_minmax(390px,460px)] md:items-start">
          <div className="max-w-[340px]">
            <WordMark size="lg" bgColor="#0a0613" />
            <p className="mt-2 ml-3 text-[15px] leading-[1.75] text-portfolio-muted">
              Designer by eye, dev by hand. Currently in Lahti.
            </p>
          </div>

          <div className="grid gap-x-14 gap-y-9 sm:grid-cols-2 md:grid-cols-[repeat(2,minmax(140px,1fr))] md:justify-between">
            <FooterLinks
              hoverColorClass="hover:text-portfolio-violet"
              title="Index"
              links={[
                ['About', '#about'],
                ['Work', '#work'],
                ['Currently', '#currently'],
              ]}
            />
            <FooterLinks
              hoverColorClass="hover:text-portfolio-green-dark"
              title="Elsewhere"
              links={[
                ['GitHub', 'https://github.com/matt-pasek'],
                ['Email', 'mailto:contact@matt-pasek.dev'],
                ['matt-pasek.dev', 'https://matt-pasek.dev'],
              ]}
            />
          </div>
        </div>

        <div className="grid gap-3 border-t border-white/6 pt-6 text-center font-mono text-[13px] tracking-[0.04em] text-portfolio-muted md:grid-cols-[1fr_auto_1fr] md:text-left">
          <span>© 2026 Mateusz Pasek. All rights reserved.</span>
          <span className="md:col-start-3 md:text-right">quality &gt; quantity</span>
        </div>
      </div>
    </footer>
  );
}
