import React from "react";
import { Logo } from "../shared/Logo";
import moment from "moment";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="md:h-[500px] h-[300px] bg-grey-800 relative overflow-hidden footer">
      <div className="md:p-[6rem] md:py-[5rem] p-4 relative z-[1] text-white">
        <Logo />
        <div>
          <h2 className="md:text-[100px] text-[25px] font-bold mt-5 mb-2 md:my-0">
            GET IN TOUCH <span className="text-primary/30">@</span>
          </h2>
          <div className="flex md:items-center justify-between md:flex-row flex-col gap-4">
            <div className="md:text-2xl text-grey-300 md:font-bold space-x-7">
              <Link
                to={"mailto:osaretin.frank10@gmail.com"}
                target="_blank"
                className="md:inline block"
              >
                osaretin.frank10@gmail.com
              </Link>
              <Link
                to={"https://osaretinfrank.netlify.app/"}
                target="_blank"
                className="md:inline block"
              >
                https://osaretinfrank.netlify.app
              </Link>
            </div>
            <div className="space-x-4">
              <Link
                to={"https://www.github.com/osas2211"}
                target="_blank"
                className="inline-block border-[1px] px-3 rounded-full"
              >
                Github
              </Link>
              <Link
                to={"https://www.linkedin.com/in/osaretin-osariemen-03047a1a6/"}
                target="_blank"
                className="inline-block border-[1px] px-3 rounded-full"
              >
                LinkedIn
              </Link>
              <Link
                to={"https://twitter.com/Osaretinfrank3"}
                target="_blank"
                className="inline-block border-[1px] px-3 rounded-full"
              >
                X(Twitter)
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-full text-center">
        <h2 className="uppercase 2xl:text-[27vw] md:text-[25vw] text-[24vw] font-pixter leading-[0.9] text-center text-grey-700/50">
          Sampled
        </h2>
      </div>
      <div className="absolute z-[1] bottom-0 right-0 w-full md:p-6 p-4 2xl:px-[6rem] md:px-[5rem] border-t-[1px] border-grey-500 text-grey-300">
        <p>&copy; {moment().year()}. All rights reserved.</p>
      </div>
    </footer>
  );
};
