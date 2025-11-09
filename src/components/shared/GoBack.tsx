/* eslint-disable @typescript-eslint/no-misused-promises */

import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div
      className="inline-flex gap-2 items-center px-3 py-[10px] rounded-lg bg-white/5 border-white/5 border-[1px] backdrop-blur-[22px] cursor-pointer mb-4 text-green-300"
      onClick={() => navigate(-1)}
    >
      <MdOutlineArrowBack />
      <p className="text-[15px]">Back</p>
    </div>
  );
};
