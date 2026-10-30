/* =====================================================================
   WAHAB AI — SITE CONFIG
   ---------------------------------------------------------------------
   Yahan se aap website ka zyada-tar text aur saare links edit kar sakte
   hain. HTML/CSS/JS ko chhoone ki zaroorat nahi.

   • Profile image  → assets/profile.jpg ko apni image se replace karein
   • Social links   → neeche `socials` mein url badlein (url: "#" = hidden)
   • Contact        → `contact` mein email / WhatsApp number badlein
   • Icons          → icon naam js/main.js ke ICONS object se aate hain
   ===================================================================== */

window.SITE_CONFIG = {
  /* ---------- Brand & Hero ---------- */
  brand: "WAHAB AI",
  name: "SYED ABDUL WAHAB BUKHARI",
  roles: ["FULL-STACK DEVELOPER", "AI DEVELOPER", "CYBERSECURITY EXPERT"],
  status: "AVAILABLE FOR PROJECTS",
  profileImage: "assets/profile.jpg",

  // Hero ke neeche typing effect mein ye lines ghoomti hain
  typing: [
    "Building secure, AI-powered web apps",
    "Crafting WhatsApp bots & smart automation",
    "Hardening systems with a hacker's mindset",
    "Shipping fast, clean, futuristic interfaces",
  ],

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      "I'm <strong>Syed Abdul Wahab Bukhari</strong> — an independent developer from Pakistan who builds fast, secure and intelligent digital products under the <strong>WAHAB AI</strong> brand.",
      "From full-stack web apps and WhatsApp automation to AI-powered platforms, I combine clean engineering with a security-first mindset — so what I ship doesn't just look futuristic, it holds up in the real world.",
    ],
    highlights: [
      "Security-first engineering",
      "AI & API integration",
      "Pixel-perfect, responsive UI",
      "Independent & project-driven",
    ],
    // Terminal card (About section) — t: cmd | out | ok
    terminal: [
      { t: "cmd", v: "whoami" },
      { t: "out", v: "syed-abdul-wahab-bukhari // WAHAB AI" },
      { t: "cmd", v: "cat stack.txt" },
      { t: "out", v: "web · ai · bots · cybersecurity" },
      { t: "cmd", v: "./status --now" },
      { t: "ok", v: "online — open to new projects" },
    ],
  },

  /* ---------- Animated counters (apni real values daalein) ---------- */
  stats: [
    { value: 20, suffix: "+", label: "Projects Built" },
    { value: 15, suffix: "+", label: "Technologies" },
    { value: 10, suffix: "+", label: "AI & Bot Integrations" },
    { value: 100, suffix: "%", label: "Passion & Dedication" },
  ],

  /* ---------- Skills (level = 0–100) ---------- */
  skills: [
    { name: "HTML", icon: "code", level: 95 },
    { name: "CSS", icon: "layout", level: 92 },
    { name: "JavaScript", icon: "zap", level: 90 },
    { name: "PHP", icon: "server", level: 85 },
    { name: "Python", icon: "terminal", level: 82 },
    { name: "MySQL", icon: "database", level: 84 },
    { name: "Git / GitHub", icon: "branch", level: 88 },
    { name: "AI / API Integration", icon: "brain", level: 90 },
    { name: "Cybersecurity", icon: "shield", level: 86 },
  ],

  /* ---------- Projects ---------- */
  // hue = card ka color (0–360), link "#" ho to "Coming soon" dikhega
  projects: [
    {
      title: "SYED MD AI",
      desc: "Full-stack Next.js AI chat platform with smart conversations and a polished, responsive interface.",
      tags: ["Next.js", "AI API", "Full-Stack"],
      icon: "brain",
      hue: 190,
      link: "#",
    },
    {
      title: "WhatsApp Bot Framework",
      desc: "Production-grade WhatsApp bot framework on Node.js + Baileys — modular commands, sessions and automation.",
      tags: ["Node.js", "Baileys", "Automation"],
      icon: "bot",
      hue: 150,
      link: "#",
    },
    {
      title: "AQEEL COLLECTION Bot",
      desc: "Multi-tenant WhatsApp customer-support and product-selling bot with MongoDB and a web pairing site.",
      tags: ["WhatsApp", "MongoDB", "Heroku"],
      icon: "chat",
      hue: 280,
      link: "#",
    },
    {
      title: "AI CV Builder",
      desc: "Single-file CV builder with AI auto-fill, live preview and a hidden admin panel.",
      tags: ["JavaScript", "AI", "Admin Panel"],
      icon: "layout",
      hue: 320,
      link: "#",
    },
    {
      title: "App Store Platform",
      desc: "PHP/MySQL app store to browse, search and download apps — with admin panel, analytics, support and broadcast.",
      tags: ["PHP", "MySQL", "Analytics"],
      icon: "server",
      hue: 40,
      link: "#",
    },
    {
      title: "SYED // NEXUS",
      desc: "Ultra-premium 3D interactive portfolio universe built with Three.js, GSAP and hand-tracking.",
      tags: ["Three.js", "GSAP", "MediaPipe"],
      icon: "cpu",
      hue: 230,
      link: "#",
    },
  ],

  /* ---------- Services ---------- */
  services: [
    { title: "Full-Stack Web Development", icon: "globe", desc: "Fast, scalable websites and web apps — from pixel-perfect front-end to secure back-end and database." },
    { title: "AI Integration & Chatbots", icon: "brain", desc: "Smart assistants, AI chat platforms and API integrations that automate work and delight users." },
    { title: "WhatsApp Bot Development", icon: "chat", desc: "Customer-support, selling and automation bots with multi-session and admin control." },
    { title: "Cybersecurity & Hardening", icon: "shield", desc: "Security reviews, vulnerability fixes and hardening so your app stays protected." },
    { title: "API & Backend Systems", icon: "server", desc: "Clean REST APIs, authentication, databases and integrations built for reliability." },
    { title: "Responsive UI/UX Design", icon: "layout", desc: "Premium, futuristic interfaces that feel great on every screen and every device." },
  ],

  /* ---------- My Digital Journey ---------- */
  journey: [
    { label: "PHASE 01", title: "First Lines of Code", desc: "Started with HTML, CSS and JavaScript — turning ideas into pages and learning how the web really works." },
    { label: "PHASE 02", title: "Going Full-Stack", desc: "Added PHP, MySQL and Python — building complete apps with databases, admin panels and APIs." },
    { label: "PHASE 03", title: "AI & Automation", desc: "Integrated AI APIs and built WhatsApp bots, chat platforms and smart tools." },
    { label: "PHASE 04", title: "Security Mindset", desc: "Dived into cybersecurity — thinking like an attacker to build safer systems." },
    { label: "PHASE 05", title: "WAHAB AI", desc: "Unified everything under one brand: secure, intelligent and beautifully engineered products." },
  ],

  /* ---------- WAHAB AI section ---------- */
  wahabAI: {
    text: "WAHAB AI is my personal brand and build lab — an ecosystem of AI assistants, bots and tools designed to be fast, secure and genuinely useful.",
    features: ["AI Assistants", "WhatsApp Automation", "Secure by Design", "Custom Tools"],
    chat: [
      { who: "user", text: "Who built you?" },
      { who: "ai", text: "I'm WAHAB AI — engineered by Syed Abdul Wahab Bukhari." },
      { who: "user", text: "What can you do?" },
      { who: "ai", text: "Build web apps, bots & secure systems. Ready when you are." },
    ],
  },

  /* ---------- Contact ---------- */
  contact: {
    email: "your@email.com",                // <- apni email
    phoneDisplay: "+92 300 0000000",        // <- jo number dikhana hai
    whatsappNumber: "923000000000",         // <- country code ke saath, bina + ya spaces
    whatsappText: "Hello Wahab, I found you via your portfolio.",
    location: "Pakistan",
  },

  /* ---------- Social links (url: "#" = placeholder) ---------- */
  socials: [
    { name: "GitHub",    icon: "github",    url: "https://github.com/your-username" },
    { name: "LinkedIn",  icon: "linkedin",  url: "https://linkedin.com/in/your-username" },
    { name: "Instagram", icon: "instagram", url: "https://instagram.com/your-username" },
    { name: "Facebook",  icon: "facebook",  url: "https://facebook.com/your-username" },
    { name: "YouTube",   icon: "youtube",   url: "https://youtube.com/@your-channel" },
    { name: "Telegram",  icon: "send",      url: "https://t.me/your-username" },
    { name: "WhatsApp",  icon: "chat",      url: "https://wa.me/923000000000" },
  ],
};
