/* eslint-disable @typescript-eslint/no-misused-promises */

import { Logo } from "./Logo";
import { RiHome4Line } from "react-icons/ri";
import { CgPlayList } from "react-icons/cg";
import { MdOutlineEventNote } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { Avatar, Button } from "antd";
import { CiMenuFries } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import { connectWallet } from "../../util/wallet";
import { WalletButton } from "../WalletButton";

export const InAppHeader = () => {
  const pathname = useLocation().pathname;
  const { address } = useWallet();

  return (
    <div className="py-4 pb-3 md:py-4 bg-black/80 backdrop-blur-[50px] md:px-4 px-2 md:space-y-0 space-y-5">
      <div className="flex items-center justify-between gap-4 ">
        <Logo />
        <div>
          <nav className="md:flex hidden items-center gap-3">
            <div className="flex items-center justify-between gap-4 bg-grey-800 rounded-full md:px-10 px-5 h-[45px] md:w-[370px] w-full">
              <Link
                to={"/explore"}
                className={`flex items-center gap-2 ${
                  pathname.includes("/explore") ? "text-white" : "text-grey-300"
                }`}
              >
                <RiHome4Line />
                <p>Home</p>
              </Link>
              <Link
                to={"/upload-sample"}
                className={`flex items-center gap-2 ${
                  pathname.includes("/upload-sample")
                    ? "text-white"
                    : "text-grey-300"
                }`}
              >
                <CgPlayList />
                <p>Upload</p>
              </Link>
              <Link
                to={"/my-samples"}
                className={`flex items-center gap-2 ${
                  pathname.includes("/my-samples")
                    ? "text-white"
                    : "text-grey-300"
                }`}
              >
                <MdOutlineEventNote />
                <p>My Samples</p>
              </Link>
            </div>
            <div className="h-[45px] w-[45px] bg-grey-800 rounded-full flex items-center justify-center">
              <Avatar src="/favicon.ico" size={25} />
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {address ? (
            <WalletButton />
          ) : (
            <Button
              type="primary"
              className="w-[150px] md:!h-[42px] !h-[35px] !rounded-full font-semibold"
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          )}
          <CiBellOn size={24} className="md:block hidden" />
          <Avatar
            size={45}
            src="/assets/images/avatars/avatar-1.avif"
            className="!border-[5px] !border-grey-500 cursor-pointer md:!block !hidden"
          />
          <CiMenuFries size={24} className="md:hidden block" />
        </div>
      </div>
      <div className="md:hidden block">
        <nav className="flex items-center gap-3">
          <div className="flex items-center justify-between gap-4 bg-grey-800 rounded-full md:px-10 px-5 h-[45px] md:w-[370px] w-[90%] text-sm">
            <Link
              to={"/explore"}
              className={`flex items-center gap-2 ${
                pathname.includes("/explore") ? "text-white" : "text-grey-300"
              }`}
            >
              <RiHome4Line />
              <p>Home</p>
            </Link>
            <Link
              to={""}
              className={`flex items-center gap-2 ${
                pathname.includes("/upload-sample")
                  ? "text-white"
                  : "text-grey-300"
              }`}
            >
              <CgPlayList />
              <p>Upload</p>
            </Link>
            <Link
              to={""}
              className={`flex items-center gap-2 ${
                pathname.includes("/my-samples")
                  ? "text-white"
                  : "text-grey-300"
              }`}
            >
              <MdOutlineEventNote />
              <p>My samples</p>
            </Link>
          </div>
          <div className="h-[40px] w-[40px] bg-grey-800 rounded-full flex items-center justify-center">
            <Avatar src="/favicon.ico" size={15} />
          </div>
        </nav>
      </div>
    </div>
  );
};
