"use client";

import { useEffect, useRef, useState } from "react";
import DecorativeSidebar from "./DecorativeSidebar";

// Fallback used only if the browser doesn't support the `scrollend` event.
const TRANSITION_FALLBACK_MS = 700;

export default function SlideShow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const navigateRef = useRef<
    (index: number, enterFrom: "top" | "bottom") => void
  >(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = Array.from(
      container.querySelectorAll<HTMLElement>("[data-slide]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number(entry.target.getAttribute("data-slide"));
            activeRef.current = index;
            setActive(index);
          }
        });
      },
      { root: container, threshold: [0.5] }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  // Wheel/touch driven navigation. A slide only advances once its own
  // content has been scrolled to the relevant edge - while it still has
  // room to scroll internally, the gesture is applied to the slide's own
  // scrollTop instead of letting the browser's native scroll-snap decide,
  // since scroll-snap can otherwise hijack a fast wheel/touch gesture and
  // jump to the next slide before the nested content finishes scrolling.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSlide = (index: number) =>
      container.querySelector<HTMLElement>(`[data-slide="${index}"]`);
    const slideCount = container.querySelectorAll("[data-slide]").length;

    const finishTransition = () => {
      isAnimatingRef.current = false;
    };

    const navigate = (index: number, enterFrom: "top" | "bottom") => {
      if (index < 0 || index >= slideCount || isAnimatingRef.current) return;
      const target = getSlide(index);
      if (!target) return;

      if (target.scrollHeight > target.clientHeight) {
        target.scrollTop =
          enterFrom === "top" ? 0 : target.scrollHeight - target.clientHeight;
      }

      isAnimatingRef.current = true;
      activeRef.current = index;
      setActive(index);
      container.addEventListener("scrollend", finishTransition, {
        once: true,
      });
      window.setTimeout(finishTransition, TRANSITION_FALLBACK_MS);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    navigateRef.current = navigate;

    const attemptStep = (direction: 1 | -1, rawDelta: number) => {
      const current = getSlide(activeRef.current);
      if (!current) return;

      const maxScroll = current.scrollHeight - current.clientHeight;
      const canScrollWithin =
        direction > 0
          ? current.scrollTop < maxScroll - 1
          : current.scrollTop > 1;

      if (canScrollWithin) {
        current.scrollTop = Math.max(
          0,
          Math.min(maxScroll, current.scrollTop + rawDelta)
        );
        return;
      }

      navigate(activeRef.current + direction, direction > 0 ? "top" : "bottom");
    };

    const onWheel = (event: WheelEvent) => {
      // A horizontally-dominant gesture (e.g. a trackpad swipe over a
      // horizontal carousel) is none of our business - let it hit whatever
      // nested horizontally-scrollable element the browser would normally
      // deliver it to.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;
      event.preventDefault();
      if (isAnimatingRef.current) return;
      attemptStep(event.deltaY > 0 ? 1 : -1, event.deltaY);
    };

    // Some slides contain their own horizontally-scrollable content (e.g.
    // the portfolio carousel). A real finger drag almost never moves on a
    // single axis, so we can't just look at deltaY: we wait for the touch
    // to clear a small dead-zone, lock the gesture to whichever axis moved
    // further, and for a horizontal-locked gesture we do nothing at all for
    // the rest of it - no preventDefault, no slide logic - so the browser's
    // native handling of the nested element takes over exactly as if we
    // weren't here.
    const AXIS_LOCK_THRESHOLD = 10;
    let touchStart: { x: number; y: number } | null = null;
    let touchLastY = 0;
    let gestureAxis: "vertical" | "horizontal" | null = null;

    const resetTouch = () => {
      touchStart = null;
      gestureAxis = null;
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        resetTouch();
        return;
      }
      const t = event.touches[0];
      touchStart = { x: t.clientX, y: t.clientY };
      touchLastY = t.clientY;
      gestureAxis = null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 1 || !touchStart) return;
      const t = event.touches[0];

      if (gestureAxis === null) {
        const dx = t.clientX - touchStart.x;
        const dy = t.clientY - touchStart.y;
        if (Math.abs(dx) < AXIS_LOCK_THRESHOLD && Math.abs(dy) < AXIS_LOCK_THRESHOLD) {
          return;
        }
        gestureAxis = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
        touchLastY = t.clientY;
      }

      if (gestureAxis === "horizontal") return;

      const currentY = t.clientY;
      const delta = touchLastY - currentY;
      if (delta === 0) return;

      event.preventDefault();
      touchLastY = currentY;
      if (isAnimatingRef.current) return;
      attemptStep(delta > 0 ? 1 : -1, delta);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", resetTouch, { passive: true });
    container.addEventListener("touchcancel", resetTouch, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", resetTouch);
      container.removeEventListener("touchcancel", resetTouch);
      container.removeEventListener("scrollend", finishTransition);
    };
  }, []);

  const goToSlide = (index: number) => {
    navigateRef.current(index, "top");
  };

  return (
    <>
      <DecorativeSidebar activeIndex={active} onNavigate={goToSlide} />
      <div
        ref={containerRef}
        className="h-dvh w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        {children}
      </div>
    </>
  );
}
