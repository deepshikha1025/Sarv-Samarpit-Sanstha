# HANDOFF NOTES — Sarv Samarpit Sanstha Website
(Share this file + the zip with any collaborator or AI assistant to continue the work.)

## Project
A responsive multi-page website + interactive prototype for Sarv Samarpit Sanstha (SSS),
a grassroots NGO in Bihar & Jharkhand (est. 15 Nov 2006, registered under the Societies
Registration Act XXI of 1860). Founder contact: Rakesh Ranjan, +91 95723 24030.
Four program pillars: (1) Skill Development & SHGs, (2) Panchayati Raj orientation,
(3) BIS standards / quality awareness, (4) Water, Sanitation & Hygiene (Swachh Bharat).

## Current state (v2 — complete)
Pages: index.html · about.html · initiatives.html · impact.html · help.html · donate.html · contact.html
- Official circular logo integrated in header + footer (assets/img/logo.png, transparent PNG)
- Interactive prototype features: animated impact counters, scroll reveals, mobile burger menu,
  donation amount picker, simulated 3-step checkout modal (amount → details → success),
  campaign "Fund" buttons open the same modal, volunteer sign-up form, animated reach bars
  on impact.html, toast notifications for all demo forms.

## Tech
Pure HTML/CSS/JS, no build step. Open index.html in a browser, or run
`python3 -m http.server` in the folder. All styles in assets/style.css (CSS variables at top),
all behavior in assets/script.js. Fonts via Google Fonts (Fraunces / Instrument Sans / Hind)
with graceful system fallbacks offline.

## Design system — "Seva Thread"
- Forest green #1C5C3E / deep #0F3B27 (trust, growth) · Marigold #E8A317 (hope, warmth)
- Paper #FBFAF5 background, ink #1F261F text · Radius 22px cards, organic blob image masks
- Devanagari watermarks per page: सेवा (home) कथा (about) कार्य (initiatives) प्रभाव (impact)
  सहयोग (help) दान (donate) संपर्क (contact)

## Placeholder content to replace before launch
- All impact numbers, campaign goal amounts, and testimonials are illustrative
- hello@sarvsamarpit.org, social links, map placeholder
- Checkout modal is a front-end demo — integrate a real gateway (e.g. Razorpay) + backend for forms

## Known conventions
- Header/footer markup is duplicated across pages — keep them in sync when editing
- .reveal elements animate on scroll; add data-delay="1|2|3" for stagger
- Photos live in assets/img with semantic names (e.g. pri-training.jpg, mass-rally.jpg)
