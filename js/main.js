/* ══════════════════════════════════════
   main.js — 渲染入口 + 时序编排 + 导航逻辑
   时序：TICKER 就绪 → 渲染 DOM → 初始化各动效
   ══════════════════════════════════════ */

document.documentElement.classList.add('js');

/* ── 全局共享 rAF ticker（粒子/光效共用一个循环，页面隐藏时暂停） ── */
window.TICKER = (() => {
  const callbacks = [];
  let running = false;

  function loop() {
    if (!running) return;
    for (const fn of callbacks) fn();
    requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { running = false; }
    else if (!running && callbacks.length) { running = true; requestAnimationFrame(loop); }
  });

  return {
    add(fn) {
      callbacks.push(fn);
      if (!running) { running = true; requestAnimationFrame(loop); }
    },
  };
})();

/* ── 工具 ── */
function esc(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

const ICONS = {
  github: '<svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  scholar: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3Zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9ZM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>',
  zhihu: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M5.72 5.6h4.55c0 1.2-.06 2.6-.19 4.2H9.1l.11-.5c.2-.9.3-1.7.35-2.4H7.2c-.14 4 .35 7 1.4 9 .65 1.2 1.5 2.3 2.6 3.23l-.87 1.06A12.6 12.6 0 0 1 7.1 16.5 14 14 0 0 1 5.9 5.9zm9.4 10.53h3.6l-1 2.6-.87-.4v-2.2Zm4.4-10.5v1.36h-1.6c.1 4.14.2 6.3.33 6.53.06.1.13.16.2.16.14 0 .35-.3.63-.93l1.13.8c-.5 1-1.03 1.47-1.63 1.47-.33 0-.63-.2-.93-.57-.47-.6-.83-2.4-1.07-5.46h-.07v6.2h1.4l-.99 2.35-.02 1.67h-1.4V17.6l-1-2.26h1.2V6.96h-2.87c.7-.7 1.23-1.4 1.6-2.13l-1.4-.53c-.3.63-.75 1.3-1.33 2h-1.47L11.9 4.1l-1.3-.43-.27 1.1H7.4v1.36h2.72l-.32 3.6-1.13-1.27.03-.8H7.4l-.03 1.9 1.87 2-.13.13h-1.6V5.6H4.4v10.13h3.1v-.4l1.6-1.73 1.9 2.5 1.2-.9-1.3-1.7.8-.9h6.47l1.53-3.6v3.6H21V5.63h-1.48Z"/></svg>',
  demo: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
  paper: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6"/></svg>',
  code: '<svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
};

/* ══════════ 渲染 ══════════ */

function renderAbout(profile) {
  document.getElementById('about-paras').innerHTML =
    profile.aboutParas.map((p) => `<p>${p}</p>`).join(''); // aboutParas 为可信手写内容（允许内嵌 <strong>/<span>）

  document.getElementById('about-facts').innerHTML =
    profile.facts.map((f) => `<li><b>${esc(f.label)}</b> · ${esc(f.value)}</li>`).join('');
}

function renderSkills(skills) {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = skills.map((group, gi) => `
    <div class="skill-card" data-reveal style="--i:${gi}">
      <h3>${esc(group.group)}</h3>
      <div class="skill-list">
        ${group.items.map((s) => `
          <div class="skill-chip" style="--level:${s.level}">
            <span class="skill-name">${esc(s.name)}${s.note ? `<em>${esc(s.note)}</em>` : ''}</span>
            <span class="skill-bar"><b></b></span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map((p, i) => {
    const links = [];
    if (p.links?.demo) links.push(`<a href="${esc(p.links.demo)}" target="_blank" rel="noopener">${ICONS.demo}<span>Demo</span></a>`);
    if (p.links?.paper) links.push(`<a href="${esc(p.links.paper)}" target="_blank" rel="noopener">${ICONS.paper}<span>Paper</span></a>`);
    if (p.links?.code) links.push(`<a href="${esc(p.links.code)}" target="_blank" rel="noopener">${ICONS.code}<span>Code</span></a>`);

    return `
    <article class="project-card" data-reveal style="--i:${i}">
      <span class="pc-top-edge"></span>
      <div class="pc-img">
        <img src="${esc(p.img)}" alt="${esc(p.title)} 项目截图" loading="lazy">
        <span class="pc-glow"></span>
        ${p.badge ? `<span class="pc-badge ${esc(p.badgeStyle || '')}">${esc(p.badge)}</span>` : ''}
      </div>
      <div class="pc-body">
        <h3>${esc(p.title)}</h3>
        <p class="pc-sub">${esc(p.subtitle || '')}</p>
        <p class="pc-desc">${esc(p.desc)}</p>
        <ul class="pc-tags">${(p.techTags || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        ${links.length ? `<div class="pc-links">${links.join('')}</div>` : ''}
      </div>
    </article>`;
  }).join('');
}

function renderTimeline(timeline) {
  const root = document.getElementById('timeline');
  root.innerHTML = timeline.map((t, i) => {
    const side = i % 2 === 1 ? 'right' : 'left';
    return `
    <div class="timeline-item ${side}" data-reveal style="--i:${i}">
      <span class="t-dot"></span>
      <div class="t-card">
        <span class="t-period">${esc(t.period)}</span>
        <h3>${esc(t.title)}</h3>
        <p class="t-org">${esc(t.org || '')}</p>
        ${t.detail ? `<p>${esc(t.detail)}</p>` : ''}
      </div>
    </div>`;
  }).join('');
}

function renderContact(profile, social) {
  const box = document.getElementById('contact-actions');
  box.innerHTML = `
    <a class="contact-mail" href="mailto:${esc(profile.email)}">
      ${ICONS.mail}<span>${esc(profile.email)}</span>
    </a>
    <div class="social-icons">
      ${social.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${ICONS[s.iconKey] || ICONS.mail}</a>`).join('')}
    </div>`;
}

/* ══════════ 导航 ══════════ */

function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  // 滚动 >40px 加 .scrolled（rAF 节流）
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      ticking = false;
    });
  }, { passive: true });

  // 移动端汉堡菜单
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  // 当前 section 高亮（仅桌面横向导航可见时有意义，移动端也无害）
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    }
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((s) => io.observe(s));
}

function initBackToTop() {
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
}

/* ══════════ 启动 ══════════ */

document.addEventListener('DOMContentLoaded', () => {
  const C = SITE_CONTENT;

  // 1) 渲染全部内容
  document.getElementById('nav-github').href =
    C.social.find((s) => s.iconKey === 'github')?.url || document.getElementById('nav-github').href;
  renderAbout(C.profile);
  renderSkills(C.skills);
  renderProjects(C.projects);
  renderTimeline(C.timeline);
  renderContact(C.profile, C.social);
  document.getElementById('footer-copy').textContent =
    `© ${new Date().getFullYear()} ${C.profile.name} · ${C.profile.nameEn}`;

  // 2) 初始化导航类交互
  initNav();
  initBackToTop();

  // 3) 初始化动效（必须在 DOM 渲染完成之后）
  initScrollReveal();
  initParticleBackground(document.getElementById('particle-canvas'));
  initCursorGlow();
  initTypewriter(document.getElementById('typewriter-text'), C.profile.heroRoles);
  initTiltCards('.project-card');
});
