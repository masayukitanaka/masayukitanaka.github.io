import { useEffect } from "react";

/**
 * Scroll-driven interactions from the Portfolio 2a handoff, adapted to
 * window scroll (the site scrolls the document, not an inner container):
 *
 * - [data-speed]  : hero parallax, translateY(scrollY * speed).
 * - [data-pspeed] : element-level thumbnail parallax. Moves by
 *                   -off * pspeed where off is the distance between the
 *                   element's parent center and the viewport center,
 *                   clamped to the element's overflow so no gap shows.
 * - [data-reveal] : fade + rise in when the element's top crosses 92% of
 *                   the viewport height.
 *
 * All effects are disabled when prefers-reduced-motion: reduce.
 * Scroll handling is rAF-throttled and passive.
 */
export function useScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (reduce) {
      // Ensure revealed elements are visible and nothing is transformed.
      reveals.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    reveals.forEach((el) => {
      el.style.transition =
        "opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1)";
    });

    const speeds = Array.from(
      document.querySelectorAll<HTMLElement>("[data-speed]")
    );
    const pspeeds = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pspeed]")
    );

    const update = () => {
      const st = window.scrollY;
      const h = window.innerHeight;

      speeds.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        el.style.transform = `translate3d(0,${st * speed}px,0)`;
      });

      pspeeds.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const off = r.top + r.height / 2 - h / 2;
        const ovTop = Math.max(0, -el.offsetTop);
        const ovBot = Math.max(
          0,
          el.offsetTop + el.offsetHeight - parent.clientHeight
        );
        const speed = parseFloat(el.dataset.pspeed || "0");
        const y = Math.max(-ovBot, Math.min(ovTop, -off * speed));
        el.style.transform = `translate3d(0,${y}px,0)`;
      });

      reveals.forEach((el) => {
        const r = el.getBoundingClientRect();
        const vis = r.top < h * 0.92;
        el.style.opacity = vis ? "1" : "0";
        el.style.transform = vis ? "none" : "translateY(40px)";
      });
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/**
 * Highlights the active table-of-contents item as sections scroll past.
 * Sets each matching [data-toc] element's color via IntersectionObserver.
 */
export function useActiveSection(ids: string[]) {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const setActive = (id: string) => {
      document.querySelectorAll<HTMLElement>("[data-toc]").forEach((el) => {
        el.style.color =
          el.dataset.toc === id
            ? "var(--color-ink)"
            : "var(--color-text-sub)";
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-55px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);
}
