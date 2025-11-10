import ReactLenis from "lenis/react";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReactLenis root />
      {children}
    </>
  );
};
