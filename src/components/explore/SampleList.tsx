import { useState } from "react";
import { Empty, Input } from "antd";
import { CgSearch } from "react-icons/cg";
import { LuLayoutGrid } from "react-icons/lu";
import { LiaListUlSolid } from "react-icons/lia";
import { SampleCard } from "./SampleCard";
import { SampleListCard } from "./SampleListCard";
import { SamplesSkeletonLoader } from "./SamplesSkeletonLoader";
import { Sample } from "sampled";
import { MdMusicNote } from "react-icons/md";

interface propsI {
  title: string;
  data: Sample[];
  isLoading: boolean;
}

export const SampleList = ({ title, data, isLoading }: propsI) => {
  const [isGrid, setIsGrid] = useState(true);
  if (isLoading) {
    return <SamplesSkeletonLoader />;
  }
  if (data?.length === 0) {
    return (
      <div className="mt-10 md:mt-20">
        <Empty
          description="No Sample available"
          image={<MdMusicNote size={100} className="text-primary" />}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <p className="md:text-3xl text-xl font-arvo font-bold capitalize">
          {title}
        </p>
        <div className="md:inline-flex flex gap-5 items-center md:justify-start justify-between text-sm md:w-auto w-full">
          <div className="hidden md:block">
            <Input
              placeholder="Search title, musician.."
              className="h-[45px] bg-dark-800 border-0 hover:border-[1px] active:border-[1px] md:w-[250px] w-full"
              prefix={<CgSearch className="text-primary" />}
            />
          </div>
          <div className="flex bg-dark-700/70 rounded-md">
            <div
              className={`p-3 rounded-md cursor-pointer ${
                isGrid ? "bg-primary text-black" : ""
              }`}
              onClick={() => setIsGrid(true)}
            >
              <LuLayoutGrid size={20} />
            </div>
            <div
              className={`p-3 rounded-md cursor-pointer ${
                !isGrid ? "bg-primary text-black" : ""
              }`}
              onClick={() => setIsGrid(false)}
            >
              <LiaListUlSolid size={21} />
            </div>
          </div>
        </div>
        <div className="md:hidden w-full">
          <Input
            placeholder="Search title, musician.."
            className="h-[45px] bg-dark-800 border-0 hover:border-[1px] active:border-[1px] md:w-[250px] w-full"
            prefix={<CgSearch className="text-primary" />}
          />
        </div>
      </div>
      <div className="my-5 md:my-8">
        {isGrid ? (
          <GridView samples={data ?? []} />
        ) : (
          <ListView samples={data ?? []} />
        )}
      </div>
    </div>
  );
};

const GridView = ({ samples }: { samples: Sample[] }) => {
  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
        {samples?.map((sample, index) => {
          return <SampleCard sample={sample} key={index} />;
        })}
      </div>
    </>
  );
};

const ListView = ({ samples }: { samples: Sample[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        {samples?.map((sample, index) => {
          return (
            <SampleListCard sample={sample} key={index} index={index + 1} />
          );
        })}
      </div>
    </>
  );
};
