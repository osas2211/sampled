import { Input } from "antd";

import { PiLockFill } from "react-icons/pi";
import { LiaCommentDotsSolid } from "react-icons/lia";

export const MusicComments = () => {
  return (
    <div>
      <div>
        <Input
          placeholder="Add a comment..."
          className="h-[45px] !bg-grey-700"
          disabled
          suffix={
            <div className="flex items-center gap-1 text-grey-300">
              <p>Comment feature coming soon</p>
              <PiLockFill />
            </div>
          }
        />
      </div>
      <div className="h-[17rem] flex flex-col justify-center items-center">
        <LiaCommentDotsSolid size={80} className="text-grey-400" />
        <p className="text-[16px]">No comment yet</p>
        <p className="text-grey-300">Be the first to add a comment</p>
      </div>
    </div>
  );
};
