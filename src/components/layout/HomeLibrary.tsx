import { HiOutlineArrowRight } from "react-icons/hi";
import { GrAdd } from "react-icons/gr";
import { LuLibrary } from "react-icons/lu";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const HomeLibrary = () => {
  return (
    <div className="min-h-[91vh] bg-grey-900 rounded-2xl py-4 px-3 space-y-5 sticky top-[5rem] left-0">
      <div className="text-grey-300 flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <LuLibrary />
          <p>Your Library</p>
        </div>
        <div className="flex items-center gap-5">
          <GrAdd />
          <HiOutlineArrowRight />
        </div>
      </div>

      <div className="bg-grey-800 py-4 px-5 rounded-xl">
        <p className="text-lg mb-2">Upload and monetize a sample</p>
        <p className="text-sm mb-5 text-grey-200">
          It&apos;s easy, we will help you.
        </p>
        <Link to={"/upload-sample"}>
          <Button
            className="!bg-white w-[140px] !h-[40px] !rounded-full"
            type="primary"
          >
            Create sample
          </Button>
        </Link>
      </div>

      <div className="bg-grey-800 py-4 px-5 rounded-xl">
        <p className="text-lg mb-2">View samples</p>
        <p className="text-sm mb-5 text-grey-200">
          View purchased and created samples
        </p>
        <Link to="/my-samples">
          <Button
            className="!bg-white w-[140px] !h-[40px] !rounded-full"
            type="primary"
          >
            Browse samples
          </Button>
        </Link>
      </div>
    </div>
  );
};
