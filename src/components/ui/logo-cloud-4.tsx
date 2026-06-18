import { InfiniteSlider } from "./infinite-slider";
import { ProgressiveBlur } from "./progressive-blur";

type Logo = {
  srcLight: string;
  srcDark: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <div className="relative mx-auto max-w-3xl bg-transparent py-6 md:border-x border-border overflow-hidden">
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-border" />

      <InfiniteSlider gap={42} reverse speed={60} speedOnHover={20}>
        {logos.map((logo) => (
          <div key={`logo-${logo.alt}`} className="flex items-center justify-center">
            {/* Light mode logo (hidden in dark mode) */}
            <img
              alt={logo.alt}
              className="pointer-events-none h-5 select-none md:h-6 opacity-60 hover:opacity-100 transition-opacity duration-300 dark:hidden block"
              height="auto"
              loading="lazy"
              src={logo.srcLight}
              width="auto"
            />
            {/* Dark mode logo (hidden in light mode) */}
            <img
              alt={logo.alt}
              className="pointer-events-none h-5 select-none md:h-6 opacity-60 hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              height="auto"
              loading="lazy"
              src={logo.srcDark || logo.srcLight}
              width="auto"
            />
          </div>
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[160px] "
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[160px] "
        direction="right"
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border" />
    </div>
  );
}
