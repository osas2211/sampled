import { Avatar, Tag } from "antd";
import React from "react";

export const SampleHolders = () => {
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

      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="pr-2">2.</span>
          <Avatar src="/assets/images/artists/artist-1.avif" />
          <p>Creator</p>
        </div>
        <Tag color="blue" className="!text-[14px]">
          2%
        </Tag>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="pr-2">3.</span>
          <Avatar src="/assets/images/artists/artist-3.avif" />
          <p>justice</p>
        </div>
        <Tag className="!text-[14px]">0.637%</Tag>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="pr-2">4.</span>
          <Avatar src="/assets/images/artists/artist-4.avif" />
          <p>recasterr</p>
        </div>
        <Tag className="!text-[14px]">0.337%</Tag>
      </div>
    </div>
  );
};
