"use client";

export default function Navigation() {
  return (
    <nav className="fixed top-[18px] left-1/2 -translate-x-1/2 z-80 flex items-center gap-1 px-2 py-2 rounded-full bg-white/75 backdrop-blur-2xl border border-white/70 shadow-lg">
      <a href="#hero" className="flex items-center gap-2 px-4 py-2 rounded-full font-display text-lg text-ink">
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-peach to-gold text-white text-sm">✨</span>
        <span>Ayat</span>
      </a>

      <a href="#gallery" className="px-4 py-2 text-sm font-semibold text-ink-soft rounded-full hover:bg-white/60 transition-colors">
        Gallery
      </a>
      <a href="#about" className="px-4 py-2 text-sm font-semibold text-ink-soft rounded-full hover:bg-white/60 transition-colors">
        About
      </a>
      <a href="#awards" className="px-4 py-2 text-sm font-semibold text-ink-soft rounded-full hover:bg-white/60 transition-colors">
        Awards
      </a>
      <a href="#contact" className="px-4 py-2 text-sm font-semibold text-ink-soft rounded-full hover:bg-white/60 transition-colors">
        Contact
      </a>
    </nav>
  );
}
