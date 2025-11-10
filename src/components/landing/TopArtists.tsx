import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const artists = [
  {
    name: "Austin Ally",
    bio: "Started off as the little girl from Rosario, now at the top. She has released good samples and has tremenduos following.",
    pic: "/assets/images/artists/artist-1.avif",
    joined: "June 6, 2025",
  },
  {
    name: "Jerry Dawson",
    bio: "Started off as the little boy from Rosario, now at the top. He has released good samples and has tremenduos following.",
    pic: "/assets/images/artists/artist-2.png",
    joined: "June 6, 2025",
  },
  {
    name: "Russo Amiron",
    bio: "Started off as the little girl from Rosario, now at the top. She has released good samples and has tremenduos following.",
    pic: "/assets/images/artists/artist-3.avif",
    joined: "June 6, 2025",
  },
  {
    name: "Lucas Baker",
    bio: "Started off as the little boy from Rosario, now at the top. He has released good samples and has tremenduos following.",
    pic: "/assets/images/artists/artist-5.avif",
    joined: "June 6, 2025",
  },
];

export const TopArtists = () => {
  return (
    <div className="relative">
      <div className="border-y-[1px] border-grey-400 grid md:grid-cols-3 grid-cols-1">
        <div className="p-4 md:p-8 md:py-12 md:border-r-[1px] md:border-grey-400 md:min-h-[60vh] min-h-[130px]">
          <p className="text-xs text-grey-200 uppercase">[ this week ]</p>
          <p className="md:text-5xl text-lg md:my-5 my-2">Top Artists</p>
          <Link
            to={"/explore"}
            className="text-primary uppercase text-lg md:text-[18px] font-pixter hero-click-to-explore hero-caption relative"
          >
            [ {"explore samples"} ]
          </Link>
        </div>
        <div className="col-span-2">
          <div className="">
            {artists.map((artist, index) => {
              return (
                <div key={index} className="flex md:flex-row flex-col">
                  {index % 2 != 0 ? (
                    <>
                      <div className="md:w-[50%] h-[30rem] 2xl:h-[35rem] border-t-[1px] md:border-l-[1px] border-l-[0px] border-grey-400 md:p-0 p-4">
                        <img
                          src={artist?.pic}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="md:w-[50%] md:h-[30rem] 2xl:h-[35rem] md:border-t-[1px] md:border-grey-400 p-4 md:p-8 md:py-12 flex flex-col gap-7 justify-between">
                        <div>
                          <p className="text-xs text-grey-200 uppercase">
                            Artist
                          </p>
                          <p className="md:text-3xl text-lg md:my-3 my-2">
                            {artist.name}
                          </p>
                          <p className="md:max-w-[65%]">{artist.bio}</p>
                        </div>

                        <div>
                          <div className="mb-5">
                            <p className="text-sm text-primary uppercase">
                              joined:
                            </p>
                            <p className="font-medium">June 6, 2025</p>
                          </div>
                          <Link to={""}>
                            <FiArrowUpRight className="md:text-4xl text-2xl text-primary" />
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-[50%] md:h-[30rem] 2xl:h-[35rem] md:border-t-[1px] md:border-grey-400 p-4 md:p-8 md:py-12 flex flex-col gap-7 justify-between md:order-1 order-2">
                        <div>
                          <p className="text-xs text-grey-200 uppercase">
                            Artist
                          </p>
                          <p className="md:text-3xl text-lg md:my-3 my-2">
                            {artist.name}
                          </p>
                          <p className="md:max-w-[65%]">{artist.bio}</p>
                        </div>

                        <div>
                          <div className="mb-5">
                            <p className="text-sm text-primary uppercase">
                              joined:
                            </p>
                            <p className="font-medium">June 6, 2025</p>
                          </div>
                          <Link to={""}>
                            <FiArrowUpRight className="md:text-4xl text-2xl text-primary" />
                          </Link>
                        </div>
                      </div>
                      <div className="md:w-[50%] h-[30rem] 2xl:h-[35rem] border-t-[1px] md:border-l-[1px] border-grey-400 flex items-center justify-center md:order-2 order-1">
                        <img
                          src={artist?.pic}
                          className="w-[80%] h-[80%] object-cover object-top"
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
