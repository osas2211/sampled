/* eslint-disable @typescript-eslint/no-unused-vars*/

import { Progress, Slider } from "antd";
import React from "react";
import { BiVolumeFull } from "react-icons/bi";
import {
  MdOutlinePlayCircleFilled,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

export const Player = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[5rem] bg-grey-1000 z-[100] flex md:flex-row flex-col items-center justify-between gap-4 px-4 py-3">
      <div className="md:flex hidden gap-2 items-end">
        <img
          className="w-[3.7rem] h-[3.7rem] rounded-md object-cover object-top shadow-2xl shadow-grey-900"
          src={"/assets/images/artists/artist-2.png"}
        />
        <div className="text-sm">
          <p> 99 (feat.Daecolm)</p>
          <p className="text-sm text-grey-300">@johnson</p>
        </div>
      </div>
      <div className="flex md:flex-col flex-col-reverse">
        <div className="flex items-center justify-center gap-4">
          <MdSkipPrevious className="text-[25px] md:text-[35px] cursor-pointer" />
          <MdOutlinePlayCircleFilled className="text-[25px] md:text-[35px] cursor-pointer" />
          <MdSkipNext className="text-[25px] md:text-[35px] cursor-pointer" />
        </div>
        <div>
          <div className="flex items-center gap-1 text-sm text-grey-300">
            <p>1:40</p>
            <Slider
              className="md:!w-[700px] !w-[70vw]"
              defaultValue={10}
              styles={{
                track: { background: "#fff" },
                handle: { display: "none" },
              }}
            />
            <p>4:28</p>
          </div>
        </div>
      </div>
      <div>
        <div className="md:flex hidden items-center gap-1">
          <BiVolumeFull />
          <Slider
            className="!w-[200px]"
            defaultValue={50}
            styles={{
              track: { background: "#fff" },
              handle: { display: "none" },
            }}
          />
        </div>
      </div>
    </div>
  );
};
