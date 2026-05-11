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
    <>
      <Navigation />
      <Hero />
      <Gallery />
      <About />
      <Awards />
      <Contact />
    </>
  );
}
