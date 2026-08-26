import React from "react";

type LogoProps = {
  /** "light" = white mark on dark background. "dark" = indigo mark on light background. */
  variant?: "light" | "dark";
  withWordmark?: boolean;
  className?: string;
  markSize?: number;
};

/**
 * AVENIQTECH brand mark + wordmark.
 * The symbol is a geometric "A/V" monogram: a peaked A split by a long
 * diagonal stroke with a violet accent, echoing the uploaded logo.
 */
export default function Logo({
  variant = "dark",
  withWordmark = true,
  className = "",
  markSize = 36,
}: LogoProps) {
  const isLight = variant === "light";
  const markColor = isLight ? "#FFFFFF" : "#2D1B69";
  const accent = isLight ? "#A855F7" : "#7C3AED";
  const wordColor = isLight ? "#FFFFFF" : "#2D1B69";
  const techColor = isLight ? "#A855F7" : "#7C3AED";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="aveniq-grad" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={markColor} />
          </linearGradient>
        </defs>
        {/* Hexagon shield outline */}
        <path
          d="M50 6 L88 28 L88 72 L50 94 L12 72 L12 28 Z"
          stroke={isLight ? "url(#aveniq-grad)" : accent}
          strokeWidth="6"
          strokeLinejoin="round"
          fill="none"
        />
        {/* A / V monogram: peaked A formed by two strokes + crossbar */}
        <path
          d="M50 26 L72 76 L60 76 L50 50 L40 76 L28 76 Z"
          fill={markColor}
        />
        {/* inner counter of the A */}
        <path d="M50 40 L56 58 L44 58 Z" fill={isLight ? "#0B061A" : "#FFFFFF"} />
        {/* long diagonal accent stroke (the V hint) */}
        <path
          d="M22 34 L70 78"
          stroke={accent}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      {withWordmark && (
        <div className="leading-none">
          <div
            className="font-extrabold tracking-[0.18em] text-xl sm:text-2xl"
            style={{ color: wordColor }}
          >
            AVENIQ
            <span className="relative">
              Q
              <span
                className="absolute -bottom-1 left-1/2 h-[3px] w-3 rounded-full"
                style={{ background: techColor, transform: "translateX(-10%)" }}
              />
            </span>
          </div>
          <div
            className="text-[0.6rem] sm:text-xs font-bold tracking-[0.45em] mt-1"
            style={{ color: techColor }}
          >
            TECH
          </div>
        </div>
      )}
    </div>
  );
}
