document.addEventListener('DOMContentLoaded', () => {
  const animatedItems = Array.from(document.querySelectorAll('[data-animate]'));

  if (!animatedItems.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    animatedItems.forEach((item) => {
      item.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const direction = element.dataset.animate;

        element.classList.add('visible', direction);
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.2
  });

  animatedItems.forEach((item) => {
    item.classList.add('animate-before');
    observer.observe(item);
  });
});
