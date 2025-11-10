import { useParams } from "react-router-dom";
import { SampleList } from "./SampleList";
import { GoBack } from "../shared/GoBack";
import { useGetAllSamples } from "../../hooks/useSampledContract";

export const MarketPlace = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetAllSamples();

  return (
    <div className="min-h-[90vh] w-full bg-grey-900 rounded-2xl py-4 pl-3 md:pl-6 space-y-5 md:space-y-10">
      <div className="md:p-2">
        <GoBack />
        <h2 className="md:text-5xl text-lg font-arvo font-semibold mt-6">
          Explore Market
        </h2>
        <p className="md:text-lg md:mt-3 mt-2 max-w-[450px] font-sequel">
          Discover wide range of samples from your favorite producers and
          artistes
        </p>

        <div className="mt-5 md:mt-10">
          <div>
            <SampleList
              title={id ? `${id} samples` : "Samples"}
              data={data || []}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
