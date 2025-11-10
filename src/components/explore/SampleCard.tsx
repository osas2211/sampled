import { Avatar } from "antd";
import { BiPlay, BiUser } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { Sample } from "../../@types/stellar-generated";
import { Link } from "react-router-dom";

interface propsI {
  sample: Sample;
}

export const SampleCard = ({ sample }: propsI) => {
  return (
    <>
      <div className="p-3 rounded-2xl border-[1px] border-white/10 relative overflow-hidden">
        <div className="absolute top-5 right-5 bg-white/15 rounded-full backdrop-blur-[15px] z-[2] p-2 px-4">
          <div className="flex items-center gap-2">
            <BsFire className="text-red-500" />
          </div>
        </div>

        <div className="relative h-[25rem] w-full z-[1]">
          <img
            src={sample?.cover_image || "/favicon.ico"}
            alt=""
            // fill
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 h-[11rem] w-full rounded-b-xl bg-black/15 backdrop-blur-[15px] z-[2] p-3">
            <p className="text-xl font-arvo">{sample?.title}</p>
            <div className="flex items-center gap-1">
              <Avatar src={sample?.cover_image || "/favicon.ico"}>
                <BiUser />
              </Avatar>
              <p className="text-sm truncate max-w-20">{sample?.seller}</p>
            </div>

            <div className="relative bg-white/5 p-2 rounded-full mt-4  backdrop-blur-[7px] text-sm border-[1px] border-white/10 flex items-center gap-2 justify-between">
              <div>
                <Avatar size={38} className="bg-dark-1000" src="/favicon.ico">
                  <BsFire className="text-red-500" size={14} />
                </Avatar>
              </div>
              <div className="flex gap-2 text-center">
                <div>
                  <p>Sample Hits</p>
                  <p className="text-red-200">{sample?.total_sales}</p>
                </div>
              </div>

              <Link to={`/sample/${sample?.id}`}>
                <div>
                  <Avatar
                    size={38}
                    className="backdrop-blur-[7px] border-[1px] border-white/10 bg-white/5"
                  >
                    <BiPlay className="text-primary-default" size={25} />
                  </Avatar>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
