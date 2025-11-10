/* eslint-disable @typescript-eslint/no-misused-promises */

import { Avatar } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { PiPauseCircleDuotone, PiPlayCircleDuotone } from "react-icons/pi";
import { TradeSample } from "../components/music/TradeSample";
import { useAudioPlayerContext } from "../context/audio-player-context";
import { useGetSample, useHasPurchased } from "../hooks/useSampledContract";
import { useParams } from "react-router-dom";
import { truncateString } from "../util/string-helpers";
import { Download } from "lucide-react";
import { downloadAudio } from "../util/download-audio";
import { useWallet } from "../hooks/useWallet";

const SamplePage = () => {
  const { id } = useParams();
  const { data } = useGetSample(id!);
  const { playTrack, audioPlayer } = useAudioPlayerContext();
  const track = {
    url: data?.ipfs_link ?? "",
    title: data?.title ?? "",
    artist: truncateString(data?.seller ?? ""),
    artwork: data?.cover_image || "/favicon.ico",
  };

  const handlePlayTrack = () => {
    playTrack(track);
  };

  const { data: hasPurchased } = useHasPurchased(Number(id));
  const { address } = useWallet();
  const isSeller = address === data?.seller;
  return (
    <>
      <div className="grid md:grid-cols-7 gap-2 min-h-[91vh]">
        <div className="md:col-span-5">
          <div className="h-[19rem] bg-grey-600 rounded-t-xl py-6 pt-9 px-6 flex items-end gap-4 relative">
            <img
              className="absolute top-0 left-0 opacity-10 w-full h-full rounded-md object-cover object-top shadow-2xl shadow-grey-900"
              src={data?.cover_image || "/favicon.ico"}
            />
            <img
              className="w-[15rem] h-full rounded-md object-cover object-top shadow-2xl shadow-grey-900 relative"
              src={data?.cover_image || "/favicon.ico"}
            />
            <div className="relative capitalize">
              <p>{data?.genre} Sample</p>
              <h2 className="md:text-[5vh] font-semibold leading-[1.2]">
                {data?.title ?? ""}{" "}
              </h2>
              <div className="flex gap-2 items-center">
                <Avatar src={data?.cover_image || "/favicon.ico"} />
                <p>
                  <strong className="text-sm">
                    {truncateString(data?.seller ?? "")}
                  </strong>{" "}
                  <span className="text-grey-200">
                    {data?.total_sales ?? "0"} Sales
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[60vh] bg-gradient-to-b from-grey-700 to-grey-1000 rounded-b-xl md:p-6 p-3 md:space-y-8 space-y-5">
            <div>
              <div className="flex items-center gap-5">
                {audioPlayer.isPlaying ? (
                  <PiPauseCircleDuotone
                    className="text-[40px] md:text-[60px] text-primary cursor-pointer"
                    onClick={audioPlayer.togglePlay}
                  />
                ) : (
                  <PiPlayCircleDuotone
                    className="text-[40px] md:text-[60px] text-primary cursor-pointer"
                    onClick={handlePlayTrack}
                  />
                )}
                {(isSeller || hasPurchased) && (
                  <Download
                    size={27}
                    className="cursor-pointer"
                    onClick={() =>
                      downloadAudio(data?.ipfs_link ?? "", `${data?.title}.mp3`)
                    }
                  />
                )}
                <BsThreeDots />
                {/* <PiPauseCircleDuotone className="text-[40px] md:text-[60px] text-primary" /> */}
              </div>
            </div>

            <div className="md:max-w-[25vw]">
              <p className="text-lg md:text-xl mb-4">Fun Fact:</p>
              <div className="text-grey-200 leading-[1.6]  md:max-h-[35vh] overflow-y-auto scrollbar-hide space-y-6">
                <p className="">
                  Sampled showcases why Stellar beats Ethereum for marketplaces:
                  instant payments, negligible fees, and real-time settlement. I
                  chose samples because producers feel the pain of slow payments
                  most acutely. But this same architecture works for any digital
                  commerce. Sampled isn't just a marketplace - it's a movement.
                  Every interaction should feel like you're part of the culture.
                  Getting Sampled isn't just selling a beat, it's validation.
                  It's success. It's making it.
                </p>

                <p>
                  Producers own their work, set their prices, and get paid the
                  moment someone buys their sample. Built for instant, low-cost
                  transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <TradeSample sample={data!} />
      </div>
    </>
  );
};

export default SamplePage;
