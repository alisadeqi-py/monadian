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
  >(() => { });

  // Cached measurements for the active slide so the hot wheel/touch path
  // never has to query the DOM or force a synchronous layout read
  // (scrollHeight/clientHeight/scrollTop) on every single event - that
  // read-after-write pattern ("layout thrashing") is what causes scroll
  // jank. maxScroll is measured once when a slide becomes active; scrollPos
  // is then tracked purely in memory and only ever written to the DOM.
  const activeSlideElRef = useRef<HTMLElement | null>(null);
  const maxScrollRef = useRef(0);
  const scrollPosRef = useRef(0);

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

            const el = entry.target as HTMLElement;
            activeSlideElRef.current = el;
            maxScrollRef.current = el.scrollHeight - el.clientHeight;
            scrollPosRef.current = el.scrollTop;
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

      const targetMax = target.scrollHeight - target.clientHeight;
      if (targetMax > 0) {
        target.scrollTop = enterFrom === "top" ? 0 : targetMax;
      }
      activeSlideElRef.current = target;
      maxScrollRef.current = targetMax;
      scrollPosRef.current = target.scrollTop;

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

    // Coalesce scrollTop writes to at most once per animation frame so a
    // burst of touchmove/wheel events doesn't trigger a style write (and
    // the browser's layout/paint work that follows it) more often than the
    // screen can actually show.
    let writeScheduled = false;
    const scheduleScrollWrite = () => {
      if (writeScheduled) return;
      writeScheduled = true;
      requestAnimationFrame(() => {
        writeScheduled = false;
        const el = activeSlideElRef.current;
        if (el) el.scrollTop = scrollPosRef.current;
      });
    };

    const attemptStep = (direction: 1 | -1, rawDelta: number) => {
      const current = activeSlideElRef.current;
      if (!current) return;

      const maxScroll = maxScrollRef.current;
      const pos = scrollPosRef.current;
      const canScrollWithin =
        direction > 0 ? pos < maxScroll - 1 : pos > 1;

      if (canScrollWithin) {
        scrollPosRef.current = Math.max(0, Math.min(maxScroll, pos + rawDelta));
        scheduleScrollWrite();
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
    // the portfolio carousel), which has no touch handling of its own - it
    // relies on the browser's native horizontal pan. So we can't just look
    // at deltaY: the very first touchmove of a gesture decides whether it's
    // horizontal (hand off to native handling for the rest of the gesture,
    // no preventDefault at all) or vertical (ours to drive).
    //
    // That decision has to happen on literally the first touchmove sample,
    // not after a multi-event "dead zone": browsers finalize whether a
    // touch sequence is a native scroll based on whether its FIRST touchmove
    // event was prevented. Skip preventDefault on even one early event while
    // "waiting to see more movement" and the browser commits to natively
    // scrolling the outer container - every later preventDefault() call in
    // that gesture is then silently ignored (cancelable=false), so our
    // JS-driven slide scroll ends up fighting the browser's own native
    // scroll for the same gesture, which is exactly the glitchy motion this
    // is meant to avoid.
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
        if (dx === 0 && dy === 0) return; // no movement yet to judge by
        gestureAxis = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      }

      if (gestureAxis === "horizontal") return;

      event.preventDefault();
      const currentY = t.clientY;
      const delta = touchLastY - currentY;
      touchLastY = currentY;
      if (delta === 0 || isAnimatingRef.current) return;
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

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere with typing in inputs/textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const slideCount = containerRef.current?.querySelectorAll("[data-slide]").length || 0;

      // Navigate to next slide
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = Math.min(activeRef.current + 1, slideCount - 1);
        if (nextIndex !== activeRef.current) {
          navigateRef.current(nextIndex, "top");
        }
      }
      // Navigate to previous slide
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex = Math.max(activeRef.current - 1, 0);
        if (prevIndex !== activeRef.current) {
          navigateRef.current(prevIndex, "bottom");
        }
      }
      // Go to first slide
      else if (event.key === "Home") {
        event.preventDefault();
        if (activeRef.current !== 0) {
          navigateRef.current(0, "top");
        }
      }
      // Go to last slide
      else if (event.key === "End") {
        event.preventDefault();
        const lastIndex = slideCount - 1;
        if (activeRef.current !== lastIndex) {
          navigateRef.current(lastIndex, "top");
        }
      }
    };

    // Add keyboard listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        tabIndex={0}
        role="region"
        aria-label="Slideshow navigation"
      >
        {children}
      </div>
    </>
  );
}

export function Slide({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slide={index}
      className="h-dvh w-full snap-start overflow-y-auto"
      style={{ scrollSnapStop: "always" }}
    >
      {children}
    </div>
  );
}