import { Avatar } from "antd";

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
          <p>Contract Created</p>
        </div>
        <div className="font-semibold">10 November, 2025</div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg bg-grey-700">
        <div className="flex items-center gap-2">
          <BiWallet className="text-white" size={20} />
          <p>Contract ID</p>
        </div>
        <div className="flex items-center gap-1">
          <p>-</p>
          <BiCopy className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <GiChainLightning className="text-white" size={20} />
          <p>Chain</p>
        </div>
        <div className="flex items-center gap-1">
          <Avatar src="/favicon.ico" size={16} />
          <p>Stellar</p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg bg-grey-700">
        <div className="flex items-center gap-2">
          <RiCoinsLine className="text-white" size={20} />
          <p>Pair</p>
        </div>
        <div className="flex items-center gap-1">
          <p>XLM</p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <BiMusic className="text-white" size={20} />
          <p>Media</p>
        </div>
        <div className="flex items-center gap-1">
          <p>MP3/WAV</p>
        </div>
      </div>
    </div>
  );
};
