"use client";
import { Avatar, Button } from "antd";
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa6";
import { MdOutlineArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import { truncateString } from "../../util/string-helpers";
import { SiStellar } from "react-icons/si";
import {
  stroopsToXlm,
  useGetUserEarnings,
  useGetUserSamples,
} from "../../hooks/useSampledContract";
import { WithdrawEarningsModal } from "./WithdrawEarningsModal";

export const UserProfile = () => {
  const { address } = useWallet();
  const { data: user_samples } = useGetUserSamples();
  const { data: earnings } = useGetUserEarnings();

  const hits = user_samples?.reduce((prev, curr) => prev + curr.total_sales, 0);
  return (
    <div className="relative overflow-hidden">
      <div className="absolute bottom-0 left-0 bg-primary-default md:w-[7rem] md:h-[7rem] h-[4rem] w-[4rem] rounded-full"></div>
      <div className="w-full md:p-6 md:px-10 p-4 rounded-xl md:flex items-center justify-between gap-3 flex-wrap bg-dark-800/55 border-[1px] border-white/5 relative backdrop-blur-[50px]">
        <div className="flex items-center gap-4">
          <Avatar
            src="/favicon.ico"
            className="md:w-[160px] md:h-[160px] w-[90px] h-[90px]"
          />
          <div className="md:space-y-5 space-y-3">
            <p className="md:text-3xl text-lg font-arvo font-semibold">
              @Stellar
            </p>
            <div className="bg-white/5 border-[1px] border-white/10 rounded-full backdrop-blur-[25px] p-2 px-3 inline-block">
              <div className="flex items-center gap-2">
                <SiStellar className="text-orange-400" size={20} />
                <p className="text-sm">{truncateString(address ?? "")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to={""} target="_blank">
                <FaInstagram size={21} />
              </Link>
              <Link to={""} target="_blank">
                <BsTwitterX size={21} />
              </Link>
              <Link to={""} target="_blank">
                <FaFacebook size={21} />
              </Link>
              <Link to={""} target="_blank">
                <FaDiscord size={21} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:gap-x-[4rem] md:gap-y-5 gap-4 grid-cols-2 md:my-0 my-10">
          <div>
            <p className="text-sm text-white/80">Account</p>
            <p className="text-sm font-semibold bg-primary px-2 py-1 rounded-full text-center text-black">
              Active
            </p>
          </div>
          <div>
            <p className="text-sm text-white/80">Samples</p>
            <p className="text-[17px] font-semibold">{user_samples?.length}</p>
          </div>
          <div>
            <p className="text-sm text-white/80">Earnings</p>
            <p className="text-[17px] font-semibold">
              {stroopsToXlm(earnings ?? 0)} XLM
            </p>
          </div>
          <div>
            <p className="text-sm text-white/80">Sample Hits</p>
            <p className="text-[17px] font-semibold">{hits}</p>
          </div>
        </div>

        <div>
          <div className="flex flex-row md:w-auto w-full md:flex-col gap-4 md:gap-7">
            <WithdrawEarningsModal />
            <Link to={"/market/all"} className="block md:w-auto w-full">
              <Button
                icon={<MdOutlineArrowForward />}
                iconPosition="end"
                className="w-full bg-gradient-to-t from-primary-default/20 to-primary-default/0 border-primary-default"
                size="large"
              >
                Market
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
