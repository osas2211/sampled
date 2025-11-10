/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/no-misused-promises */

import { Avatar, Button } from "antd";
import { useWalletBalance } from "../../hooks/useWalletBalance";
import { Sample } from "sampled";
import {
  stroopsToXlm,
  useHasPurchased,
  usePurchaseSample,
} from "../../hooks/useSampledContract";
import { connectWallet } from "../../util/wallet";
import { downloadAudio } from "../../util/download-audio";
import { useWallet } from "../../hooks/useWallet";
import { toast } from "sonner";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const PurchaseSampleTab = ({ sample }: { sample: Sample }) => {
  const { balances, updateBalance } = useWalletBalance();
  const { data: hasPurchased, refetch: refetchPurchaseStatus } =
    useHasPurchased(sample?.id);
  const { mutate: purchaseSample, isPending: isPurchasing } =
    usePurchaseSample();
  const { address } = useWallet();
  const isSeller = address === sample?.seller;

  const handlePurchase = async () => {
    if (!address) {
      await connectWallet();
      return;
    }

    if (!sample) return;

    purchaseSample(sample.id, {
      onSuccess: (data) => {
        // Refetch purchase status
        toast.success("Success", {
          className: "!bg-primary !border-0",
          description: "Sample purchased successfully!",
          duration: 5000,
          icon: <BsCheckCircleFill />,
          action: (
            <Link
              to={`https://stellar.expert/explorer/testnet/tx/${data?.transactionHash}`}
              target="_blank"
              className="underline font-semibold"
            >
              View on explorer
            </Link>
          ),
        });
        refetchPurchaseStatus();
        updateBalance();

        // Optionally auto-download after purchase
        if (data.ipfs_link) {
          setTimeout(() => {
            downloadAudio(data.ipfs_link, `${sample.title}.mp3`);
          }, 2000);
        }
      },
    });
  };

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
        <p className="text-lg md:text-xl">
          Price: {stroopsToXlm(sample?.price)} XLM
        </p>
        {isSeller ? (
          <p className="bg-primary p-1 px-2 text-xs rounded-full text-black">
            Seller
          </p>
        ) : hasPurchased ? (
          <p className="bg-primary p-1 px-2 text-xs rounded-full text-black">
            Purchased
          </p>
        ) : (
          <></>
        )}
      </div>
      {!hasPurchased && !isSeller ? (
        <div className="space-y-2">
          <Button
            className={` w-full !h-[45px]`}
            type="primary"
            size="large"
            loading={isPurchasing}
            onClick={handlePurchase}
          >
            Buy sample
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Button
            className={` w-full !h-[45px]`}
            type="primary"
            size="large"
            onClick={() =>
              downloadAudio(sample?.ipfs_link, `${sample?.title}.mp3`)
            }
          >
            Download sample
          </Button>
        </div>
      )}
    </div>
  );
};
