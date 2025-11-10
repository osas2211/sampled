/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/no-unused-vars */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "./useWallet";
// import sampled from "../contracts/sampled"
import { IUploadSamplePayload } from "../@types/sample";
import * as Client from "./../@types/stellar-generated";
import { rpcUrl } from "../contracts/util";
import { toast } from "sonner";
import { IoCloseCircleSharp } from "react-icons/io5";

export interface IPurchaseSamplePayload {
  buyer: string; // Buyer's address
  sample_id: number; // Sample ID to purchase
}

export interface IPurchaseSampleResponse {
  ipfs_link: string; // IPFS hash for download
  transactionHash: string;
  sample_id: number;
}

// Helper to convert stroops to XLM for display
export const stroopsToXlm = (stroops: bigint | string | number): number => {
  const amount = typeof stroops === "bigint" ? stroops : BigInt(stroops || 0);
  return Number(amount) / 10_000_000;
};

export const useUploadSample = () => {
  const { address, signTransaction } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IUploadSamplePayload) => {
      if (!address) {
        throw new Error("Wallet not connected");
      }
      const response = await client.upload_sample(payload);
      response.needsNonInvokerSigningBy({ includeAlreadySigned: false });
      if (signTransaction) {
        const txResponse = await response.signAndSend({
          force: true,
          signTransaction: signTransaction,
        });
        return {
          id: response,
          transactionHash: txResponse.getTransactionResponse?.txHash ?? "",
          seller: payload.seller,
        };
      }
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["user-samples", data?.seller],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-samples"],
      });
    },
    onError: () => {
      toast.error("Error", {
        className: "!bg-red-500 *:!text-white !border-0",
        description: "Failed to upload sample",
        duration: 5000,
        icon: IoCloseCircleSharp({ size: 24 }),
      });
    },
  });
};

export const useGetUserSamples = () => {
  const { address } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });
  return useQuery({
    queryFn: async () => {
      const { result } = await client.get_user_samples({
        user_address: address!,
      });
      return result;
    },
    queryKey: ["user-samples", address],
  });
};

export const useGetAllSamples = () => {
  const { address } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });
  return useQuery({
    queryFn: async () => {
      const { result } = await client.get_all_samples();
      return result;
    },
    queryKey: ["all-samples"],
  });
};

export const useGetSample = (sample_id: string) => {
  const { address } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });
  return useQuery({
    queryFn: async () => {
      const { result } = await client.get_sample({
        sample_id: Number(sample_id),
      });
      return result.unwrap();
    },
    queryKey: ["single-sample", sample_id],
  });
};

export const usePurchaseSample = () => {
  const { address, signTransaction } = useWallet();
  const queryClient = useQueryClient();

  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });

  return useMutation({
    mutationFn: async (sampleId: number): Promise<IPurchaseSampleResponse> => {
      if (!address) {
        throw new Error("Please connect your wallet first");
      }

      // Prepare the payload
      const payload: IPurchaseSamplePayload = {
        buyer: address,
        sample_id: sampleId,
      };

      console.log("🛒 Purchasing sample:", payload);

      // Call the contract
      const response = await client.purchase_sample(payload);

      // Check if additional signatures are needed
      response.needsNonInvokerSigningBy({ includeAlreadySigned: false });

      if (signTransaction) {
        // Sign and send the transaction
        const result = await response.signAndSend({
          force: true,
          signTransaction: signTransaction,
        });

        console.log("✅ Purchase successful!", result);

        // Extract the IPFS hash from the result
        // The exact structure depends on your contract's return value
        const ipfs_link = result.result.unwrap() || "";

        return {
          ipfs_link: ipfs_link,
          transactionHash: result.getTransactionResponse?.txHash ?? "",
          sample_id: sampleId,
        };
      }

      throw new Error("Unable to sign transaction");
    },
    onSuccess: (data) => {
      console.log("📦 IPFS Link:", data.ipfs_link);
      console.log("📝 Transaction:", data.transactionHash);

      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["user-purchases", address] });
      queryClient.invalidateQueries({ queryKey: ["user-earnings", address] });
      queryClient.invalidateQueries({
        queryKey: ["single-sample", data.sample_id],
      });
    },
    onError: () => {
      toast.error("Error", {
        className: "!bg-red-500 *:!text-white !border-0",
        description: "Failed to purchase sample",
        duration: 5000,
        icon: IoCloseCircleSharp({ size: 24 }),
      });
    },
  });
};

export const useHasPurchased = (sampleId: number) => {
  const { address } = useWallet();

  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });

  return useQuery({
    queryKey: ["hasPurchased", address, sampleId],
    queryFn: async () => {
      if (!address || !sampleId) return false;

      const response = await client.has_purchased({
        buyer: address,
        sample_id: sampleId,
      });
      console.log(response.result);
      return response.result || false;
    },
    enabled: !!address && !!sampleId,
  });
};

export const useGetUserPurchases = () => {
  const { address } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });
  return useQuery({
    queryFn: async () => {
      const { result } = await client.get_user_purchases({
        buyer: address!,
      });
      return result;
    },
    queryKey: ["user-purchases", address],
  });
};

export const useGetStats = () => {
  const { address } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });
  return useQuery({
    queryFn: async () => {
      const { result } = await client.get_stats();
      return result;
    },
    queryKey: ["stats"],
  });
};

export const useGetUserEarnings = () => {
  const { address } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });
  return useQuery({
    queryFn: async () => {
      const { result } = await client.get_earnings({ user: address! });
      return result;
    },
    queryKey: ["user-earnings", address],
  });
};

export const useWithdrawEarnings = () => {
  const { address, signTransaction } = useWallet();
  const queryClient = useQueryClient();

  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });

  return useMutation({
    mutationFn: async (_user: string) => {
      if (!address) {
        throw new Error("Please connect your wallet first");
      }

      // Call the contract
      const response = await client.withdraw_earnings({ user: address });

      // Check if additional signatures are needed
      response.needsNonInvokerSigningBy({ includeAlreadySigned: false });

      if (signTransaction) {
        // Sign and send the transaction
        const result = await response.signAndSend({
          force: true,
          signTransaction: signTransaction,
        });

        console.log("✅ Withdraw successful!", result);

        // Extract the IPFS hash from the result
        // The exact structure depends on your contract's return value

        return {
          transactionHash: result.getTransactionResponse?.txHash ?? "",
        };
      }

      throw new Error("Unable to sign transaction");
    },
    onSuccess: () => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["user-earnings", address] });
    },
    onError: () => {
      toast.error("Error", {
        className: "!bg-red-500 *:!text-white !border-0",
        description: "Failed to withdraw earnings",
        duration: 5000,
        icon: IoCloseCircleSharp({ size: 24 }),
      });
    },
  });
};
