import React from "react";
import { SpecialButton } from "../shared/SpecialButton";
import { Link } from "react-router-dom";

export const Hero = () => {
  const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      <div className="relative">
        <div className="relative flex flex-col gap-8 md:gap-0 justify-between md:h-[90vh] overflow-y-hidden md:max-w-[1280px] 2xl:max-w-full mx-auto pb-5 md:pb-10 px-4 md:px-14">
          <div className="relaive z-[1] 2xl:max-w-[650px] md:max-w-[480px] uppercase tracking-[6px] text-pale-grey md:pt-[80px] pt-[40px] md:text-6xl 2xl:text-[80px] text-3xl relative">
            <h2 className="text-end font-sequel">expand</h2>
            <div className="flex items-center justify-between">
              <h2 className="">your genius</h2>
              <h2 className="md:hidden block">&</h2>
            </div>
            <h2 className="text-center mt-10 md:block hidden">&</h2>
            <div className="pl-[4rem] mt-4 md:mt-0">
              <div className="flex justify-between">
                <h2 className="">engage</h2>
                <h2 className="">in</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="">creating</h2>
                <h2 className="font-pixter text-primary">a</h2>
              </div>
            </div>
            <h2 className="md:mt-4">
              social<span className="font-pixter text-primary">v</span>erse
            </h2>
          </div>
          <div className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-4 gap-[50px] relative">
            <div className="relative z-[10]">
              <SpecialButton>Get Started</SpecialButton>
            </div>
            <div className="max-w-[400px] space-y-10 md:space-y-10">
              <p className="uppercase text-pale-grey tracking-wider md:text-[16px] text-sm relative hero-caption">
                Transforming the way culture is created. Every clip, remix, and
                meme becomes a liquid asset while evolving.
              </p>

              <Link
                to={""}
                className="text-primary uppercase text-lg md:text-2xl font-pixter hero-click-to-explore hero-caption relative"
              >
                [ {"click to explore"} ]
              </Link>
            </div>
          </div>
          <div className="md:absolute md:bottom-0 md:right-[7%] 2xl:right-[10%] z-[2] hero-img ">
            <img
              src={"/assets/images/vr_guy.jpg"}
              className="2xl:w-[790px] md:w-[570px]"
            />
          </div>
        </div>
      </div>

      <div className="absolute w-full h-full top-0 left-0">
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
      <div className="absolute w-full h-screen top-0 left-0">
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
    </>
  );
};
