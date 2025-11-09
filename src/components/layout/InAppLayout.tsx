import { InAppHeader } from "../../components/shared/InAppHeader";
import { useState } from "react";
import { HomeLibrary } from "./HomeLibrary";
import { Player } from "../music/Player";
import { Outlet } from "react-router-dom";

const InAppLayout = () => {
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    {
      url: "https://olive-obliged-capybara-834.mypinata.cloud/ipfs/bafybeifuqooxz2fig7zumpblzeauzpiiy3fzbmafs5ygnmvtt2jih5axee",
      title: "99 (feat.Daecolm)",
      artist: "@johnson",
      artwork: "/assets/images/artists/artist-2.png",
    },
    // more tracks...
  ];

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };
  return (
    <div className="pb-4 md:pb-4 space-y-1 relative">
      <div className="sticky top-0 left-0 w-full z-[10]">
        <InAppHeader />
      </div>
      <div className="grid md:grid-cols-5 grid-cols-1 gap-2 relative z-[1] md:px-[10px] px-2">
        <div className="md:block hidden  z-[1] w-full">
          <HomeLibrary />
        </div>
        <div className="md:col-span-4 pb-[5rem]">
          <Outlet />
        </div>
      </div>
      <Player
        url={tracks[currentTrack].url}
        title={tracks[currentTrack].title}
        artist={tracks[currentTrack].artist}
        artwork={tracks[currentTrack].artwork}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default InAppLayout;
