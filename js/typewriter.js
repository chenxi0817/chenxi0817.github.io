/* ══════════════════════════════════════
   typewriter.js — Hero 打字机副标题
   setTimeout 链状态机：打出 → 停留 → 删除 → 下一条
   ══════════════════════════════════════ */

function initTypewriter(el, roles) {
  if (!el || !roles || !roles.length) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = roles[0];
    return;
  }

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeSpeed() {
    // 中文比英文稍慢更具节奏
    const ch = roles[roleIdx][charIdx] || '';
    const base = /[一-龥]/.test(ch) ? 120 : 60;
    return base + Math.random() * 60;
  }

  function tick() {
    const full = roles[roleIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = full.slice(0, charIdx);
      if (charIdx >= full.length) {
        deleting = true;
        setTimeout(tick, 1800); // 停顿
        return;
      }
      setTimeout(tick, typeSpeed());
    } else {
      charIdx--;
      el.textContent = full.slice(0, charIdx);
      if (charIdx <= 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40); // 删除更快
    }
  }

  setTimeout(tick, 600);
}
