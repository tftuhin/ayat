# Tahrin Jahan Ayat — Child Artist Portfolio

A highly animated, pink-themed Hugo portfolio site for Tahrin — featuring poem recitation, storytelling, and dance performances. Built with brushstroke decorations, unicorns, sparkles, and a polaroid-style scrapbook gallery.

## Run locally

```bash
cd tahrin-portfolio
hugo server
```

Visit http://localhost:1313

## Build for production

```bash
hugo --minify
# Output is in ./public
```

## Folder map

```
tahrin-portfolio/
├── hugo.toml                    # Site config
├── archetypes/                  # Templates for `hugo new`
├── assets/
│   ├── css/main.css             # All styling (pink palette, animations, layout)
│   └── js/main.js               # Filtering, mobile nav, sparkle clicks
├── content/
│   ├── programs/                # 8 sample performances (the gallery)
│   └── certificates/            # 6 sample awards (the trophy wall)
└── layouts/
    ├── _default/                # baseof, single, list templates
    ├── partials/                # header, footer, background decorations
    └── index.html               # Homepage with all sections
```

## Add a new performance

```bash
hugo new programs/diwali-dance-2025.md
```

Then edit the front matter:

```toml
+++
title = "My Diwali Dance"
event = "School Diwali Program"
year = "2025"
categories = ["dance"]      # used by gallery filter chips
emoji = "🪔"                # shown if no image
color = "linear-gradient(135deg, #fbbf24, #f472b6)"
image = "/images/diwali.jpg"   # optional - put file in static/images/
video = ""                    # optional - shows play badge
summary = "Short caption shown on the polaroid"
+++
```

## Add a new certificate

```bash
hugo new certificates/champion-2025.md
```

```toml
+++
title = "Best Performer Award"
issuer = "Milestone School & College"
year = "2025"
icon = "🏆"
image = "/images/cert.jpg"   # optional - if omitted, decorative placeholder is used
summary = "Description of why this was awarded"
+++
```

## Gallery filter categories

The chips on the homepage filter by these `categories` values:
- `recitation`
- `dance`
- `storytelling`
- `national` (Mother Language Day, Independence Day, etc.)

Add multiple categories to a program with `categories = ["dance", "national"]`.

## Adding real photos and videos

1. Drop image files into `static/images/`
2. Reference them in front matter as `image = "/images/your-photo.jpg"`
3. For videos, add `video = "/videos/your-clip.mp4"` — the polaroid will show a ▶ play badge

## Design system

- **Colors**: Pink (`#ec4899`) primary, with magenta, lilac, gold, mint accents — defined as CSS variables in `assets/css/main.css`
- **Typography**: Fraunces (display, italic), Caveat (handwritten), Quicksand (body) — loaded from Google Fonts
- **Background decor**: Brushstrokes, unicorns, sparkles, hearts, polka dots, and rainbow gradient blobs all in `layouts/partials/background-decor.html`
- **Animations**: All CSS-based, respect `prefers-reduced-motion`

## What's NOT on the site

Per request, the following do **not** appear anywhere:
- Date of birth
- Phone number
- Parent names
- Physical details (height, hair color, eye color)
- Student ID

The only contact point is the email address in the footer.
