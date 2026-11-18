/* ══════════════════════════════════════
   tilt-card.js — 项目卡片 3D tilt + 指针辉光
   触摸设备与 reduced-motion 不启用（CSS 已提供上浮替代）
   ══════════════════════════════════════ */

function initTiltCards(selector) {
  if (matchMedia('(pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const MAX_TILT = 9; // 度

  document.querySelectorAll(selector).forEach((card) => {
    let raf = null;
    let targetRX = 0, targetRY = 0;

    card.style.transition = 'transform .12s ease-out, box-shadow .4s, border-color .4s';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;   // 0~1
      const ny = (e.clientY - rect.top) / rect.height;

      targetRY = (nx - .5) * 2 * MAX_TILT;
      targetRX = -(ny - .5) * 2 * MAX_TILT;

      // 辉光层跟随指针（CSS 变量驱动 radial-gradient）
      card.style.setProperty('--mx', `${nx * 100}%`);
      card.style.setProperty('--my', `${ny * 100}%`);

      if (raf) return;
      raf = requestAnimationFrame(() => {
        card.style.transform = `rotateX(${targetRX.toFixed(2)}deg) rotateY(${targetRY.toFixed(2)}deg) translateZ(6px)`;
        raf = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .55s cubic-bezier(.16,1,.3,1), box-shadow .4s, border-color .4s';
      card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}
