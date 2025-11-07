import React from "react";
import { Link } from "react-router-dom";

export const OnboardCompleted = () => {
  return (
    <div className="md:max-w-[382px] mx-auto flex items-center justify-center gap-5 flex-col">
      <img
        src={"/assets/images/onboard/completed.svg"}
        className="w-[150px] md:w-[200px]"
      />
      <div className="text-center">
        <h2 className="md:text-xl text-lg mt-2 font-semibold">
          Set up completed
        </h2>
        <p className="text-sm mt-2 mb-4">
          Congratulations, you&apos;s successfully onboarded and ready to
          experience the best music has to offer.
        </p>
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 h-[40px] w-[40px] rounded-full bg-primary"></div>
        <Link
          to={"/explore"}
          className="w-[200px] h-[40px] bg-primary inline-flex items-center justify-center text-black rounded-full ml-[30px]"
        >
          Explore now
        </Link>
      </div>
    </div>
  );
};
