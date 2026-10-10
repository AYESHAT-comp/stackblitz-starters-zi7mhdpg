'use client';

import { useState } from 'react';
import AlumenIntro from './AlumenIntro';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-black">
      {!introFinished && (
        <AlumenIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* NAVBAR */}
      <nav className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-8 py-7 md:px-14">
        <div className="text-xl font-black tracking-tight">ALUMEN</div>

        <div className="hidden items-center gap-8 text-sm md:flex">
          <button>Discover</button>
          <button>Community</button>
          <button>About</button>
        </div>

        <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">
          Join Alumen
        </button>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-8 md:px-14">
        {/* Decorative circle */}
        <div className="absolute right-[-150px] top-[15%] h-[600px] w-[600px] rounded-full bg-[#d8dfff]" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-black/50">
            Students × Alumni × Professors
          </p>

          <h1 className="text-[12vw] font-black leading-[0.82] tracking-[-0.07em] md:text-[8vw]">
            DON'T
            <br />
            FIGURE IT
            <br />
            OUT ALONE.
          </h1>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center">
            <button className="w-fit rounded-full bg-black px-8 py-4 font-semibold text-white transition-all hover:scale-105">
              Find your people →
            </button>

            <p className="max-w-sm text-sm leading-6 text-black/60">
              Get real advice about university, careers and everything in
              between from people who've already been there.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
