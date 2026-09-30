import { site } from "../data/content";
import coverImage from "../assets/the-book-of-shorts-cover-new.jpg";

export default function BookMockup() {
  return (
    <div
      className="group relative mx-auto w-56 [perspective:1200px] sm:w-64 lg:w-72"
      role="img"
      aria-label={`${site.title} book cover by ${site.author}`}
    >
      {/* Warm ambient glow + ground shadow */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-amber-200/[0.07] blur-3xl" />
      <div className="absolute -bottom-6 left-4 right-2 h-6 rounded-[50%] bg-black/80 blur-xl" />

      {/* 3D Rotated Wrapper */}
      <div className="relative aspect-[2/3] transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(-16deg)_rotateX(3deg)] group-hover:[transform:rotateY(-6deg)_rotateX(1deg)] motion-reduce:transition-none">
        {/* Book pages thickness block */}
        <div className="absolute inset-y-1 -right-2 left-2 rounded-r-sm bg-[repeating-linear-gradient(90deg,#d6d3d1_0,#d6d3d1_1px,#e7e5e4_1px,#e7e5e4_3px)]" />

        {/* Cover Container */}
        <div className="relative h-full w-full overflow-hidden rounded-l-sm rounded-r-md border border-white/[0.08] shadow-2xl shadow-black/80 ring-1 ring-inset ring-white/[0.04]">
          {/* Your flat cover image */}
          <img
            src={coverImage}
            alt={`${site.title} by ${site.author}`}
            className="h-full w-full object-cover"
          />

          {/* Matte sheen overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-black/30" />

          {/* Spine crease and lighting highlight */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-3 w-px bg-black/40" />
        </div>
      </div>
    </div>
  );
}