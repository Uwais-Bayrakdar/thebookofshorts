import { useState, useRef, useEffect } from "react";
import { site } from "../data/content";
import fullWrapImage from "../assets/book-cover-wrap.jpg";
import { X, BookOpen } from "lucide-react";

export default function BookMockup() {
  const [rotY, setRotY] = useState(35);
  const [rotX, setRotX] = useState(9);
  const [isDragging, setIsDragging] = useState(false);
  const [showBackText, setShowBackText] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotY: -22, rotX: 6 });

  const thickness = 20; // Slim, realistic spine depth
  const halfThickness = thickness / 2;

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    dragStart.current = { x: clientX, y: clientY, rotY, rotX };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    setRotY(dragStart.current.rotY + deltaX * 0.45);
    const nextRotX = Math.max(-25, Math.min(25, dragStart.current.rotX - deltaY * 0.25));
    setRotX(nextRotX);
  };

  useEffect(() => {
    const onUp = () => setIsDragging(false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  return (
    <div className="flex flex-col items-center select-none">
      {/* 3D Viewport Stage */}
      <div
        className="relative mx-auto w-56 [perspective:1200px] sm:w-64 lg:w-72 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* Glow & Ground Shadow */}
        <div className="absolute -inset-10 -z-10 rounded-full bg-red-950/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-6 right-6 h-8 rounded-[50%] bg-black/85 blur-xl pointer-events-none" />

        {/* 3D Container */}
        <div
          className={`relative aspect-[2/3] w-full [transform-style:preserve-3d] ${
            isDragging ? "" : "transition-transform duration-300 ease-out"
          }`}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* Front Cover */}
          <div
            className="absolute inset-0 rounded-r-md border border-white/10 bg-zinc-950 shadow-2xl [backface-visibility:hidden]"
            style={{
              transform: `translateZ(${halfThickness}px)`,
              backgroundImage: `url(${fullWrapImage})`,
              backgroundSize: "207% 100%",
              backgroundPosition: "right center",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/50 to-transparent" />
          </div>

          {/* Back Cover */}
          <div
            className="absolute inset-0 rounded-l-md border border-white/10 bg-zinc-950 shadow-2xl [backface-visibility:hidden]"
            style={{
              transform: `rotateY(180deg) translateZ(${halfThickness}px)`,
              backgroundImage: `url(${fullWrapImage})`,
              backgroundSize: "207% 100%",
              backgroundPosition: "left center",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-black/25 via-transparent to-white/10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-2.5 bg-gradient-to-l from-black/50 to-transparent" />
          </div>

          {/* Spine */}
          <div
            className="absolute inset-y-0 left-0 border-y border-white/10 shadow-inner overflow-hidden bg-[#e11d48]"
            style={{
              width: `${thickness}px`,
              transform: `translateX(-${halfThickness}px) rotateY(-90deg)`,
              backgroundImage: `url(${fullWrapImage})`,
              backgroundSize: "4800% 100%",
              backgroundPosition: "50% center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
          </div>

          {/* Pages edges */}
          <div
            className="absolute inset-y-1 right-0 rounded-r-xs bg-[repeating-linear-gradient(90deg,#e5e5e5_0,#e5e5e5_1px,#d4d4d4_1px,#d4d4d4_2px)] shadow-inner"
            style={{
              width: `${thickness}px`,
              transform: `translateX(${halfThickness}px) rotateY(90deg)`,
            }}
          />
          <div
            className="absolute top-0 inset-x-1 bg-[repeating-linear-gradient(0deg,#e5e5e5_0,#e5e5e5_1px,#d4d4d4_1px,#d4d4d4_2px)] shadow-inner"
            style={{
              height: `${thickness}px`,
              transform: `translateY(-${halfThickness}px) rotateX(90deg)`,
            }}
          />
          <div
            className="absolute bottom-0 inset-x-1 bg-[repeating-linear-gradient(0deg,#d4d4d4_0,#d4d4d4_1px,#a3a3a3_1px,#a3a3a3_2px)] shadow-inner"
            style={{
              height: `${thickness}px`,
              transform: `translateY(${halfThickness}px) rotateX(-90deg)`,
            }}
          />
        </div>
      </div>

      {/* Controls / Hints below book */}
      <div className="mt-6 flex flex-col items-center gap-2.5">
        <span className="text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
          Drag to rotate 360°
        </span>
        <button
          type="button"
          onClick={() => setShowBackText(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          <BookOpen className="h-3.5 w-3.5 text-amber-200/80" />
          Read back cover text
        </button>
      </div>

      {/* Modal Dialog for Back Cover Content */}
      {showBackText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setShowBackText(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-500">
              Back Cover
            </span>

            <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
              STOP SCROLLING. START EXECUTING.
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>
                In an era of fractured attention spans and constant digital noise,{" "}
                <span className="text-zinc-100 font-medium">The Book of Shorts</span> delivers
                40 short chapters designed to fit into your day—not disrupt it.
              </p>
              <p className="text-zinc-400 text-xs">
                Written for practical action rather than abstract theory, each entry cuts through
                the clutter to deliver sharp, direct principles you can read in under three minutes
                and apply immediately.
              </p>
            </div>

            <div className="mt-5 border-t border-zinc-900 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Inside, you will discover:
              </h4>
              <ul className="mt-2 space-y-2 text-xs text-zinc-300">
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>How to build unbreakable discipline without relying on fleeting motivation.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Practical mental models to eliminate digital distraction and reset baseline focus.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Small, compounding habits that convert daily contemplation into physical momentum.</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 border-l-2 border-red-500/70 pl-3 py-0.5">
              <p className="text-[11px] font-semibold text-zinc-200">About the Author</p>
              <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                {site.author} writes at the intersection of discipline, systems thinking, and mental clarity.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}