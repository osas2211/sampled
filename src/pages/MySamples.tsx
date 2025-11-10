/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from "antd";
import { MySamples } from "../components/explore/MySamples";
import { useWallet } from "../hooks/useWallet";
import { connectWallet } from "../util/wallet";

const MySamplesPage = () => {
  const { address } = useWallet();
  if (!address) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p>Please connect your wallet</p>
          <Button
            type="primary"
            className="w-[150px] md:!h-[42px] !h-[35px] !rounded-full font-semibold"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <MySamples />
    </div>
  );
};

export default MySamplesPage;
