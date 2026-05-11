"use client";

const skills = [
  {
    icon: "🎤",
    title: "Poem Recitation",
    description: "Excellent memorization with natural rhythm, voice modulation, and expressive facial gestures that bring every verse to life.",
    bg: "from-peach/30",
  },
  {
    icon: "💃",
    title: "Dance",
    description: "Energetic and graceful — comfortable learning choreography and executing stage routines for cultural events.",
    bg: "from-rose/30",
  },
  {
    icon: "📖",
    title: "Storytelling",
    description: "Engaging delivery style. Skilled at narrating traditional Bengali fables and fun children's stories.",
    bg: "from-lavender/30",
  },
  {
    icon: "🎭",
    title: "Stage & Camera",
    description: "Naturally charismatic, unafraid of large audiences, and comfortable taking direction from teachers and directors.",
    bg: "from-gold/30",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-7">
        <div className="mb-16 reveal">
          <div className="text-sm font-bold uppercase tracking-widest text-peach-deep mb-2">About me</div>
          <h2 className="font-display text-5xl md:text-6xl font-normal leading-tight">
            A little storyteller<br />with big <span className="text-peach-deep">dreams ✨</span>
          </h2>
        </div>

        <p className="text-lg text-ink-soft mb-12 max-w-lg leading-relaxed reveal delay-1">
          Four skills woven into every performance — recitation, dance, storytelling and the bright stage presence that ties them together.
        </p>

        <div className="grid gap-5 mb-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {skills.map((skill, idx) => (
            <div
              key={skill.title}
              className={`glass p-7 relative overflow-hidden reveal delay-${Math.min(idx + 1, 4)}`}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-gradient-to-br via-white/60 shadow-md" style={{ backgroundImage: `linear-gradient(135deg, var(--peach), rgba(255,255,255,0.6))` }}>
                {skill.icon}
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{skill.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
