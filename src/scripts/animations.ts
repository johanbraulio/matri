export {};
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (document.documentElement.dataset.motion === 'on' && !reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(element => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      document.querySelectorAll('.reveal-ready').forEach(element => element.classList.add('is-visible'));
      observer.disconnect();
    }
  });
}
