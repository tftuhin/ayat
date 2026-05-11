"use client";

import { useState, useEffect } from "react";
import { programs } from "@/lib/data";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<typeof programs>([]);

  useEffect(() => {
    setSlides(programs);
  }, []);

  const next = () => setCurrentIndex((i) => (i + 1) % slides.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setCurrentIndex(i);

  const getPosition = (idx: number) => {
    const diff = (idx - currentIndex + slides.length) % slides.length;
    if (diff === 0) return "center";
    if (diff === 1) return "next";
    if (diff === 2) return "far-next";
    if (diff === slides.length - 1) return "prev";
    if (diff === slides.length - 2) return "far-prev";
    return "hidden";
  };

  return (
    <section id="gallery" className="section relative">
      <div className="shell">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">My performances</div>
            <h2>
              The <span className="text-peach-deep">stage</span> album
            </h2>
          </div>
        </div>

        <p className="text-lg text-ink-soft mb-12 max-w-lg leading-relaxed reveal delay-1">
          A scrapbook of cultural programs, rehearsals, and standout moments
        </p>

        <div className="relative mb-12">
          <div className="coverflow-stage">
            <div className="absolute inset-0 flex items-center justify-center">
              {slides.map((prog, idx) => {
                const position = getPosition(idx);
                return (
                  <div
                    key={prog.title}
                    onClick={() => goTo(idx)}
                    className={`absolute w-64 h-80 rounded-3xl glass-strong overflow-hidden cursor-pointer transition-all duration-600 ${
                      position !== "hidden" ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                    style={{
                      transform:
                        position === "center"
                          ? "translateX(0) scale(1)"
                          : position === "next"
                            ? "translateX(200px) scale(0.85)"
                            : position === "far-next"
                              ? "translateX(380px) scale(0.7)"
                              : position === "prev"
                                ? "translateX(-200px) scale(0.85)"
                                : position === "far-prev"
                                  ? "translateX(-380px) scale(0.7)"
                                  : "opacity-0",
                      opacity:
                        position === "center"
                          ? 1
                          : position === "next" || position === "prev"
                            ? 0.8
                            : position === "far-next" || position === "far-prev"
                              ? 0.4
                              : 0,
                    }}
                  >
                    {prog.type === "video" ? (
                      <video
                        src={prog.src}
                        poster={prog.poster}
                        preload="none"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={prog.src} alt={prog.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
                      <div className="font-semibold text-sm">{prog.title}</div>
                      <div className="text-xs opacity-85">{prog.event}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between absolute -bottom-16 left-0 right-0">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full bg-white hover:bg-white shadow-md flex items-center justify-center text-xl transition-transform hover:scale-110"
            >
              ←
            </button>

            <div className="flex gap-1.5">
              {slides.map((prog, idx) => (
                <button
                  key={prog.title}
                  onClick={() => goTo(idx)}
                  className={`transition-all ${
                    idx === currentIndex
                      ? "w-6 h-2 rounded bg-peach-deep"
                      : "w-2 h-2 rounded-full bg-ink-soft opacity-40 hover:opacity-60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full bg-white hover:bg-white shadow-md flex items-center justify-center text-xl transition-transform hover:scale-110"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-24" />
      </div>
    </section>
  );
}
