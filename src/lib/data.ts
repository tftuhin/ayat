export interface Program {
  title: string;
  event: string;
  year: string;
  type: "video" | "image";
  src: string;
  poster?: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  icon: string;
  img?: string;
}

export const programs: Program[] = [
  {
    title: "Preparation for school program 2026",
    event: "School Program Preparation · 2026",
    year: "2026",
    type: "video",
    src: "/Video/Preparation%20for%20school%20program%202026.mp4",
    poster: "/images/Preparation%20for%20school%20program%202026.png",
  },
  {
    title: "Pahela Boishakh 2026 event at Muktijuddho Jadughor",
    event: "Muktijuddho Jadughor · 2026",
    year: "2026",
    type: "image",
    src: "/images/Pahela%20Boishakh%202026%20event%20at%20Muktijuddho%20Jadughor.png",
  },
  {
    title: "Poem Recitation in Pohela Boishakh 2026",
    event: "Bengali New Year Celebration · 2026",
    year: "2026",
    type: "video",
    src: "/Video/Poem%20Recitation%20in%20Pohela%20Boishakh%202026.mp4",
    poster: "/images/Poem%20Recitation%20in%20Pohela%20Boishakh%202026.png",
  },
  {
    title: "Pohela Boishakh event 2026 at School",
    event: "Milestone School & College · 2026",
    year: "2026",
    type: "image",
    src: "/images/Pohela%20Boishakh%20event%202026%20at%20School.png",
  },
  {
    title: "Receiving award for Robindro Utsob 2025",
    event: "Robindro Utsob Award Ceremony · 2025",
    year: "2025",
    type: "image",
    src: "/images/Receiving%20award%20for%20Robindro%20Utsob%202025.png",
  },
  {
    title: "Robindro Utsob 2025",
    event: "Rabindranath Tagore Birthday Celebration · 2025",
    year: "2025",
    type: "image",
    src: "/images/Robindro%20Utsob%202025.png",
  },
  {
    title: "Ayat's Birthday Party 2025",
    event: "Birthday Celebration at School · 2025",
    year: "2025",
    type: "image",
    src: "/images/Ayat%27s%20Birthday%20Party%202025.png",
  },
  {
    title: "With her teacher on her Birthday Party at School 2025",
    event: "Birthday Celebration · 2025",
    year: "2025",
    type: "image",
    src: "/images/With%20her%20teacher%20on%20her%20Birthday%20Party%20at%20School%202025.png",
  },
  {
    title: "Poem Recitation 21 Feb 2025",
    event: "Mother Language Day · 2025",
    year: "2025",
    type: "video",
    src: "/Video/Poem%20Recitation%2021%20Feb%202025.mp4",
    poster: "/images/Poem%20Recitation%2021%20Feb%202025.png",
  },
  {
    title: "Receiving All rounder award 2024",
    event: "Award Ceremony · 2024",
    year: "2024",
    type: "image",
    src: "/images/Receiving%20All%20rounder%20award%202024.png",
  },
  {
    title: "Ayat with her good habits craft",
    event: "School Activity",
    year: "2024",
    type: "image",
    src: "/images/Ayat%20with%20her%20good%20habits%20craft.png",
  },
  {
    title: "I love cycling",
    event: "Fun Activity",
    year: "2024",
    type: "image",
    src: "/images/I%20love%20cycling.png",
  },
  {
    title: "Summer Camp 2024",
    event: "Summer Activities · 2024",
    year: "2024",
    type: "image",
    src: "/images/Summer%20Camp%202024.png",
  },
  {
    title: "Annual Dance Competition 2024",
    event: "Milestone School & College · 2024",
    year: "2024",
    type: "video",
    src: "/Video/Annual%20Dance%20Competition%202024.mp4",
    poster: "/images/Annual%20Dance%20Competition%202024.png",
  },
  {
    title: "21 February 2024",
    event: "Mother Language Day · 2024",
    year: "2024",
    type: "image",
    src: "/images/21%20February%202024.png",
  },
  {
    title: "Receiving award for 21 February 2024 Drawing competition",
    event: "Mother Language Day Award · 2024",
    year: "2024",
    type: "image",
    src: "/images/Receiving%20award%20for%2021%20February%202024%20Drawing%20competition.png",
  },
  {
    title: "Music Competition 2023",
    event: "Milestone School & College · 2023",
    year: "2023",
    type: "image",
    src: "/images/Music%20Competition%202023.png",
  },
  {
    title: "Poem Recitation in Robindro Utsob 2023",
    event: "Rabindranath Tagore Birthday Celebration · 2023",
    year: "2023",
    type: "video",
    src: "/Video/Poem%20Recitation%20in%20Robindro%20Utsob%202023.mp4",
    poster: "/images/Poem%20Recitation%20in%20Robindro%20Utsob%202023.png",
  },
  {
    title: "Bosonto Utsob 2023",
    event: "Spring Celebration · 2023",
    year: "2023",
    type: "image",
    src: "/images/Bosonto%20Utsob%202023.png",
  },
  {
    title: "Receiving award for falgun utsob 2023",
    event: "Spring Festival Award · 2023",
    year: "2023",
    type: "image",
    src: "/images/Receiving%20award%20for%20falgun%20utsob%202023.png",
  },
  {
    title: "Drawing competition, 21 February 2023",
    event: "Mother Language Day · 2023",
    year: "2023",
    type: "image",
    src: "/images/Drawing%20competition,%2021%20February%202023.png",
  },
];

export const awards: Award[] = [
  {
    title: "Best Performer",
    issuer: "Milestone School & College",
    year: "2025",
    icon: "🏆",
    img: "/images/Best%20Performer.png",
  },
  {
    title: "Annual Dance Competition",
    issuer: "Milestone School & College",
    year: "2024",
    icon: "💃",
    img: "/images/Annual%20Dance%20Competition.png",
  },
  {
    title: "Best All Rounder",
    issuer: "Milestone School & College",
    year: "2024",
    icon: "⭐",
    img: "/images/Best%20All%20Rounder.png",
  },
  {
    title: "Poem Recitation",
    issuer: "Milestone School & College",
    year: "2024",
    icon: "🎤",
    img: "/images/Poem%20Recitation.png",
  },
  {
    title: "Annual Cultural Programme",
    issuer: "Milestone School & College",
    year: "2024",
    icon: "🎭",
    img: "/images/Annual%20Cultural%20Programme.png",
  },
  {
    title: "Best Discipline",
    issuer: "Milestone School & College",
    year: "2023",
    icon: "✨",
    img: "/images/Best%20Discipline.png",
  },
  {
    title: "Dance Competition",
    issuer: "Milestone School & College",
    year: "2024",
    icon: "💃",
    img: "/images/Dance%20Competition.jpg.png",
  },
];
