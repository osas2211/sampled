import { InAppHeader } from "../../components/shared/InAppHeader";
import { HomeLibrary } from "./HomeLibrary";
import { Player } from "../music/Player";
import { Outlet } from "react-router-dom";
import { AudioPlayerProvider } from "../../context/audio-player-context";

const InAppLayout = () => {
  return (
    <AudioPlayerProvider>
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
      </div>
      <Player skipSeconds={10} />
      {/* <Player
        url="https://olive-obliged-capybara-834.mypinata.cloud/ipfs/bafybeifuqooxz2fig7zumpblzeauzpiiy3fzbmafs5ygnmvtt2jih5axee"
        title="99 (feat.Daecolm)"
        artist="@johnson"
        artwork="/assets/images/artists/artist-2.png"
        skipSeconds={15} // Skip 15 seconds instead of default 10
      /> */}
    </AudioPlayerProvider>
  );
};

export default InAppLayout;
