"use client";

export default function Contact() {
  return (
    <section id="contact" className="section relative">
      <div className="shell">
        <div className="contact-card glass-strong max-w-md mx-auto reveal">
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
