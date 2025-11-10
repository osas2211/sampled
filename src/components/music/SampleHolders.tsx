import { Avatar, Tag } from "antd";
import { RiDiscLine } from "react-icons/ri";

export const SampleHolders = () => {
  const holders = [];
  if (holders.length === 0) {
    return (
      <div className="h-[17rem] flex flex-col justify-center items-center">
        <RiDiscLine size={80} className="text-grey-400" />
        <p className="text-[16px]">No purchase yet</p>
        <p className="text-grey-300">Be the first to make a purchase</p>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="pr-2">1.</span>
          <Avatar src="/zorb.svg" />
          <p>Market</p>
        </div>
        <Tag color="success" className="!text-[14px]">
          95.643%
        </Tag>
      </div>
    </div>
  );
};
