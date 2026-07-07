"use client";

import { useState } from "react";

const VIDEOS = ["/videos/bg-1.mp4", "/videos/bg-2.mp4", "/videos/bg-3.mp4"];

export default function CertsDivider() {
  const [src] = useState(() => VIDEOS[Math.floor(Math.random() * VIDEOS.length)]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        suppressHydrationWarning
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  );
}
