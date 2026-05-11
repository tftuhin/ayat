"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-7">
        <div className="max-w-md mx-auto text-center glass-strong p-12 rounded-3xl reveal">
          <h2 className="font-display text-4xl font-semibold mb-4 leading-tight">
            Let's create<br />magic together ✨
          </h2>
          <p className="text-ink-soft mb-8 leading-relaxed">
            For any questions, collaborations, or just to say hi — reach out anytime!
          </p>
          <a
            href="mailto:tuhin59083@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-peach to-peach-deep text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            ✉ tuhin59083@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
