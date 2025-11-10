import gsap from "gsap";
import React, { useRef } from "react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

export const HeroAlt = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  useGSAP(() => {
    const { innerWidth } = window;
    gsap.set(".hero-video-container", {
      y: innerWidth <= 768 ? "-40px" : "-80vh",
    });
    gsap.to(".hero-btm-text", {
      y: innerWidth <= 768 ? 0 : -100,
      opacity: innerWidth <= 768 ? 1 : 0,
      zIndex: 55,
      scrollTrigger: {
        trigger: ".about",
        scrub: true,
        end: "-60px",
      },
    });

    gsap.to(".hero-video-container", {
      y: 0,
      scrollTrigger: {
        trigger: ".before-hero-video",
        scrub: true,
        end: "60px",
      },
    });

    gsap.to(".hero-video", {
      width: "100%",
      scrollTrigger: {
        trigger: ".before-hero-video",
        scrub: true,
        end: "60px",
      },
      onUpdate: () => {
        gsap.to(boxRef.current, {
          x: 0, // Adjust multiplier for more/less movement
          duration: 1,
          ease: "power3.out",
        });
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;

      const centerX = innerWidth / 2;

      // Distance from center, clamped to ±100
      let offsetX = mouseX - centerX;
      offsetX = Math.max(-100, Math.min(100, offsetX));

      console.log(
        mouseX,
        innerWidth,

        boxRef.current?.offsetWidth,
      );

      if (boxRef.current) {
        if (boxRef.current?.style.width !== "100%") {
          gsap.to(boxRef.current, {
            x: offsetX * 5, // Adjust multiplier for more/less movement
            duration: 1.75,
            ease: "power2.out",
          });
        }
        if (boxRef.current?.style.width === "100%") {
          gsap.to(boxRef.current, {
            x: 0, // Adjust multiplier for more/less movement
            duration: 1,
            ease: "power3.out",
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <>
      <div className="md:h-[90vh] h-[40vh] mt-[2rem] md:max-w-[1280px] mx-auto 2xl:max-w-full pb-5 md:pb-10 px-4 md:px-14 flex flex-col justify-between">
        <div className="relative flex hero-img z-[10]">
          <h2
            className="uppercase 2xl:text-[21.8vw] md:text-[20.8vw] text-[19.8vw] font-pixter leading-[0.5] text-center hero-bold-text"
            // onMouseEnter={() => {
            //   gsap.fromTo(
            //     `.hero-bold-text`,
            //     { scrambleText: "jkxsty", color: "#c3ff49" },
            //     { scrambleText: "Sampled", duration: 1.75, color: "#fff" }
            //   )
            // }}
          >
            Sampled
          </h2>
          <span className="md:text-[2rem]">TM</span>
        </div>

        <div className="flex md:flex-row flex-col md:items-end md:justify-between md:gap-4 gap-[50px] hero-btm-text relative z-[5]">
          <div className="max-w-[500px] space-y-10 md:space-y-10">
            <p className=" text-pale-grey tracking-wider md:text-[16px] text-sm relative hero-caption">
              THE PRODUCER MARKETPLACE THAT GETS YOU SAMPLED. UPLOAD YOUR BEATS.
              SET YOUR PRICE. GET PAID INSTANTLY. NO MIDDLEMEN. NO WAITING. IT'S
              TIME TO GET SAMPLED.
            </p>

            <Link
              to={"/market/all"}
              className="text-primary uppercase text-lg md:text-[18px] font-pixter hero-click-to-explore z-[55] relative"
            >
              [ {"click to explore"} ]
            </Link>
          </div>
          <div className="relative z-[10]">
            <p>(Scroll)</p>
          </div>
        </div>

        <div className="absolute z-[0] w-full h-full top-0 left-0">
          <div className="flex items-center justify-between">
            {lines.map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-[1px] h-screen bg-primary/50 opacity-[0.1]"
                ></div>
              );
            })}
          </div>
        </div>
        <div className="absolute z-[0] w-full h-screen top-0 left-0">
          <div className="flex items-center justify-between h-full flex-col">
            {lines.map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-[1px] bg-primary/50 opacity-[0.1]"
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="before-hero-video mt-10"></div>
      <div className="hero-video-container relative md:z-[50] flex items-center justify-center md:px-[3rem] px-[1rem]">
        <div className="md:w-[570px] w-[75vw] hero-video" ref={boxRef}>
          <video
            src="/assets/videos/hero-alt-vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "15px",
              maxHeight: "80vh",
            }}
          />
          <div className="text-lg md:text-xl space-y-0 mt-2 hero-video-text">
            <p>Upload once. Get Sampled forever.</p>
            <p>Instant payments on Stellar.</p>
          </div>
        </div>
      </div>
    </>
  );
};
