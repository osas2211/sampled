import { Avatar } from "antd";
import { BiCoinStack, BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GoFlame } from "react-icons/go";
import { TbTrendingUp } from "react-icons/tb";
import { PurchaseSampleTab } from "./PurchaseSampleTab";
import SampleInfoTabs from "./SampleInfoTabs";
import { Sample } from "sampled";
import { Link } from "react-router-dom";
import { truncateString } from "../../util/string-helpers";

export const TradeSample = ({ sample }: { sample: Sample }) => {
  return (
    <div className="w-full bg-grey-900 rounded-2xl py-4 px-3 space-y-5 text-sm md:col-span-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Avatar src={sample?.cover_image} />
          <Link
            to={`https://stellar.expert/explorer/testnet/account/${sample?.seller}`}
            target="_blank"
          >
            <p className="text-sm underline">
              {truncateString(sample?.seller)}
            </p>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <BiShare className="text-xl cursor-pointer" />
          <div className="p-2 cursor-pointer">
            <BsThreeDots />
          </div>
        </div>
      </div>
      <p className="text-xl md:text-3xl font-semibold">@stellar</p>
      <div className="grid grid-cols-3 rounded-md border-[1px] border-grey-700 text-[13px]">
        <div className="flex flex-col items-center p-4 px-1 justfity-center border-r-[1px] border-grey-700">
          <p className="text-center text-grey-300">Price</p>
          <div className="flex items-center gap-1">
            <TbTrendingUp />
            <p className="text-primary text-sm">
              {sample?.price?.toLocaleString()} XLM
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 px-1 justfity-center border-r-[1px] border-grey-700">
          <p className="text-center text-grey-300">Total Sales</p>
          <div className="flex items-center gap-1">
            <GoFlame />
            <p className="text-sm">{sample?.total_sales?.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex flex-col items-center p-4 px-1 justfity-center border-r-[1px] border-grey-700">
          <p className="text-center text-grey-300">Status</p>
          <div className="flex items-center gap-1">
            <BiCoinStack />
            <p className="text-sm">
              {sample?.is_active ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <PurchaseSampleTab sample={sample} />
      </div>

      <div>
        <SampleInfoTabs />
      </div>
    </div>
  );
};
