"use client";

import { useState } from "react";
import { awards } from "@/lib/data";

export default function Awards() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setFlipped((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="awards" className="section relative">
      <div className="shell">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Awards & recognition</div>
            <h2>My <span className="text-peach-deep">trophy</span> wall</h2>
          </div>
        </div>

        <p className="text-lg text-ink-soft mb-12 max-w-lg leading-relaxed reveal delay-1">Certificates from cultural programs, competitions & national celebrations</p>

        <div className="skills-grid">
          {awards.map((award, idx) => (
            <div key={award.title} onClick={() => toggle(idx)} className={`award-card-wrap cursor-pointer reveal delay-${Math.min(idx + 1, 4)} transition-transform duration-600`} style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full transition-transform duration-600" style={{ transformStyle: "preserve-3d", transform: flipped[idx] ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                <div className="absolute inset-0 glass-strong rounded-3xl p-5 flex flex-col items-center justify-center overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
                  {award.img ? (
                    <img src={award.img} alt={award.title} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="text-6xl">🏆</div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-peach to-peach-deep text-white rounded-3xl p-6 flex flex-col justify-center gap-4" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <h3 className="font-display text-2xl font-semibold leading-tight">{award.title}</h3>
                  <div className="text-sm opacity-90">{award.issuer}</div>
                  <div className="text-sm opacity-90">{award.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
