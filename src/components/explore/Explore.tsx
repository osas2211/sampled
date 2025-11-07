import { topArtists } from "../../constants/artists";
import { musicGenres } from "../../constants/genres";
import { Avatar } from "antd";
import { RiArrowRightUpLine } from "react-icons/ri";
import { SiMusicbrainz } from "react-icons/si";
import { Link } from "react-router-dom";

const featured = [
  { head: "Top", bgColor: "#FF5733", scope: "Global", sub: "Samples" },
  { head: "Top", bgColor: "#086375", scope: "This week", sub: "Samples" },
  { head: "Top", bgColor: "#3357FF", scope: "Global", sub: "Samples" },
  { head: "Top", bgColor: "#F033FF", scope: "This week", sub: "Samples" },
  { head: "Viral", bgColor: "#FF33F0", scope: "This month", sub: "Samples" },
  { head: "Uprising", bgColor: "#6622CC", scope: "Global", sub: "Artists" },
  { head: "Trending", bgColor: "#034C3C", scope: "This month", sub: "Samples" },
  { head: "Trending", bgColor: "#93032E", scope: "Global", sub: "Artists" },
  { head: "DAO", bgColor: "#854798", scope: "This month", sub: "Picks" },
];

export const Explore = () => {
  const recommended = musicGenres.slice();
  return (
    <div className="min-h-[90vh] w-full bg-grey-900 rounded-2xl py-4 pl-3 md:pl-6 space-y-5 md:space-y-10">
      <div className="md:space-y-4 space-y-2">
        <div className="flex items-center justify-between gap-4 md:pr-6 pr-3">
          <p className="md:text-xl">Explore your genres</p>
          <p className="md:text-sm text-xs text-grey-300">Show more</p>
        </div>
        <div className="flex gap-3 whitespace-nowrap overflow-auto scrollbar-hide">
          {musicGenres.map((genre, index) => {
            return (
              <Link to={""} key={index}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-md bg-grey-700/70 cursor-pointer`}
                >
                  <Avatar
                    src={genre.image}
                    className={`md:!h-[2rem] md:!w-[2rem] !h-[2rem] !w-[2rem] relative transition-all `}
                  ></Avatar>
                  <p className="text-grey-200 md:text-sm text-xs">
                    {genre.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="md:space-y-4 space-y-2">
        <div className="flex items-center justify-between gap-4 md:pr-6 pr-3">
          <p className="md:text-xl">Recommended for you</p>
          <p className="md:text-sm text-xs text-grey-300">Show more</p>
        </div>
        <div className="flex gap-4 whitespace-nowrap overflow-auto scrollbar-hide w-full">
          {recommended.reverse().map((genre, index) => {
            return (
              <Link
                to={"/sample/id"}
                className={`md:space-y-3 space-y-1 rounded-md max-w-[11rem]`}
                key={index}
              >
                <div className="md:w-[11rem] md:h-[11rem] w-[10.2rem] h-[10.2rem]">
                  <img
                    src={genre.image}
                    className={`h-[100%] w-[100%] relative transition-all object-cover rounded-xl`}
                  />
                </div>
                <div className="w-[5rem] md:text-sm text-sm text-grey-200">
                  <p className="">{genre.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="md:space-y-4 space-y-2">
        <div className="flex items-center justify-between gap-4 md:pr-6 pr-3">
          <p className="md:text-xl">Featured charts</p>
          <p className="md:text-sm text-xs text-grey-300">Show more</p>
        </div>
        <div className="flex gap-4 whitespace-nowrap overflow-auto scrollbar-hide w-full">
          {featured.map((feat, index) => {
            return (
              <div className={`md:space-y-3 space-y-1`} key={index}>
                <div
                  className="md:w-[11rem] md:h-[11rem] w-[10.2rem] h-[10.2rem] rounded-xl flex flex-col justify-between"
                  style={{ backgroundColor: feat.bgColor }}
                >
                  <div className="p-2 pb-0 text-grey-100">
                    <SiMusicbrainz />
                  </div>
                  <div className="px-2">
                    <div className="md:text-xl text-lg font-semibold mt-4 uppercase leading-[1.2]">
                      <p>{feat.head}</p>
                      <p>{feat.sub}</p>
                      <p className="text-grey-50">{feat.scope}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-grey-50">
                    <div className="inline-flex bg-white rounded-bl-xl p-[6px]">
                      <RiArrowRightUpLine className="text-night" />
                    </div>
                    <p className="text-sm">Music culture</p>
                  </div>
                </div>
                <div className="w-[5rem] md:text-sm text-sm text-grey-200 flex items-center gap-3 mt-2">
                  <p className="">Powered by Stellar</p>
                  <img src="/favicon.ico" alt="" className="w-5" />
                  {/* <p>Stellar.</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:space-y-4 space-y-2">
        <div className="flex items-center justify-between gap-4 md:pr-6 pr-3">
          <p className="md:text-xl">Popular artists</p>
          <p className="md:text-sm text-xs text-grey-300">Show more</p>
        </div>
        <div className="flex gap-4 md:gap-5 whitespace-nowrap overflow-auto scrollbar-hide w-full">
          {topArtists.map((artist, index) => {
            return (
              <div
                className={`md:gap-y-3 gap-y-1 rounded-md flex items-center justify-center flex-col`}
                key={index}
              >
                <div className="md:w-[10rem] md:h-[10rem] w-[8rem] h-[8rem]">
                  <img
                    src={artist.images[0].url}
                    className={`h-[100%] w-[100%] relative transition-all object-cover rounded-full`}
                  />
                </div>
                <div className="md:text-sm text-sm text-center">
                  <p className="">{artist.name}</p>
                  <p className="text-grey-200">Artist</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:space-y-4 space-y-2">
        <div className="flex items-center justify-between gap-4 md:pr-6 pr-3">
          <p className="md:text-xl">Top albums</p>
          <p className="md:text-sm text-xs text-grey-300">Show more</p>
        </div>
        <div className="flex gap-4 whitespace-nowrap overflow-auto scrollbar-hide w-full">
          {musicGenres.map((genre, index) => {
            return (
              <div
                className={`md:space-y-3 space-y-1 rounded-md max-w-[11rem]`}
                key={index}
              >
                <div className="md:w-[11rem] md:h-[11rem] w-[10.2rem] h-[10.2rem]">
                  <img
                    src={genre.image}
                    className={`h-[100%] w-[100%] relative transition-all object-cover rounded-xl`}
                  />
                </div>
                <div className="w-[5rem] md:text-sm text-sm text-grey-200">
                  <p className="">{genre.name} powered by</p>
                  <p>Sampled.</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
