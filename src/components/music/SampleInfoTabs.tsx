import React from "react";
import { Tabs, Tag } from "antd";
import type { TabsProps } from "antd";
import { MusicComments } from "./MusicComments";
import { SampleHolders } from "./SampleHolders";
import { Activity } from "./Activity";
import { SampleDetails } from "./SampleDetails";

const SampleInfoTabs = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <p className=" ml-1 !text-center">Comments</p>,
      children: <MusicComments />,
    },
    {
      key: "2",
      label: (
        <div className=" ml-3 flex items-center gap-2">
          <p className="!text-center">Holders</p>
          <Tag>4</Tag>
        </div>
      ),
      children: <SampleHolders />,
    },
    {
      key: "3",
      label: <p className=" ml-3 !text-center">Activity</p>,
      children: <Activity />,
    },
    {
      key: "4",
      label: <p className=" ml-3 !text-center">Details</p>,
      children: <SampleDetails />,
    },
  ];
  return (
    <div id="coin-info-details">
      <Tabs
        defaultActiveKey="1"
        items={items}
        // indicator={{ align: "center", size: 100 }}
      />
    </div>
  );
};

export default SampleInfoTabs;
