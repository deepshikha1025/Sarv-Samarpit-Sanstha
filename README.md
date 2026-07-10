# Sarv Samarpit Sanstha — NGO Website

A modern, editorial-style website for Sarv Samarpit Sanstha (SSS), a grassroots
NGO serving Bihar & Jharkhand since 2006.

## How to run
No build step needed — it's pure HTML/CSS/JS.
1. Unzip the folder.
2. Open `index.html` in any browser (double-click it).
   For best results serve it locally: `python3 -m http.server` inside the folder,
   then visit http://localhost:8000

## Pages
- index.html        — Home (hero, impact counters, initiatives, story, help, donation, news, partners, contact CTA)
- about.html        — Our Story (genesis, timeline, vision & values)
- initiatives.html  — Four program pillars + field photo gallery
- donate.html       — Donation experience (amount picker, campaigns, transparency)
- contact.html      — Contact form, details, map placeholder, socials

## Design system ("Seva Thread")
- Colors: forest green #1C5C3E (trust/growth), marigold #E8A317 (hope/warmth),
  warm paper #FBFAF5, deep ink #1F261F — all defined as CSS variables in assets/style.css
- Type: Fraunces (display) + Instrument Sans (body) + Hind (Devanagari accents), via Google Fonts
- Signature elements: organic blob-shaped photography, Devanagari watermarks (सेवा / कथा / दान),
  dashed marigold "stitch" motifs, animated impact counters

## Customizing
- All impact numbers, campaign amounts and copy are illustrative placeholders — edit directly in the HTML.
- Forms and the donate button are front-end demos (they show a toast). Connect them to a
  backend or a payment gateway (e.g. Razorpay) before going live.
- Replace `hello@sarvsamarpit.org` and social links with real ones.

Built as a portfolio-grade project — fully responsive, keyboard-focus visible,
reduced-motion respected.
