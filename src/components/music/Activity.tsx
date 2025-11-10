import { RiDiscLine } from "react-icons/ri";

export const Activity = () => {
  return (
    <div className="h-[17rem] flex flex-col justify-center items-center">
      <RiDiscLine size={80} className="text-grey-400" />
      <p className="text-[16px]">Remix sample</p>
      <p className="text-grey-300">Remix feature coming soon</p>
    </div>
  );
};
