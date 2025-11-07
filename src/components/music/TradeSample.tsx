import { Avatar } from "antd";
import React from "react";
import { BiCoinStack, BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GoFlame } from "react-icons/go";
import { TbTrendingUp } from "react-icons/tb";
import { PurchaseSampleTab } from "./PurchaseSampleTab";
import CoinInfoDetails from "./CoinInfoTabs";

export const TradeMusic = () => {
  return (
    <div className="w-full bg-grey-900 rounded-2xl py-4 px-3 space-y-5 text-sm md:col-span-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Avatar src={"/assets/images/artists/artist-1.avif"} />
          <p className="text-sm">Jose Amiron</p>
        </div>
        <div className="flex gap-4 items-center">
          <p>2d</p>
          <BiShare className="text-xl cursor-pointer" />
          <div className="p-2 cursor-pointer">
            <BsThreeDots />
          </div>
        </div>
      </div>
      <p className="text-xl md:text-3xl font-semibold">@durga</p>
      <div className="grid grid-cols-3 rounded-md border-[1px] border-grey-700 text-[13px]">
        <div className="flex flex-col items-center p-4 px-1 justfity-center border-r-[1px] border-grey-700">
          <p className="text-center text-grey-300">Market Cap</p>
          <div className="flex items-center gap-1">
            <TbTrendingUp />
            <p className="text-primary text-sm">$250.56</p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 px-1 justfity-center border-r-[1px] border-grey-700">
          <p className="text-center text-grey-300">Total Volume</p>
          <div className="flex items-center gap-1">
            <GoFlame />
            <p className="text-sm">$1550.56</p>
          </div>
        </div>
        <div className="flex flex-col items-center p-4 px-1 justfity-center border-r-[1px] border-grey-700">
          <p className="text-center text-grey-300">Artist Earnings</p>
          <div className="flex items-center gap-1">
            <BiCoinStack />
            <p className="text-sm">$1550.56</p>
          </div>
        </div>
      </div>

      <div>
        <PurchaseSampleTab />
      </div>

      <div>
        <CoinInfoDetails />
      </div>
    </div>
  );
};
