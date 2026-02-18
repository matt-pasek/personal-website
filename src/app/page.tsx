import Blob from '@/components/Blob';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative z-10 grid w-3/5 min-w-6xl grid-cols-[1fr_500px_1fr] items-center gap-16 overflow-visible">
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
    </main>
  );
}
