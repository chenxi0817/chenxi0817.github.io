/* ══════════════════════════════════════
   scroll-reveal.js — IntersectionObserver 滚动渐显
   [data-reveal] 一次性渐显，--i 控制错峰延迟
   同时驱动：技能辉光条、Timeline 节点脉冲
   ══════════════════════════════════════ */

function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  items.forEach((el) => io.observe(el));
}

/* 给动态生成的网格子项批量打上 data-reveal 与错峰序号 */
function markReveal(container, childSelector) {
  if (!container) return;
  container.querySelectorAll(childSelector).forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.setProperty('--i', i);
  });
}
