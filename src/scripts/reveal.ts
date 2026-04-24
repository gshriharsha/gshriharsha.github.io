export function initReveal(selector = ".reveal"): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (elements.length === 0) return;

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );

  elements.forEach((el) => observer.observe(el));
}
