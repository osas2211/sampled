/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-misused-promises,  @typescript-eslint/no-unused-vars*/
import { useMutation } from "@tanstack/react-query";
import { PinataSDK } from "pinata";
import { toast } from "sonner";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useState } from "react";

const pinata = new PinataSDK({
  pinataJwt: "",
  pinataGateway: import.meta.env.PUBLIC_PINATA_GATEWAY_URL,
});

type FileUploadResponse = {
  data: {
    id: string;
    user_id: string;
    name: string;
    size: number;
    mime_type: "audio/mpeg";
    cid: string;
    cid_version: string;
    network: "public";
    number_of_files: number;
    streamable: boolean;
    created_at: string;
    updated_at: string;
    vectorized: boolean;
  };
};

export const useUploadFileToIPFS = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file: File): Promise<string> => {
    if (!import.meta.env.PUBLIC_PINATA_JWT_SECRET)
      throw new Error("Missing JWT");
    if (!file) throw new Error("No file provided");

    const url = "https://uploads.pinata.cloud/v3/files";
    const form = new FormData();
    form.append("network", "public");
    form.append("name", file.name);
    form.append("file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      // Handle completion
      xhr.addEventListener("load", async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: FileUploadResponse = JSON.parse(xhr.responseText);
            if (data.data.cid) {
              const ipfsLink = await pinata.gateways.public.convert(
                data.data.cid,
              );
              setUploadProgress(0); // Reset progress
              resolve(ipfsLink);
            } else {
              reject(new Error("PINATA: Upload failed"));
            }
          } catch (error) {
            reject(new Error("Failed to parse response"));
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      // Handle errors
      xhr.addEventListener("error", () => {
        setUploadProgress(0);
        reject(new Error("Network error during upload"));
      });

      xhr.addEventListener("abort", () => {
        setUploadProgress(0);
        reject(new Error("Upload aborted"));
      });

      // Open and send request
      xhr.open("POST", url);
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${import.meta.env.PUBLIC_PINATA_JWT_SECRET}`,
      );
      xhr.send(form);
    });
  };

  const mutation = useMutation({
    mutationFn: handleUpload,
    onError: () => {
      setUploadProgress(0);
      toast.error("Error", {
        className: "!bg-red-500 *:!text-white !border-0",
        description: "Failed to upload file",
        duration: 5000,
        icon: IoCloseCircleSharp({ size: 24 }),
      });
    },
  });

  return {
    ...mutation,
    uploadProgress,
  };
};
