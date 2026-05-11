# Ayat Portfolio - Next.js

A modern, interactive portfolio website for Tahrin Jahan Ayat, a young performing artist. Built with Next.js 16, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Interactive Gallery**: 3D carousel slider with 21 performances (images & videos)
- **Glass Morphism UI**: Beautiful frosted glass effects with smooth animations
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Performance**: Optimized images, lazy loading, and efficient rendering
- **Awards Showcase**: Interactive flip cards for achievements
- **Scroll Animations**: Smooth reveal animations as you scroll

## 📁 Project Structure

```
ayat/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Home page component
│   │   └── globals.css     # Global styles & animations
│   ├── components/
│   │   ├── Navigation.tsx  # Fixed navigation bar
│   │   ├── Hero.tsx        # Hero section with introduction
│   │   ├── Gallery.tsx     # Performance gallery slider
│   │   ├── About.tsx       # Skills/about section
│   │   ├── Awards.tsx      # Awards showcase
│   │   └── Contact.tsx     # Contact section
│   └── lib/
│       └── data.ts         # Portfolio content & data
├── public/
│   ├── images/             # Portfolio photos
│   └── Video/              # Performance videos
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── package.json
```

## 📦 Dependencies

- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS transformation

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Opens at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## 📝 Content Management

All portfolio content (programs, awards, images, videos) is defined in `src/lib/data.ts`:

```typescript
export const programs: Program[] = [
  {
    title: "Performance Title",
    event: "Event Name · Year",
    year: "2026",
    type: "video" | "image",
    src: "/path/to/file",
    poster?: "/path/to/poster"  // For videos
  }
]
```

To add new content, update the `programs` and `awards` arrays in this file.

## 🎨 Customization

### Colors
Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --peach: #d4a373;
  --peach-deep: #a67352;
  /* ... more colors */
}
```

### Fonts
Font families are defined in `tailwind.config.ts`:
- **Display**: Caprasimo
- **Body**: Plus Jakarta Sans
- **Hand**: Caveat

### Sections
Each section is a separate component in `src/components/`:
- Edit Hero section in `Hero.tsx`
- Customize Gallery in `Gallery.tsx`
- Update About skills in `About.tsx`
- Modify Awards in `Awards.tsx`

## 📤 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

The site is optimized for Vercel deployment.

### Other Platforms

Next.js can be deployed to any Node.js hosting:
- Netlify
- Railway
- Fly.io
- AWS Amplify
- etc.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📞 Contact

Email: tuhin59083@gmail.com

## 📄 License

ISC
