"use client";
import { useState } from "react";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { RiHeart2Fill } from "react-icons/ri";
import { SampleList } from "./SampleList";
import {
  useGetUserPurchases,
  useGetUserSamples,
} from "../../hooks/useSampledContract";

export const UserProfileTabs = () => {
  const [current, setCurrent] = useState(0);
  const { isLoading, data } = useGetUserPurchases();
  const { isLoading: loadingUserSamples, data: user_samples } =
    useGetUserSamples();

  const items = [
    {
      title: "Samples Created",
      content: (
        <SampleList
          title={""}
          data={user_samples || []}
          isLoading={loadingUserSamples}
        />
      ),
      icon: <PiMusicNotesPlusFill size={19} />,
    },
    {
      title: "Samples Purchased",
      content: (
        <SampleList title={""} data={data || []} isLoading={isLoading} />
      ),
      icon: <RiHeart2Fill size={19} />,
    },
  ];
  return (
    <div className="my-10">
      <div className="flex gap-4">
        {items.map(({ title, icon }, index) => {
          const active = index === current;
          return (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`${
                active ? "text-primary border-b-[1px] border-b-primary" : ""
              } p-2 flex items-center gap-2 cursor-pointer`}
            >
              <div>{icon}</div>
              <p className="md:text-[16px] text-sm">{title}</p>
            </div>
          );
        })}
      </div>
      <div className="md:-my-11">{items[current].content}</div>
    </div>
  );
};
