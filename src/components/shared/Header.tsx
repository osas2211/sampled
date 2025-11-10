import { Logo } from "./Logo";
import { PiDotsSixBold } from "react-icons/pi";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrambleTextPlugin);

const routes = [
  {
    label: "MarketPlace",
    route: "/explore",
  },
  {
    label: "Upload",
    route: "/upload-sample",
  },
  {
    label: "My Samples",
    route: "/my-samples",
  },
  {
    label: "Docs",
    route: "https://github.com/osas2211/sampled",
    target: "_blank",
  },
];

export const Header = () => {
  const lines = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="p-4 md:px-14 relative">
      <div className="flex items-center justify-between md:max-w-[1200px] 2xl:max-w-full mx-auto">
        <Logo />

        <nav className="bg-grey-800 p-5 px-10  md:grid grid-cols-4 items-center justify-between gap-4 w-[750px] relative h-full overflow-hidden hidden">
          {routes.map((route, index) => {
            return (
              <Link
                to={route.route}
                key={index}
                target={route?.target}
                className="uppercase font-pixter gap-1 text-[14px] leading-0 inline-flex items-center hover:gap-2 hover:!text-primary text-pale-grey transition-all relative z-[15] route-link"
              >
                <span>[</span>
                <span
                  className={`text-sm route-label${index}`}
                  onMouseEnter={() => {
                    gsap.fromTo(
                      `.route-label${index}`,
                      { scrambleText: "jkxstyd" },
                      { scrambleText: route.label, duration: 0.75 },
                    );
                  }}
                >
                  {route.label}
                </span>
                <span>]</span>
              </Link>
            );
          })}

          <div className="absolute w-full h-full top-0 left-0">
            <div className="flex items-center justify-around">
              {lines.map((_, index) => {
                return (
                  <div
                    key={index}
                    className="w-[1px] h-[70px] bg-white/30 opacity-[0.1]"
                  ></div>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="cursor-pointer p-1 rounded-md bg-grey-800 md:hidden relative z-[5]">
          <PiDotsSixBold className="text-primary" size={26} />
        </div>
      </div>
    </div>
  );
};
