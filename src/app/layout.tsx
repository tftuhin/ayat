import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tahrin Jahan Ayat — Child Artist Portfolio",
  description: "A bright, expressive young performer with a captivating voice and vivid imagination — bringing Bengali poetry, traditional fables, and joyful dance to every stage.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🎭%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#fbf6ef] text-[#3a2a1f] overflow-x-hidden">
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
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
            mixBlendMode: 'multiply',
          }}
        />

        {children}
      </body>
    </html>
  );
}
