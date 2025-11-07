import { InAppHeader } from "../../components/shared/InAppHeader";
import React from "react";
import { HomeLibrary } from "./HomeLibrary";
import { Player } from "../music/Player";
import { Outlet } from "react-router-dom";

const InAppLayout = () => {
  return (
    <div className="pb-4 md:pb-4 space-y-1 relative">
      <div className="sticky top-0 left-0 w-full z-[10]">
        <InAppHeader />
      </div>
      <div className="grid md:grid-cols-5 grid-cols-1 gap-2 relative z-[1] md:px-[10px] px-2">
        <div className="md:block hidden  z-[1] w-full">
          <HomeLibrary />
        </div>
        <div className="md:col-span-4 pb-[5rem]">
          <Outlet />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default InAppLayout;
