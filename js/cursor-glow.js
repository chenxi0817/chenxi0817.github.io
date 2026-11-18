/* ══════════════════════════════════════
   cursor-glow.js — 鼠标跟随光效（lerp 拖尾）
   触摸设备 / reduced-motion 不启用
   ══════════════════════════════════════ */

function initCursorGlow() {
  const el = document.getElementById('cursor-glow');
  if (!el) return;
  if (matchMedia('(pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let tx = innerWidth / 2, ty = innerHeight / 2; // 目标
  let x = tx, y = ty;                            // 当前

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    el.classList.add('visible');
  }, { passive: true });

  document.addEventListener('mouseleave', () => el.classList.remove('visible'));
  document.addEventListener('mouseenter', () => el.classList.add('visible'));

  // 悬停交互元素时光效增亮
  document.addEventListener('mouseover', (e) => {
    const interactive = e.target.closest('a, button, .project-card, .skill-chip');
    el.classList.toggle('bright', !!interactive);
  }, { passive: true });

  function step() {
    x += (tx - x) * .08;
    y += (ty - y) * .08;
    el.style.transform = `translate3d(${x - 210}px, ${y - 210}px, 0)`;
  }

  if (window.TICKER) window.TICKER.add(step);
  else (function loop() { step(); requestAnimationFrame(loop); })();
}
