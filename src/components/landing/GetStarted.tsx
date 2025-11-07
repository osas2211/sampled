import { FaQuoteLeft } from "react-icons/fa";
import { FiArrowUpLeft, FiArrowDownRight } from "react-icons/fi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export const GetStarted = () => {
  useGSAP(() => {
    gsap.to(".get-started-pic", {
      y: -100,
      scrollTrigger: {
        trigger: ".footer",
        scrub: true,
        end: "-40px",
      },
    });
  });

  return (
    <div className="md:h-[550px] h-[220px] overflow-hidden px-4 md:px-16 2xl:px-[6rem] relative">
      <div className="flex justify-between">
        <div className="py-5 md:py-[100px] space-y-4 md:space-y-7 relative z-[1]">
          <p className="text-xs text-grey-300 uppercase">[ what say you? ]</p>
          <div className="flex md:gap-7 gap-3">
            <FaQuoteLeft className="text-2xl md:text-[50px] text-primary" />
            <div>
              <h2 className="text-2xl md:text-[60px] 2xl:text-[65px] leading-[0.9] max-w-[700px]">
                Unlease your genius.{" "}
                <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent underline">
                  Sample,
                </span>{" "}
                move, cook, and Earn.
              </h2>
              <div className="mt-5 md:mt-12 relative cursor-pointer inline-block">
                <div className="absolute top-0 left-0 h-[50px] w-[50px] rounded-full bg-primary"></div>
                <div
                  // to={"/onboard"}
                  className="w-[200px] h-[50px] bg-primary inline-flex items-center justify-center text-black rounded-full ml-[40px]"
                >
                  Get started
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <FiArrowUpLeft className="md:text-4xl text-2xl " />
              <FiArrowDownRight className="md:text-4xl text-2xl text-primary" />
            </div>
          </div>
        </div>
        <div className="md:relative absolute top-0 right-[1rem] md:right-0 md:opacity-100 opacity-20 get-started-pic">
          {/* <Marquee direction="up"> */}
          <div>
            <div className="flex gap-10">
              <img
                className="md:h-[21rem] h-[12rem] md:w-[11rem] w-[5rem] object-cover rounded-full md:-mt-[13rem] -mt-[8rem]"
                src={"/assets/landing/get-started-2.jpg"}
              />
              <img
                className="md:h-[21rem] h-[12rem] md:w-[11rem] w-[5rem] object-cover rounded-full md:-mt-[5rem] -mt-[3rem]"
                src={"/assets/landing/get-started-5.avif"}
              />
            </div>
            <div className="flex gap-10">
              <img
                className="md:h-[21rem] h-[12rem] md:w-[11rem] w-[5rem] object-cover rounded-full md:-mt-[5.5rem] -mt-[3.5rem]"
                src={"/assets/landing/get-started-1.jpg"}
              />
              <img
                className="md:h-[21rem] h-[12rem] md:w-[11rem] w-[5rem] object-cover rounded-full md:mt-[3rem] mt-[2rem]"
                src={"/assets/landing/get-started-3.avif"}
              />
            </div>
            <div className="flex gap-10">
              <img
                className="md:h-[21rem] h-[12rem] md:w-[11rem] w-[5rem] object-cover rounded-full mt-[-6.5rem]"
                src={"/assets/landing/get-started-2.jpg"}
              />
            </div>
          </div>
          {/* </Marquee> */}
        </div>
      </div>
    </div>
  );
};
