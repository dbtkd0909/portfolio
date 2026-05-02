"use client";

import { Play } from "lucide-react";
import { useRef } from "react";

type Work = {
  title: string;
  tags: string[];
  src: string;
  poster?: string;
};

const works: Work[] = [
  {
    title: "Urban Drift",
    tags: ["Houdini", "Nuke"],
    src: "/videos/work-01.mp4",
    poster: "/thumbnails/work-01.jpg",
  },
  {
    title: "Forest Whisper",
    tags: ["Maya", "Arnold"],
    src: "/videos/work-02.mp4",
    poster: "/thumbnails/work-02.jpg",
  },
  {
    title: "Neon Run",
    tags: ["Cinema 4D", "Redshift"],
    src: "/videos/work-03.mp4",
    poster: "/thumbnails/work-03.jpg",
  },
  {
    title: "Liquid Form",
    tags: ["Houdini", "FLIP"],
    src: "/videos/work-04.mp4",
    poster: "/thumbnails/work-04.jpg",
  },
  {
    title: "Cosmic Dust",
    tags: ["Nuke", "Particles"],
    src: "/videos/work-05.mp4",
    poster: "/thumbnails/work-05.jpg",
  },
  {
    title: "Glass Memory",
    tags: ["Blender", "Cycles"],
    src: "/videos/work-06.mp4",
    poster: "/thumbnails/work-06.jpg",
  },
];

function WorkCard({ work }: { work: Work }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative aspect-video overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        src={work.src}
        poster={work.poster}
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 transition group-hover:opacity-0">
        <Play className="h-12 w-12 text-white" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <h3 className="text-base font-semibold">{work.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-700 bg-neutral-800/60 px-2 py-0.5 text-xs text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioGrid() {
  return (
    <section
      id="portfolio"
      className="bg-neutral-950 px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-emerald-400">
              Showreel
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Life CG Portfolio
            </h2>
          </div>
          <p className="hidden text-sm text-neutral-400 md:block">
            10s clips · hover to play
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.title} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
