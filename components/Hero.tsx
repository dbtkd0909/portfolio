import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/thumbnails/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400">
          VFX Artist · Compositor
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Crafting Worlds <span className="text-emerald-400">Beyond Reality</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-neutral-300 md:text-lg">
          CG / Compositing / Nuke Python Tooling
        </p>

        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="h-8 w-8 text-neutral-400" />
        </div>
      </div>
    </section>
  );
}
