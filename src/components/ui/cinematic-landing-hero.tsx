import { useEffect, useRef, type ReactNode } from "react";
import school from "@/assets/school-campus.jpg";

// Supplied GSAP introduction, perspective and sheen, adapted to the school's
// actual presentation rather than a scroll-pinned app-store advertisement.
export function CinematicHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(".hero-reveal", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.13, duration: 1.2, ease: "expo.out" });
        gsap.fromTo(".hero-photograph", { scale: 1.055 }, { scale: 1, duration: 4, ease: "power2.out" });
      }, container);
      cleanup = () => ctx.revert();
    });
    return () => { cancelled = true; cleanup?.(); };
  }, []);
  return <div ref={ref} className="cinematic-hero">
    <img className="hero-photograph" src={school} alt="An illustrative secondary school campus at dawn" width={1920} height={1088} fetchPriority="high" />
    <div className="hero-shade" aria-hidden="true" />
    <div className="film-grain" aria-hidden="true" />
    <div className="hero-content">{children}</div>
    <div className="hero-caption">ST ANTHONY’S SCHOOL <span>AN ORGANISATION. REIMAGINED.</span></div>
  </div>;
}