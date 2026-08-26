import Image from "next/image";

type LogoProps = {
  /** "light" = white wordmark on dark bg. "dark" = indigo on light bg. */
  variant?: "light" | "dark";
  withWordmark?: boolean;
  className?: string;
  markSize?: number;
};

/**
 * AVENIQTECH brand mark + wordmark.
 * Uses the official logo PNG (no background) provided by the brand.
 */
export default function Logo({
  variant = "light",
  withWordmark = true,
  className = "",
  markSize = 42,
}: LogoProps) {
  const isLight = variant === "light";
  const wordColor = isLight ? "#FFFFFF" : "#1e1244";
  const techColor = isLight ? "#A855F7" : "#7C3AED";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official logo image */}
      <Image
        src="/logo/Logonobackground.png"
        alt="AVENIQTECH logo mark"
        width={markSize}
        height={markSize}
        className="shrink-0 object-contain"
        priority
      />

      {/* Wordmark */}
      {withWordmark && (
        <div className="leading-none">
          <div
            className="font-extrabold text-xl sm:text-2xl"
            style={{ color: wordColor, letterSpacing: "0.12em" }}
          >
            AVENIQ
          </div>
          <div
            className="text-[0.6rem] sm:text-xs font-bold tracking-[0.45em] mt-0.5"
            style={{ color: techColor }}
          >
            TECH
          </div>
        </div>
      )}
    </div>
  );
}
