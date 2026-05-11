"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";

export default function Home() {
  useEffect(() => {
    // Scroll reveal animation
    const observeReveal = () => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((el) => {
            if (el.isIntersecting) {
              el.target.classList.add("in");
              obs.unobserve(el.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    };

    observeReveal();
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#fbf6ef]">
      {/* Background decorations */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(60% 50% at 15% 10%, rgba(212, 163, 115, 0.35) 0%, transparent 60%),
            radial-gradient(50% 60% at 85% 20%, rgba(201, 197, 224, 0.25) 0%, transparent 65%),
            radial-gradient(70% 55% at 70% 90%, rgba(193, 212, 168, 0.25) 0%, transparent 60%),
            radial-gradient(50% 40% at 20% 80%, rgba(212, 179, 118, 0.2) 0%, transparent 65%)
          `,
        }}
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
          mixBlendMode: 'multiply',
        }}
      />

      <Navigation />
      <Hero />
      <Gallery />
      <About />
      <Awards />
      <Contact />
    </div>
  );
}
