import { Slider } from "antd";
import React from "react";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import {
  MdOutlinePlayCircleFilled,
  MdPauseCircleFilled,
  MdFastForward,
  MdFastRewind,
  MdClose,
} from "react-icons/md";
// import { useAudioPlayer } from "../../hooks/useAudioPlayer"
import { useAudioPlayerContext } from "../../context/audio-player-context";

interface PlayerProps {
  skipSeconds?: number;
}

export const Player = ({ skipSeconds = 10 }: PlayerProps) => {
  const { currentTrack, isPlayerVisible, hidePlayer, audioPlayer } =
    useAudioPlayerContext();

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    progress,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    formatTime,
  } = audioPlayer;

  const handleProgressChange = (value: number) => {
    const newTime = (value / 100) * duration;
    seek(newTime);
  };

  const handleVolumeChange = (value: number) => {
    changeVolume(value / 100);
  };

  const handleFastForward = () => {
    const newTime = Math.min(currentTime + skipSeconds, duration);
    seek(newTime);
  };

  const handleRewind = () => {
    const newTime = Math.max(currentTime - skipSeconds, 0);
    seek(newTime);
  };

  if (!isPlayerVisible || !currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-[5rem] bg-grey-1000 z-[100] flex md:flex-row flex-col items-center justify-between gap-4 px-4 py-3 animate-slide-up">
      <div className="md:flex hidden gap-2 items-end">
        <img
          className="w-[3.7rem] h-[3.7rem] rounded-md object-cover object-top shadow-2xl shadow-grey-900"
          src={currentTrack.artwork}
          alt={currentTrack.title}
        />
        <div className="text-sm">
          <p>{currentTrack.title}</p>
          <p className="text-sm text-grey-300">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex md:flex-col flex-col-reverse">
        <div className="flex items-center justify-center gap-4">
          <MdFastRewind
            className="text-[25px] md:text-[35px] cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleRewind}
            title={`Rewind ${skipSeconds}s`}
          />

          {isLoading ? (
            <div className="w-[25px] md:w-[35px] h-[25px] md:h-[35px] border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {isPlaying ? (
                <MdPauseCircleFilled
                  className="text-[25px] md:text-[35px] cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={togglePlay}
                />
              ) : (
                <MdOutlinePlayCircleFilled
                  className="text-[25px] md:text-[35px] cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={togglePlay}
                />
              )}
            </>
          )}

          <MdFastForward
            className="text-[25px] md:text-[35px] cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleFastForward}
            title={`Forward ${skipSeconds}s`}
          />
        </div>

        <div>
          <div className="flex items-center gap-1 text-sm text-grey-300">
            <p className="min-w-[40px]">{formatTime(currentTime)}</p>
            <Slider
              className="md:!w-[700px] !w-[70vw]"
              value={progress}
              onChange={handleProgressChange}
              styles={{
                track: { background: "#fff" },
                handle: { display: "none" },
              }}
              tooltip={{ formatter: null }}
            />
            <p className="min-w-[40px]">{formatTime(duration)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="md:flex hidden items-center gap-1">
          <button
            onClick={toggleMute}
            className="hover:opacity-70 transition-opacity"
          >
            {isMuted || volume === 0 ? (
              <BiVolumeMute className="text-[20px]" />
            ) : (
              <BiVolumeFull className="text-[20px]" />
            )}
          </button>
          <Slider
            className="!w-[200px]"
            value={(isMuted ? 0 : volume) * 100}
            onChange={handleVolumeChange}
            styles={{
              track: { background: "#fff" },
              handle: { display: "none" },
            }}
            tooltip={{ formatter: null }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={hidePlayer}
          className="hover:opacity-70 transition-opacity"
          title="Close player"
        >
          <MdClose className="text-[20px] md:text-[24px]" />
        </button>
      </div>
    </div>
  );
};
