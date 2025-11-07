import { Avatar } from "antd";
import React from "react";
import { BiCopy, BiMusic, BiWallet } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { GiChainLightning } from "react-icons/gi";
import { RiCoinsLine } from "react-icons/ri";

export const SampleDetails = () => {
  return (
    <div>
      <div className="flex items-center gap-4 justify-between p-4 pt-0 rounded-md">
        <div className="flex items-center gap-2">
          <CiClock2 className="text-white" size={20} />
          <p>Created</p>
        </div>
        <div className="font-semibold">Jun 30, 2025, 2:20 AM</div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg bg-grey-700">
        <div className="flex items-center gap-2">
          <BiWallet className="text-white" size={20} />
          <p>Contract address</p>
        </div>
        <div className="flex items-center gap-1">
          <p>0xbd79…baeb</p>
          <BiCopy className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <GiChainLightning className="text-white" size={20} />
          <p>Chain</p>
        </div>
        <div className="flex items-center gap-1">
          <Avatar src="/base.svg" size={16} />
          <p>Base</p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg bg-grey-700">
        <div className="flex items-center gap-2">
          <RiCoinsLine className="text-white" size={20} />
          <p>Pair</p>
        </div>
        <div className="flex items-center gap-1">
          <Avatar src="/assets/images/artists/artist-1.avif" size={16} />
          <p>@justice</p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <BiMusic className="text-white" size={20} />
          <p>Media</p>
        </div>
        <div className="flex items-center gap-1">
          <p>MP3</p>
        </div>
      </div>
    </div>
  );
};
