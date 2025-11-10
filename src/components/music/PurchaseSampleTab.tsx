import { Avatar, Button } from "antd";
import { useWalletBalance } from "../../hooks/useWalletBalance";
import { Sample } from "sampled";

export const PurchaseSampleTab = ({ sample }: { sample: Sample }) => {
  const { balances } = useWalletBalance();
  return (
    <div className="pt-4 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="md:text-lg">Purchase</p>
        </div>
        <p>
          <span className="text-grey-300">Balance:</span>{" "}
          {Number(Number(balances[0]?.balance).toFixed(3)).toLocaleString()} XLM
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <Avatar src="/favicon.ico" />
        <p className="text-lg md:text-xl">Price: {sample?.price} XLM</p>
      </div>
      <div className="space-y-2">
        <Button className={` w-full !h-[45px]`} type="primary" size="large">
          Buy sample
        </Button>
      </div>
    </div>
  );
};
