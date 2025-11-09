import { useMutation, useQuery } from "@tanstack/react-query";
import { useWallet } from "./useWallet";
// import sampled from "../contracts/sampled"
import { IUploadSamplePayload } from "../@types/sample";
import * as Client from "sampled";
import { rpcUrl } from "../contracts/util";

export const useUploadSample = () => {
  const { address, signTransaction } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAZ5QICAIN6B4CZ3ARTVQVZYTXMHFMAPG32DEWS7NWT7QHOCBZX3AE5L",
    rpcUrl,
    allowHttp: true,
    publicKey: address,
  });

  return useMutation({
    mutationFn: async (payload: IUploadSamplePayload) => {
      if (!address) {
        throw new Error("Wallet not connected");
      }
      const response = await client.upload_sample(payload);
      response.needsNonInvokerSigningBy({ includeAlreadySigned: false });
      if (signTransaction) {
        await response.signAndSend({
          force: true,
          signTransaction: signTransaction,
        });
      }
      return response;
    },
    onError: (error) => {
      console.error("Failed to upload sample:", error);
    },
  });
};

export const useGetUserSamples = () => {
  const { address } = useWallet();
  const client = new Client.Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAZ5QICAIN6B4CZ3ARTVQVZYTXMHFMAPG32DEWS7NWT7QHOCBZX3AE5L",
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
