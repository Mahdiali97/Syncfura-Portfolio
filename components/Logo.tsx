import React from "react";
import Image from "next/image";

type LogoProps = {
  /** "light" = white mark on dark background. "dark" = indigo mark on light background. */
  variant?: "light" | "dark";
  withWordmark?: boolean;
  className?: string;
  markSize?: number;
};

/**
 * SyncFura Digital brand mark + wordmark.
 * The symbol is the SyncFura logo mark with violet accent.
 */
export default function Logo({
  variant = "dark",
  withWordmark = true,
  className = "",
  markSize = 64,
}: LogoProps) {
  const isLight = variant === "light";
  const markColor = isLight ? "#FFFFFF" : "#2D1B69";
  const accent = isLight ? "#A855F7" : "#7C3AED";
  const wordColor = isLight ? "#FFFFFF" : "#2D1B69";
  const techColor = isLight ? "#A855F7" : "#7C3AED";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <Image
        src="/Logo_Aveniq.png"
        alt="Syncfura logo"
        width={markSize}
        height={markSize}
        className="shrink-0 object-contain"
        priority
      />

      {withWordmark && (
        <div className="leading-none">
          <div
            className="font-extrabold tracking-[0.18em] text-xl sm:text-2xl"
            style={{ color: "#443562" }}
          >
            Sync
            <span className="relative">
              Fu
              <span
                className="absolute -bottom-1 left-1/2 h-[3px] w-3 rounded-full"
                style={{ background: techColor, transform: "translateX(-10%)" }}
              />
            </span>
            ra
          </div>
          <div
            className="text-[0.6rem] sm:text-xs font-bold tracking-[0.45em] mt-1"
            style={{ color: techColor }}
          >
            DIGITAL
          </div>
        </div>
      )}
    </div>
  );
}
