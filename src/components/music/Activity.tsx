import { Avatar, Tag } from "antd";
import React from "react";

export const Activity = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar src="/zorb.svg" />
          <p>johnson</p>
        </div>
        <Tag color="green" className="!text-[14px]">
          Buy
        </Tag>
        <p>1.7m</p>
        <div className="text-grey-300">$0.36</div>
        <div className="text-grey-300">2d</div>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar src="/zorb.svg" />
          <p>success</p>
        </div>
        <Tag color="green" className="!text-[14px]">
          Buy
        </Tag>
        <p>1.0m</p>
        <div className="text-grey-300">$0.26</div>
        <div className="text-grey-300">4d</div>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar src="/base.svg" />
          <p>johnson</p>
        </div>
        <Tag color="red" className="!text-[14px]">
          Sell
        </Tag>
        <p>900k</p>
        <div className="text-grey-300">$1.01</div>
        <div className="text-grey-300">4d</div>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar src="/zorb.svg" />
          <p>success</p>
        </div>
        <Tag color="green" className="!text-[14px]">
          Buy
        </Tag>
        <p>1.0m</p>
        <div className="text-grey-300">$0.26</div>
        <div className="text-grey-300">4d</div>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar src="/base.svg" />
          <p>johnson</p>
        </div>
        <Tag color="red" className="!text-[14px]">
          Sell
        </Tag>
        <p>900k</p>
        <div className="text-grey-300">$1.01</div>
        <div className="text-grey-300">4d</div>
      </div>
    </div>
  );
};
