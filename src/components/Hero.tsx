"use client";

export default function Hero() {
  return (
    <section id="hero" className="section relative min-h-screen flex items-center">
      <div className="shell w-full">
        <div className="hero-grid">
          <div>
            <div className="glass inline-flex items-center gap-3 px-4 py-2 mb-6 reveal">
              <span className="w-2 h-2 rounded-full bg-peach-deep shadow-lg"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">Class One · Age 6 · On stage since 4</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-normal leading-tight mb-6 reveal delay-1">
              Hi, I'm<br />
              <span className="text-peach-deep">Tahrin</span>
              <br />
              <span className="font-hand text-3xl md:text-4xl text-lavender-deep inline-block -rotate-1 mt-2 align-bottom">and I love the stage ♡</span>
            </h1>

            <p className="text-lg text-ink-soft mb-6 max-w-lg leading-relaxed reveal delay-2">
              A bright, expressive young performer with a captivating voice and vivid imagination — bringing Bengali poetry, traditional fables, and joyful dance to every stage I step on.
            </p>

            <div className="flex flex-wrap gap-2 mb-8 reveal delay-3">
              {["🎤 Recitation", "📖 Storytelling", "💃 Dance", "🎭 Stage"].map((tag) => (
                <span key={tag} className="glass px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-br from-peach/30 via-lavender/30 to-gold/30 border border-white/50">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-12 reveal delay-4">
              <a href="#gallery" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-peach to-peach-deep text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-lg">
                See my performances →
              </a>
              <a href="#awards" className="glass px-6 py-3 text-ink font-semibold rounded-full hover:translate-y-[-2px] transition-transform">
                View awards
              </a>
            </div>

            <div className="flex gap-8 reveal delay-4">
              {[
                { value: "3+", label: "Years performing" },
                { value: "2", label: "Languages spoken" },
                { value: "12", label: "Awards & certificates" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl font-bold text-peach-deep">{stat.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-ink-soft mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="reveal delay-4 flex justify-center mt-16">
              <div className="flex flex-col items-center gap-2 text-ink-mute text-xs uppercase tracking-widest font-semibold">
                scroll to explore
                <div className="w-px h-9 bg-gradient-to-b from-ink-mute to-transparent animate-float-y"></div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square max-w-sm mx-auto w-full reveal delay-2">
            <div
              className="absolute inset-0 blur-2xl opacity-70 animate-blob-morph"
              style={{
                background: "linear-gradient(135deg, rgba(212, 163, 115, 0.5), rgba(201, 197, 224, 0.5))",
              }}
            ></div>
            <div className="glass-strong relative w-full h-full rounded-full overflow-hidden">
              <img
                src="/images/ayat-hero.png"
                alt="Ayat in traditional dance costume"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute top-[-4%] right-[20%] text-4xl animate-spin-slow drop-shadow-lg">✦</span>
            <span className="absolute bottom-[-2%] right-[18%] text-2xl animate-twinkle">♡</span>
          </div>
        </div>
      </div>
    </section>
  );
}
