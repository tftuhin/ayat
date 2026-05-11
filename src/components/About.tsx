"use client";

const skills = [
  { icon: "🎤", title: "Poem Recitation", description: "Excellent memorization with natural rhythm, voice modulation, and expressive facial gestures that bring every verse to life." },
  { icon: "💃", title: "Dance", description: "Energetic and graceful — comfortable learning choreography and executing stage routines for cultural events." },
  { icon: "📖", title: "Storytelling", description: "Engaging delivery style. Skilled at narrating traditional Bengali fables and fun children's stories." },
  { icon: "🎭", title: "Stage & Camera", description: "Naturally charismatic, unafraid of large audiences, and comfortable taking direction from teachers and directors." },
];

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="shell">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">About me</div>
            <h2>A little storyteller<br />with big <span className="text-peach-deep">dreams ✨</span></h2>
          </div>
        </div>

        <p className="text-lg text-ink-soft mb-12 max-w-lg leading-relaxed reveal delay-1">Four skills woven into every performance — recitation, dance, storytelling and the bright stage presence that ties them together.</p>

        <div className="skills-grid mb-16">
          {skills.map((skill, idx) => (
            <div key={skill.title} className={`glass p-7 relative overflow-hidden reveal delay-${Math.min(idx + 1, 4)}`}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-gradient-to-br from-peach via-white/60 shadow-md">{skill.icon}</div>
              <h3 className="font-display text-2xl font-semibold mb-3">{skill.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
