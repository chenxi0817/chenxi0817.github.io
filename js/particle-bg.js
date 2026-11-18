/* ══════════════════════════════════════
   particle-bg.js — Canvas 粒子连线背景
   全局共享 TICKER（由 main.js 提供），本模块只注册绘制回调
   ══════════════════════════════════════ */

function initParticleBackground(canvas) {
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  let w = 0, h = 0, dpr = 1;
  let particles = [];
  const mouse = { x: -9999, y: -9999 };

  const CYAN = [34, 211, 238];
  const PURPLE = [168, 85, 247];
  const LINK_DIST = 130;
  const MOUSE_DIST = 120;

  function build() {
    const area = w * h;
    let count = Math.max(30, Math.min(110, Math.floor(area / 16000)));
    if (coarse || w < 768) count = Math.floor(count / 2);
    particles = [];
    for (let i = 0; i < count; i++) {
      const c = i % 3 === 0 ? PURPLE : CYAN; // 1/3 紫、2/3 青
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: 1 + Math.random() * 1.6,
        c,
        a: .25 + Math.random() * .4,
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    // 更新位置（边缘回绕）
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
    }

    // 粒子间连线 O(n²)，n ≤ 110
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          const d = Math.sqrt(d2);
          const alpha = (1 - d / LINK_DIST) * .18;
          ctx.strokeStyle = `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // 鼠标交互（仅精细指针设备）
    if (!coarse) {
      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          const d = Math.sqrt(d2) || 1;
          const alpha = (1 - d / MOUSE_DIST) * .35;
          ctx.strokeStyle = `rgba(${PURPLE[0]},${PURPLE[1]},${PURPLE[2]},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // 粒子点
    for (const p of particles) {
      ctx.globalAlpha = p.a;
      ctx.fillStyle = `rgb(${p.c[0]},${p.c[1]},${p.c[2]})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); if (reducedMotion) step(); }, 200);
  });

  if (!coarse) {
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; }, { passive: true });
  }

  resize();

  if (reducedMotion) {
    // 只静态绘制一帧
    step();
    return;
  }

  if (window.TICKER) {
    window.TICKER.add(step);
  } else {
    // 兜底：独立 rAF（TICKER 未就绪时不应发生）
    (function loop() { step(); requestAnimationFrame(loop); })();
  }
}
