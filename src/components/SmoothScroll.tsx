import ReactLenis from "lenis/react";
import React from "react";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReactLenis root />
      {children}
    </>
  );
};
