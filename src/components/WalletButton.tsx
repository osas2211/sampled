/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from "react";
import { Button, Text, Profile } from "@stellar/design-system";
import { useWallet } from "../hooks/useWallet";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { connectWallet, disconnectWallet } from "../util/wallet";
import { Modal, message } from "antd";
import { CopyOutlined, DisconnectOutlined } from "@ant-design/icons";

export const WalletButton = () => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const { address, isPending } = useWallet();
  const { xlm } = useWalletBalance();
  const buttonLabel = isPending ? "Loading..." : "Connect";

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address || "");
    message.success("Address copied to clipboard");
  };

  if (!address) {
    return (
      <Button
        variant="primary"
        size="md"
        onClick={() => void connectWallet()}
        className="bg-primary hover:bg-primary/90 transition-all duration-200"
      >
        {buttonLabel}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Text as="div" size="sm" className="md:flex items-center gap-2 hidden">
        <span className="text-grey-300">Balance:</span>
        <span className="font-medium">{xlm} XLM</span>
      </Text>

      <Modal
        open={showDisconnectModal}
        onCancel={() => setShowDisconnectModal(false)}
        footer={null}
        width={420}
        className="wallet-modal"
        closeIcon={null}
      >
        <div className="p-0 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-grey-0">Wallet Connected</h3>
            <p className="text-grey-300">Manage your wallet connection</p>
          </div>

          {/* Address Display */}
          <div className="bg-grey-900 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-grey-300 text-sm">Address</span>
              <button
                onClick={copyAddress}
                className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm"
              >
                <CopyOutlined /> Copy
              </button>
            </div>
            <code className="text-grey-0 break-all text-sm">{address}</code>
          </div>

          {/* Balance Display */}
          <div className="bg-grey-900 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-grey-300">Balance</span>
              <span className="text-grey-0 font-medium">{xlm} XLM</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-5">
            <Button
              size="md"
              variant="primary"
              onClick={() => {
                void disconnectWallet().then(() =>
                  setShowDisconnectModal(false),
                );
              }}
              className="w-full !bg-red-500 hover:!bg-red-600 !border-none cursor-pointer flex items-center justify-center gap-2 h-[45px] rounded-md"
            >
              <DisconnectOutlined /> Disconnect Wallet
            </Button>
            <Button
              size="md"
              variant="tertiary"
              onClick={() => setShowDisconnectModal(false)}
              className="cursor-pointer w-full !border-grey-700 !text-grey-0 hover:!border-grey-600 h-10 rounded-md hover:!bg-grey-900"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <div className="bg-white rounded-md text-black">
        <Profile
          publicAddress={address}
          size="md"
          isShort
          onClick={() => setShowDisconnectModal(true)}
          // className="cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>
  );
};
