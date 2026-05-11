"use client";

export default function Navigation() {
  return (
    <nav className="nav">
      <a href="#hero" className="nav-brand">
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-peach to-gold text-white text-sm">✨</span>
        <span>Ayat</span>
      </a>
      <a href="#gallery" className="nav-link">Gallery</a>
      <a href="#about" className="nav-link">About</a>
      <a href="#awards" className="nav-link">Awards</a>
      <a href="#contact" className="nav-link">Contact</a>
    </nav>
  );
}
