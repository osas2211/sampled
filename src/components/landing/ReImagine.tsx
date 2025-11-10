import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const ReImagine = () => {
  useEffect(() => {
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 100 },
      {
        scrollTrigger: {
          trigger: "#re-imagine",
          // scrub: true,
          // start: "-=5000",
          // pin: true,
        },
        opacity: 1,
        stagger: 1,
        duration: 1,
        y: 0,
      },
    );
  });
  return (
    <div className="pt-[0rem] relative" id="re-imagine">
      <div className="grid md:grid-cols-6 relative">
        <div className="md:h-[450px] md:mb-0 mb-[-8.7rem] w-full md:bg-green-900 sticky z-[1] md:top-[0px] top-[420px] bottom-[230rem] md:left-[0px] left-[1.5rem] text-center flex items-center justify-center">
          <h2 className="relative md:mt-7">
            <span className="md:text-[27rem] md:leading-[25.5rem] text-[6rem] font-mango uppercase md:text-white font-medium">
              Re
            </span>
            <div className="text-grey-900 absolute md:top-[0.5rem] top-[0.5rem] md:-left-[0rem] -left-[1.5rem] bg-yellow-300  px-3 pt-1 text-[2.5rem] leading-[2.5rem] rotate-[-15deg] font-mango md:scale-100 scale-[0.5]">
              ART
            </div>
          </h2>
        </div>
        <div className="col-span-5">
          <div className="md:h-[450px] w-full bg-grey-800 md:p-[3.5rem] p-0 flex items-center justify-between relative">
            <div className="flex flex-col h-full md:justify-between">
              <p className="md:text-[13rem] md:leading-[13rem] text-[6rem] leading-[6rem] uppercase font-mango relative pl-[5.1rem] p-5 md:p-0 md:pl-0">
                <span className="font-mango">Imagining</span>
                <span className="text-grey-900 absolute md:bottom-[1.5rem] bottom-[1rem] md:-right-[2rem] -right-[1rem] bg-yellow-300  px-3 pt-1 text-[2.5rem] leading-[2.5rem] rotate-[-15deg] font-mango md:scale-100 scale-[0.5]">
                  Stellar
                </span>
              </p>
              <p className="relative z-[2] bg-grey-800 md:max-w-[300px] max-w-[300px] md:text-lg leading-[22px] p-5 pt-0 md:p-0">
                The First Producer and Music Martketplace on Stellar
              </p>
            </div>
            <div className="h-full absolute top-0 right-0 opacity-10 hidden">
              <img
                alt=""
                src="/assets/slider-img/img1.jpg"
                className="md:w-[400px] w-[250px] object-cover h-full"
              />
            </div>
          </div>
          <div className="md:h-[450px] w-full bg-grey-900 md:p-[3.5rem] p-0 flex items-center justify-between relative">
            <div className="flex flex-col h-full md:justify-between">
              <p className="md:text-[13rem] md:leading-[13rem] text-[6rem] leading-[6rem] uppercase font-mango relative pl-[5.1rem] p-5 md:p-0 md:pl-0">
                <span className="font-mango">defining</span>
                <span className="text-grey-900 absolute md:bottom-[1.5rem] bottom-[1rem] md:-right-[2rem] -right-[1rem] bg-purple-300  px-3 pt-1 text-[2.5rem] leading-[2.5rem] rotate-[-15deg] font-mango md:scale-100 scale-[0.5]">
                  Speed
                </span>
              </p>
              <p className="relative z-[2] bg-grey-900 md:max-w-[300px] max-w-[300px] md:text-lg leading-[22px] p-5 pt-0 md:p-0">
                Built for instant, low-cost transactions.
              </p>
            </div>
            <div className="h-full absolute top-0 right-0 opacity-10 hidden">
              <img
                alt=""
                src="/assets/slider-img/img2.jpg"
                className="md:w-[400px] w-[250px] object-cover h-full"
              />
            </div>
          </div>
          <div className="md:h-[450px] w-full bg-grey-800 md:p-[3.5rem] p-0 flex items-center justify-between relative">
            <div className="flex flex-col h-full md:justify-between">
              <p className="md:text-[13rem] md:leading-[13rem] text-[6rem] leading-[6rem] uppercase font-mango relative pl-[5.1rem] p-5 md:p-0 md:pl-0">
                <span className="font-mango">inventing</span>
                <span className="text-grey-900 absolute md:bottom-[1.5rem] bottom-[1rem] md:-right-[2rem] -right-[1rem] bg-orange-200  px-3 pt-1 text-[2.5rem] leading-[2.5rem] rotate-[-15deg] font-mango md:scale-100 scale-[0.5]">
                  Music
                </span>
              </p>
              <p className="relative z-[2] bg-grey-800 md:max-w-[300px] max-w-[300px] md:text-lg leading-[22px] p-5 pt-0 md:p-0">
                Every interaction feels like you're part of the culture.
              </p>
            </div>
            <div className="h-full absolute top-0 right-0 opacity-10 hidden">
              <img
                alt=""
                src="/assets/slider-img/img7.jpg"
                className="md:w-[400px] w-[250px] object-cover h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
