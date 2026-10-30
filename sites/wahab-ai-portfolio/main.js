/* =====================================================================
   WAHAB AI — main.js
   Sections:  1. Helpers & icons   2. Render from config
              3. UI behaviour      4. Effects (canvas, cursor, tilt)
   Content / links edit karne ke liye js/config.js use karein.
   ===================================================================== */
(() => {
  'use strict';

  const CFG = window.SITE_CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  /* ---------- 1. ICONS (24x24, stroke-based) ---------- */
  const ICONS = {
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    branch: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    bot: '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    up: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
  };
  const icon = (name) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.code}</svg>`;
  const stagger = (i, step = 0.07) => `--d:${(i * step).toFixed(2)}s`;

  /* ---------- 2. RENDER FROM CONFIG ---------- */
  function bindConfig() {
    $$('[data-cfg]').forEach((el) => {
      const v = get(CFG, el.dataset.cfg);
      if (typeof v === 'string') el.textContent = v;
    });
    $$('[data-cfg-src]').forEach((el) => {
      const v = get(CFG, el.dataset.cfgSrc);
      if (typeof v === 'string') el.src = v;
    });
    const heroName = $('#heroName');
    if (heroName) heroName.dataset.text = heroName.textContent;

    if (Array.isArray(CFG.roles)) {
      $('#heroRoles').innerHTML = CFG.roles.map((r) => `<span>${esc(r)}</span>`).join('');
    }
    $('#year').textContent = new Date().getFullYear();
  }

  function renderSocials() {
    const list = (CFG.socials || []).filter((s) => s.url && s.url !== '#');
    const html = list
      .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)}" title="${esc(s.name)}">${icon(s.icon)}</a></li>`)
      .join('');
    $$('[data-social-list]').forEach((ul) => (ul.innerHTML = html));
  }

  function renderAbout() {
    const a = CFG.about || {};
    $('#aboutText').innerHTML = (a.paragraphs || []).map((p) => `<p>${p}</p>`).join('');
    $('#aboutHighlights').innerHTML = (a.highlights || []).map((h) => `<li>${icon('check')}<span>${esc(h)}</span></li>`).join('');
    $('#stats').innerHTML = (CFG.stats || [])
      .map((s, i) => `<div class="reveal" style="${stagger(i, 0.08)}"><div class="stat glass tilt"><div class="stat-num" data-count="${s.value}" data-suffix="${esc(s.suffix || '')}">0${esc(s.suffix || '')}</div><div class="stat-label">${esc(s.label)}</div></div></div>`)
      .join('');
  }

  function renderSkills() {
    $('#skills-grid').innerHTML = (CFG.skills || [])
      .map((s, i) => `<div class="reveal" style="${stagger(i)}"><article class="skill glass tilt" style="--lvl:${(s.level / 100).toFixed(2)}">
          <div class="skill-top"><span class="skill-icon">${icon(s.icon)}</span><h3 class="skill-name">${esc(s.name)}</h3><span class="skill-pct">${s.level}%</span></div>
          <div class="bar" role="img" aria-label="${esc(s.name)} proficiency ${s.level}%"><i></i></div>
        </article></div>`)
      .join('');
  }

  function renderProjects() {
    $('#projects-grid').innerHTML = (CFG.projects || [])
      .map((p, i) => {
        const live = p.link && p.link !== '#';
        const link = live
          ? `<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">View project ${icon('external')}</a>`
          : `<span class="project-link is-soon">Coming soon</span>`;
        return `<div class="reveal" style="${stagger(i % 3, 0.1)}"><article class="project glass tilt">
          <div class="project-cover" style="--h:${p.hue ?? 200}"><span class="project-num">PROJECT_${String(i + 1).padStart(2, '0')}</span>${icon(p.icon)}</div>
          <div class="project-body"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
            <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>${link}</div>
        </article></div>`;
      })
      .join('');
  }

  function renderServices() {
    $('#services-grid').innerHTML = (CFG.services || [])
      .map((s, i) => `<div class="reveal" style="${stagger(i % 3, 0.1)}"><article class="service glass tilt">
          <span class="service-num">${String(i + 1).padStart(2, '0')}</span>
          <div class="service-icon">${icon(s.icon)}</div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p>
        </article></div>`)
      .join('');
  }

  function renderJourney() {
    $('#timeline').insertAdjacentHTML(
      'beforeend',
      (CFG.journey || [])
        .map((j) => `<article class="tl-item reveal"><div class="tl-card glass"><span class="tl-label">${esc(j.label)}</span><h3>${esc(j.title)}</h3><p>${esc(j.desc)}</p></div><span class="tl-node" aria-hidden="true"></span></article>`)
        .join('')
    );
  }

  function renderAI() {
    const ai = CFG.wahabAI || {};
    $('#aiText').textContent = ai.text || '';
    $('#aiFeatures').innerHTML = (ai.features || []).map((f) => `<li>${esc(f)}</li>`).join('');
    const msgs = ai.chat || [];
    $('#chatBody').innerHTML =
      msgs.map((m, i) => `<div class="msg msg--${m.who === 'user' ? 'user' : 'ai'}" style="--t:${(0.5 + i * 1.5).toFixed(1)}s">${esc(m.text)}</div>`).join('') +
      `<div class="typing-dots" style="--t:${(0.5 + msgs.length * 1.5).toFixed(1)}s" aria-hidden="true"><i></i><i></i><i></i></div>`;
  }

  function injectIcons() {
    $$('[data-icon]').forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  }

  /* ---------- 3. UI BEHAVIOUR ---------- */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    const start = performance.now();
    const hide = () => {
      const wait = Math.max(0, 1100 - (performance.now() - start));
      setTimeout(() => {
        loader.classList.add('is-done');
        setTimeout(() => loader.remove(), 900);
      }, wait);
    };
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });
  }

  function initMenu() {
    const burger = $('#burger');
    const menu = $('#mobileMenu');
    menu.inert = true;
    const set = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      menu.inert = !open;
      document.body.classList.toggle('menu-open', open);
    };
    burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target === menu || e.target.closest('a[href^="#"]')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    matchMedia('(min-width: 1025px)').addEventListener('change', (e) => { if (e.matches) set(false); });
  }

  function initScroll() {
    const nav = $('#nav');
    const bar = $('#progress');
    const topBtn = $('#toTop');
    const tl = $('#timeline');
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      nav.classList.toggle('is-scrolled', y > 30);
      topBtn.classList.toggle('is-visible', y > 600);
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / r.height));
        tl.style.setProperty('--p', p.toFixed(3));
      }
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();

    topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // scroll-spy
    const links = $$('.nav-links a');
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.remove('is-active'));
        const l = map.get(en.target.id);
        if (l) l.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => spy.observe(s));
  }

  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
        onReveal(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(e));
  }

  function onReveal(el) {
    $$('[data-count]', el).forEach(countUp);
    if ($('#terminal', el)) runTerminal();
    const chat = $('#chat', el);
    if (chat) chat.classList.add('is-playing');
  }

  function countUp(el) {
    const end = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = end + suffix; return; }
    const dur = 1800;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  let terminalStarted = false;
  async function runTerminal() {
    if (terminalStarted) return;
    terminalStarted = true;
    const box = $('#terminal');
    const lines = (CFG.about && CFG.about.terminal) || [];
    const caret = document.createElement('span');
    caret.className = 'caret';
    const speed = reduceMotion ? 0 : 42;
    const prompt = '<span class="p">wahab@ai</span>:<span class="o">~</span>$ ';
    box.innerHTML = '';
    for (const l of lines) {
      const row = document.createElement('div');
      box.appendChild(row);
      if (l.t === 'cmd') {
        row.innerHTML = prompt + '<span class="c"></span>';
        const target = row.querySelector('.c');
        row.appendChild(caret);
        for (const ch of l.v) { target.textContent += ch; await sleep(speed); }
        await sleep(reduceMotion ? 0 : 260);
      } else {
        row.className = l.t === 'ok' ? 'g' : 'o';
        row.textContent = (l.t === 'ok' ? '[ OK ] ' : '') + l.v;
        await sleep(reduceMotion ? 0 : 380);
      }
    }
    const last = document.createElement('div');
    last.innerHTML = prompt;
    last.appendChild(caret);
    box.appendChild(last);
  }

  function initTyping() {
    const el = $('#typing');
    const list = CFG.typing || [];
    if (!el || !list.length) return;
    if (reduceMotion) { el.textContent = list[0]; return; }
    let i = 0, j = 0, del = false;
    (function tick() {
      const full = list[i];
      el.textContent = full.slice(0, j);
      let delay = del ? 26 : 55;
      if (!del && j === full.length) { del = true; delay = 1700; }
      else if (del && j === 0) { del = false; i = (i + 1) % list.length; delay = 380; }
      else j += del ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  function initContact() {
    const c = CFG.contact || {};
    const em = $('#cEmail');
    if (em) em.href = 'mailto:' + (c.email || '');
    const wa = $('#cWhatsapp');
    if (wa) wa.href = `https://wa.me/${c.whatsappNumber || ''}?text=${encodeURIComponent(c.whatsappText || '')}`;

    const form = $('#contactForm');
    const note = $('#formNote');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      const bad = [];
      if (!name) bad.push(form.name);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push(form.email);
      if (!msg) bad.push(form.message);
      [form.name, form.email, form.message].forEach((f) => f.classList.toggle('is-invalid', bad.includes(f)));
      if (bad.length) {
        note.textContent = 'Please fill in all fields with a valid email.';
        note.classList.add('is-error');
        bad[0].focus();
        return;
      }
      note.classList.remove('is-error');
      note.textContent = 'Opening your email app…';
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
      location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
    });
    form.addEventListener('input', (e) => e.target.classList.remove('is-invalid'));
  }

  /* ---------- 4. EFFECTS ---------- */
  function initFX() {
    const pc = $('#fx-particles');
    const cc = $('#fx-code');
    if (!pc || !cc) return;
    const p = pc.getContext('2d');
    const c = cc.getContext('2d');
    const COLORS = ['34,228,255', '139,92,246', '255,61,219'];
    const CHARS = '01{}[]<>/\\;=+*#$%&?!AIWAHABSEC'.split('');
    const FS = 15, CW = 20, LINK = 130;
    const mouse = { x: -9999, y: -9999 };
    let w = 0, h = 0, parts = [], cols = 0, drops = [], active = [];

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      [pc, cc].forEach((cv) => { cv.width = Math.floor(w * dpr); cv.height = Math.floor(h * dpr); });
      p.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(85, Math.floor((w * h) / 20000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.6, c: COLORS[(Math.random() * 3) | 0],
      }));
      cols = Math.ceil(w / CW);
      drops = Array.from({ length: cols }, () => (Math.random() * h) / FS);
      active = Array.from({ length: cols }, () => Math.random() < 0.35);
    }

    function drawParticles() {
      p.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < -10) a.x = w + 10; else if (a.x > w + 10) a.x = -10;
        if (a.y < -10) a.y = h + 10; else if (a.y > h + 10) a.y = -10;

        const mdx = a.x - mouse.x, mdy = a.y - mouse.y, md = mdx * mdx + mdy * mdy;
        if (md < 22500) {
          const d = Math.sqrt(md) || 1;
          a.x += (mdx / d) * 0.5; a.y += (mdy / d) * 0.5;
          p.strokeStyle = `rgba(${a.c},${(1 - d / 150) * 0.5})`;
          p.lineWidth = 0.7;
          p.beginPath(); p.moveTo(a.x, a.y); p.lineTo(mouse.x, mouse.y); p.stroke();
        }
        p.fillStyle = `rgba(${a.c},.85)`;
        p.beginPath(); p.arc(a.x, a.y, a.r, 0, 6.2832); p.fill();
        p.fillStyle = `rgba(${a.c},.08)`;
        p.beginPath(); p.arc(a.x, a.y, a.r * 4, 0, 6.2832); p.fill();

        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            p.strokeStyle = `rgba(${a.c},${(1 - Math.sqrt(d2) / LINK) * 0.28})`;
            p.lineWidth = 0.6;
            p.beginPath(); p.moveTo(a.x, a.y); p.lineTo(b.x, b.y); p.stroke();
          }
        }
      }
    }

    function drawRain() {
      c.globalCompositeOperation = 'destination-out';
      c.fillStyle = 'rgba(0,0,0,.14)';
      c.fillRect(0, 0, w, h);
      c.globalCompositeOperation = 'source-over';
      c.font = `${FS}px "Fira Code", monospace`;
      for (let i = 0; i < cols; i++) {
        if (!active[i]) { if (Math.random() < 0.004) active[i] = true; continue; }
        const y = drops[i] * FS;
        c.fillStyle = Math.random() < 0.08 ? 'rgba(255,255,255,.9)' : 'rgba(34,228,255,.85)';
        c.fillText(CHARS[(Math.random() * CHARS.length) | 0], i * CW, y);
        if (y > h && Math.random() > 0.96) { drops[i] = 0; if (Math.random() < 0.5) active[i] = false; }
        drops[i]++;
      }
    }

    size();
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { size(); if (reduceMotion) drawParticles(); }, 150); });
    if (finePointer) {
      addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
      document.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });
    }
    if (reduceMotion) { drawParticles(); return; }

    let last = 0;
    (function frame(t) {
      drawParticles();
      if (t - last > 50) { drawRain(); last = t; }
      requestAnimationFrame(frame);
    })(0);
  }

  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');
    let x = -100, y = -100, rx = x, ry = y, started = false;
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      if (!started) {            // show custom cursor only after the mouse really moves
        started = true; rx = x; ry = y;
        document.documentElement.classList.add('cursor-on');
      }
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', (e) => {
      ring.classList.toggle('is-hover', !!e.target.closest('a, button, input, textarea, label, .tilt'));
    });
    addEventListener('pointerdown', () => ring.classList.add('is-down'));
    addEventListener('pointerup', () => ring.classList.remove('is-down'));
  }

  function initTilt() {
    if (!finePointer || reduceMotion) return;
    $$('.tilt').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        el.style.setProperty('--ry', ((px - 0.5) * 9).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - py) * 9).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });
  }

  function initAvatarParallax() {
    if (!finePointer || reduceMotion) return;
    const hero = $('#home');
    const av = $('#avatar');
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      av.style.setProperty('--px', (nx * 18).toFixed(1) + 'px');
      av.style.setProperty('--py', (ny * 14).toFixed(1) + 'px');
    });
    hero.addEventListener('pointerleave', () => { av.style.setProperty('--px', '0px'); av.style.setProperty('--py', '0px'); });
  }

  /* ---------- BOOT ---------- */
  function init() {
    initLoader();
    bindConfig();
    renderSocials();
    renderAbout();
    renderSkills();
    renderProjects();
    renderServices();
    renderJourney();
    renderAI();
    injectIcons();
    initMenu();
    initScroll();
    initReveal();
    initTyping();
    initContact();
    initFX();
    initCursor();
    initTilt();
    initAvatarParallax();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
