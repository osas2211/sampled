"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Marquee from "react-fast-marquee";
import { PiArrowBendDownRight } from "react-icons/pi";
import { Link } from "react-router-dom";

gsap.registerPlugin(SplitText, ScrollTrigger);

const textAnimation = (trigger: string, end?: string) => {
  const split = SplitText.create(trigger, { type: "words, chars" });
  // now animate the characters in a staggered fashion
  gsap.from(split.chars, {
    // duration: 1,
    opacity: 0.3, // animate from 100px below
    stagger: 0.02, // 0.05 seconds between each
    y: 7,
    scrollTrigger: {
      trigger: trigger,
      scrub: true,
      // endTrigger: "#approach-info",
      end: end || "10px",
      // start: "top top",
    },
  });
};

export const About = () => {
  useGSAP(() => {
    const { innerWidth } = window;
    textAnimation(".top-desc-1", "300px");
    textAnimation(".top-desc-2", "-40px");
    textAnimation(".top-desc-3", "700px");

    gsap.to(".desc-marquee", {
      y: -200,
      rotate: 5,
      scrollTrigger: {
        trigger: ".desc-marquee",
        scrub: true,
        end: "10px",
      },
    });
    gsap.to(".desc-img", {
      yPercent: innerWidth <= 768 ? 0 : -30,
      rotate: innerWidth <= 768 ? 0 : -3,
      scrollTrigger: {
        trigger: ".desc-img",
        scrub: true,
        end: "300px",
      },
    });
  });
  return (
    <div className="relative md:my-[0px] mt-[40px] py-7 overflow-hidden about">
      <div className="px-4 md:px-[3rem] py-[2rem] md:py-[2.5rem]">
        <div className="border-t-[1px] border-grey-400 py-[1rem] md:py-[1rem] flex justify-between gap-4 md:flex-row flex-col">
          <p className="text-xs text-grey-200 uppercase">[ music culture ]</p>
          <div className="max-w-[450px] md:text-xl">
            <p className="md:text-end">
              Finally, a{" "}
              <span className="text-primary underline">marketplace</span> where
            </p>
            <p className="">
              producers own their work, set their prices, and get paid the
              moment{" "}
              <span className="text-primary underline"> someone buys</span>{" "}
              their sample. Built on Stellar for instant,
              <span className="text-primary underline">
                {" "}
                low-cost transactions.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] 2xl:max-w-[1300px] !mx-auto px-4 md:mx-6">
        <p className="text-xs inline-block px-2 py-1 border-[1px] rounded-full uppercase font-semibold">
          About <span className="text-primary font-pixter">SAMPLED</span>
        </p>
        <h2 className="max-w-[650px] text-lg md:text-2xl mt-4 md:mt-5 leading-[1.5] top-desc-3">
          Upload your sample and set your price in XLM. When a producer buys it,
          you get 90% instantly. They get the file + commercial license
          immediately. No waiting for monthly payouts. No 50% platform fees.
          Just instant payments for your creativity.
        </h2>

        <div className="mt-5 md:mt-16 flex md:flex-row flex-col gap-2 justify-between">
          <div className="font-semibold">
            <p className="top-desc">
              For <span className="text-primary">Producers</span>
            </p>
            <p className="top-desc">Transform creativity into assets</p>
          </div>

          <div>
            <p className="max-w-[450px] leading-[1.7] top-desc-1">
              Sampled showcases why Stellar beats Ethereum for marketplaces:
              instant payments, negligible fees, and real-time settlement. We
              chose samples because producers feel the pain of slow payments
              most acutely. But this same architecture works for any digital
              commerce. Sampled isn't just a marketplace - it's a movement.
              Every interaction should feel like you're part of the culture.
              Getting Sampled isn't just selling a beat, it's validation. It's
              success. It's making it.
            </p>
            <Link
              to="/onboard"
              className="inline-flex gap-3 items-center mt-5 md:mt-7 text-primary md:text-lg"
            >
              <PiArrowBendDownRight size={30} className="text-primary" />
              <p>Get Started</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="2xl:max-w-[1500px] md:max-w-[1300px] !mx-auto relative md:min-h-[62vh] md:px-0 px-4 md:mt-0 mt-4">
        <div className="md:absolute relative z-[1] md:top-[4rem] md:left-4">
          <img
            src={"/assets/landing/creative.jpg"}
            className="md:w-[450px] md:h-[600px] w-full h-[300px] object-cover rounded-[30px] desc-img"
          />
        </div>
        <div className="md:absolute md:block hidden z-[1] md:top-[11rem] md:right-4">
          <img
            src={"/assets/landing/nft.avif"}
            className="w-[400px] h-[300px] object-cover rounded-[30px] object-top desc-img"
          />
        </div>
        <div className="md:absolute md:block hidden z-[1] md:bottom-[-4rem] md:left-[50%] md:translate-x-[-50%]">
          <img
            src={"/assets/landing/imagine.avif"}
            className="w-[200px] h-[150px] object-cover rounded-[30px] desc-img"
          />
        </div>
      </div>

      <div className="text-[8.85vmax] md:mt-0 mt-[4rem] opacity-[0.1] uppercase font-pixter font-bold desc-marquee">
        <Marquee speed={150}>
          <p className="mr-10">Move</p>
          <p className="mr-10">with</p>
          <p className="mr-10">creative</p>
          <p className="mr-10">culture.</p>
        </Marquee>
      </div>
    </div>
  );
};
