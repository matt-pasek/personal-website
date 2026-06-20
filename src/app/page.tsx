import { ChromeOverlay } from '@/components/ChromeOverlay';
import { Hero } from '@/components/homepageSections/Hero';
import { StatStatement } from '@/components/homepageSections/StatStatement';
import { AboutSection } from '@/components/homepageSections/AboutSection';
import { TimelineSection } from '@/components/homepageSections/TimelineSection';
import { ServicesSection } from '@/components/homepageSections/ServicesSection';
import { WorkSection } from '@/components/homepageSections/WorkSection';
import { BlobStatement } from '@/components/homepageSections/BlobStatement';
import { MotionSection } from '@/components/homepageSections/MotionSection';
import { CurrentlySectionRedesign } from '@/components/homepageSections/currently/CurrentlySection';
import { QuoteSection } from '@/components/homepageSections/QuoteSection';
import { NowSection } from '@/components/homepageSections/NowSection';
import { ConnectSection } from '@/components/homepageSections/footer/ConnectSection';
import { SiteFooter } from '@/components/homepageSections/footer/SiteFooter';
import { StackSection } from '@/components/homepageSections/StackSection';
import { GitHubSection } from '@/components/homepageSections/github/GithubSection';

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-portfolio-bg text-portfolio-ink">
      <ChromeOverlay />
      <Hero />
      <StatStatement />
      <AboutSection />
      <TimelineSection />
      <ServicesSection />
      <WorkSection />
      <StackSection />
      <GitHubSection />
      <BlobStatement />
      <MotionSection />
      <CurrentlySectionRedesign />
      <QuoteSection />
      <NowSection />
      <ConnectSection />
      <SiteFooter />
    </main>
  );
}
