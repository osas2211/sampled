"use client";
import React, { ReactNode } from "react";

export const SpecialButton = ({ children }: { children: ReactNode }) => {
  return (
    <button
      className="font-pixter uppercase relative bg-primary text-black py-3 px-8 text-lg md:w-[300px] w-full rounded-[0px] font-bold cursor-pointer"
      type="button"
    >
      {children}
      <div className="absolute top-[6px] right-[6px] bg-grey-400 h-full w-full z-[-1] rounded-[0px]" />
      {/* <div className="absolute bottom-[6px] left-[6px] bg-grey-400 h-full w-full z-[-1] rounded-[0px]" /> */}
    </button>
  );
};
