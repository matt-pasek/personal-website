export function ChromeOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 h-dvh w-dvw" aria-hidden="true">
      <div className="absolute inset-2 rounded-[clamp(38px,2vw,78px)] shadow-[0_0_0_9999px_#0A0613,inset_0_1px_0_rgba(255,255,255,0.07)] sm:inset-4" />
    </div>
  );
}
