// count-up.ts
//
// Auto-discovers any element with `[data-count]` and animates the inner
// `.counter-value` element from 0 up to the integer value in `data-count`
// when the element scrolls into view. Used on the homepage stat tiles
// and reusable on any page that drops in a count-up element.
//
// Markup contract:
//   <div data-count="500">
//     <span class="counter-value">500</span><span>+</span>
//   </div>
//
// Reduced-motion users get the final number immediately (no animation).

const PREFERS_REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animate(el: HTMLElement) {
  const target = parseInt(el.dataset.count || '0', 10);
  const valueEl = el.querySelector('.counter-value');
  if (!valueEl) return;
  if (Number.isNaN(target)) return;

  if (PREFERS_REDUCED_MOTION) {
    valueEl.textContent = String(target);
    return;
  }

  const duration = 1200;
  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(ease(progress) * target);
    valueEl.textContent = String(current);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function init() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (els.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    // Older browsers — just write the final value
    els.forEach((el) => {
      const valueEl = el.querySelector('.counter-value');
      if (valueEl) valueEl.textContent = el.dataset.count || '';
    });
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target as HTMLElement);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  els.forEach((el) => obs.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
