/* eslint-disable  @typescript-eslint/no-misused-promises, @typescript-eslint/no-floating-promises */

import { Avatar, Button, Modal } from "antd";
import { useState } from "react";
import { SiStellar } from "react-icons/si";
import {
  stroopsToXlm,
  useGetUserEarnings,
  useWithdrawEarnings,
} from "../../hooks/useSampledContract";
import { useWalletBalance } from "../../hooks/useWalletBalance";
import { useWallet } from "../../hooks/useWallet";
import { connectWallet } from "../../util/wallet";
import { toast } from "sonner";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const WithdrawEarningsModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: earnings, refetch: refetchEarnings } = useGetUserEarnings();
  const { updateBalance } = useWalletBalance();
  const { address } = useWallet();
  const { mutate, isPending } = useWithdrawEarnings();

  const handleWithdraw = async () => {
    if (!address) {
      await connectWallet();
      return;
    }

    mutate(address, {
      onSuccess: async (data) => {
        // Refetch purchase status
        toast.success("Success", {
          className: "!bg-primary !border-0",
          description: "Earnings withdrawn successfully!",
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
        refetchEarnings();
        await updateBalance();
        setOpenModal(false);
        location.reload();
      },
    });
  };
  return (
    <div>
      <Modal
        open={openModal}
        title={<p className="font-normal underline">Withdraw earnings</p>}
        okText={"Withdraw"}
        onOk={handleWithdraw}
        onCancel={() => setOpenModal(false)}
        confirmLoading={isPending}
        centered
        width={400}
        cancelButtonProps={{
          disabled: isPending,
        }}
        styles={{
          content: { padding: 16, borderRadius: "12px" },
          mask: { backdropFilter: "blur(12px)" },
        }}
      >
        <div className="space-y-4 mt-5">
          <div>
            <p>Amount to withdraw:</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar src="/favicon.ico" size={24} />
              <p className="text-lg">{stroopsToXlm(earnings || 0)} XLM</p>
            </div>
          </div>
          <div className="bg-amber-500/10 p-3 rounded-lg">
            <p className="text-amber-500 text-sm">
              Please ensure you have full access to this wallet before
              withdrawing the earnings on your end. This action cannot be
              undone.
            </p>
          </div>
        </div>
      </Modal>

      {stroopsToXlm(earnings || 0) > 0 && (
        <Button
          icon={<SiStellar />}
          iconPosition="end"
          className="w-full bg-gradient-to-t from-primary-default/20 to-primary-default/0 border-primary-default"
          size="large"
          type="primary"
          onClick={() => setOpenModal(true)}
        >
          Withdraw Earnings
        </Button>
      )}
    </div>
  );
};
