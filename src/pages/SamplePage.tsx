import { Avatar } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { PiPlayCircleDuotone } from "react-icons/pi";
import { TradeSample } from "../components/music/TradeSample";
import { useGetUserSamples } from "../hooks/useSampledContract";

const lyrics = `
How long 'til it feels like the wounds finally starting to heal
How long 'til it feels like I'm more than a spoke in a wheel

Most nights I feel that I'm not enough
I've had my share of Monday mornings where can't get up
When hope is lost and I come undone

I swear to God I survive
If it kills me to
I'ma get up and try
If it's the last thing I do
I still got something to give
Oh, it hurts some times
I'm gonna get up and live
Until the day that I die
I swear to God I survive
I swear to God that I survive

How long 'til you know that
How far will you go to get back to he place you belong?

Most nights I feel that I'm not enough
But I refuse to spend my best years rollin' in the sun
So when hope is lost and I come undone

I swear to God I survive
If it kills me to
I'ma get up and try
If it's the last thing I do
I still got something to give
Oh, it hurts some times
I'm gonna get up and live
Until the day that I die
I swear to God I survive
I swear to God I survive`;

const SamplePage = () => {
  const { data } = useGetUserSamples();
  console.log(data);
  return (
    <div className="grid md:grid-cols-7 gap-2 min-h-[91vh]">
      <div className="md:col-span-5">
        <div className="h-[19rem] bg-grey-600 rounded-t-xl py-6 pt-9 px-6 flex items-end gap-4">
          <img
            className="w-[15rem] h-full rounded-md object-cover object-top shadow-2xl shadow-grey-900"
            src={"/assets/images/artists/artist-2.png"}
          />
          <div>
            <p>Song</p>
            <h2 className="md:text-[9vh] font-semibold leading-[1.2]">
              99 (feat.Daecolm)
            </h2>
            <div className="flex gap-2 items-center">
              <Avatar src={"/assets/images/artists/artist-1.avif"} />
              <p>
                <strong>Jose</strong>,{" "}
                <span className="text-grey-200">2025. 9,326,293</span>
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-[60vh] bg-gradient-to-b from-grey-700 to-grey-1000 rounded-b-xl md:p-6 p-3 md:space-y-8 space-y-5">
          <div>
            <div className="flex items-center gap-5">
              <PiPlayCircleDuotone className="text-[40px] md:text-[60px] text-primary" />
              <GrAddCircle size={27} />
              <BsThreeDots />
              {/* <PiPauseCircleDuotone className="text-[40px] md:text-[60px] text-primary" /> */}
            </div>
          </div>

          <div className="md:max-w-[20vw]">
            <p className="text-lg md:text-xl mb-4">Lyrics</p>
            <p className="text-grey-200 leading-[1.6]  md:max-h-[35vh] overflow-y-auto scrollbar-hide">
              {lyrics}
            </p>
          </div>
        </div>
      </div>
      <TradeSample />
    </div>
  );
};

export default SamplePage;
