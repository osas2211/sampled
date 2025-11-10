import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrambleTextPlugin, SplitText, TextPlugin);

export const Loader = () => {
  const tl = gsap.timeline({ paused: false });
  const [progress, setProgress] = useState(0);
  useGSAP(() => {
    tl.to([".hero-video-text"], {
      zIndex: 55,
      duration: 0,
      color: "#000",
    })
      .fromTo(
        ".loading-text_",
        {
          scrambleText: "jkxstyd",
        },

        {
          scrambleText: "loading",
          duration: 1.25,
          ease: "none",
          onUpdate: function (this: gsap.core.Tween) {
            setProgress(this.progress() * 100);
          },
        },
      )
      .to([".route-link", ".hero-video-text"], {
        zIndex: 55,
        duration: 0.75,
        color: "#000",
      })
      .fromTo(
        ".hero-caption",
        { y: 100, opacity: 0 },
        {
          zIndex: 55,
          duration: 1,
          color: "#000",
          stagger: 0.25,
          // ease: "circ.out",
          y: 0,
          opacity: 1,
          position: "relative",
        },
      )
      .to([".loading-text"], {
        ease: "expo.inOut",
        y: 10,
        opacity: 0,
        duration: 1,
      })
      .to(
        [".loader-up-1", ".loader-up-2", ".loading-text"],
        {
          clipPath:
            "polygon(65% 100%, 100% 100%, 100% 100%, 0% 100%, 0 100%, 40% 100%)",
          duration: 1.75,
          ease: "expo.inOut",
        },
        "-=0.5",
      )
      .to(
        [".route-link", ".hero-caption", ".hero-video-text"],
        { color: "#fdfdff" },
        "-=1.1",
      )
      .to(".hero-click-to-explore", { color: "#c3ff49" }, "<")
      .fromTo(
        ".hero-img",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.95",
      );
  });
  return (
    <>
      <div className="loader-up-1 bg-primary fixed bottom-0 left-0 w-screen h-[65vh] z-[50] cursor-pointer"></div>
      <div className="loader-up-2 bg-primary fixed top-0 left-0 w-screen h-[65vh] z-[50] rotate-[180deg]"></div>

      <div className="loading-text fixed top-0 left-0 text-night h-screen w-screen z-[100] flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-between font-pixter font-bold uppercase md:text-8xl md:px-14 px-4 md:-mt-0 -mt-5">
          <h2 className="loading-text_"></h2>
          <h2
            onClick={() => {
              if (progress >= 100) {
                tl.reverse();
              } else {
                tl.play();
              }
              // progress >= 100 ? tl.reverse() : tl.play()
            }}
          >
            {progress.toFixed(0)}%
          </h2>
        </div>
      </div>
    </>
  );
};
