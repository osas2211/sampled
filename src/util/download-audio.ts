/**
 * Downloads an audio file from an IPFS link or any URL
 * @param ipfs_link - The IPFS link or URL to the audio file
 * @param filename - Optional custom filename (defaults to extracted from URL or "audio")
 * @returns Promise that resolves when download starts
 */
export const downloadAudio = async (
  ipfs_link: string,
  filename?: string,
): Promise<void> => {
  try {
    // Fetch the audio file
    const response = await fetch(ipfs_link);

    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Get the blob from response
    const blob = await response.blob();

    // Extract filename from URL if not provided
    let finalFilename = filename;
    if (!finalFilename) {
      // Try to get filename from URL
      const urlParts = ipfs_link.split("/");
      const urlFilename = urlParts[urlParts.length - 1];

      // If URL has a filename with extension, use it
      if (urlFilename && urlFilename.includes(".")) {
        finalFilename = urlFilename;
      } else {
        // Default to audio with timestamp
        const timestamp = new Date().getTime();
        finalFilename = `audio-${timestamp}.mp3`;
      }
    }

    // Ensure filename has an extension
    if (!finalFilename.includes(".")) {
      // Try to determine extension from blob type
      const extension = blob.type.split("/")[1] || "mp3";
      finalFilename = `${finalFilename}.${extension}`;
    }

    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading audio:", error);
    throw new Error(
      `Failed to download audio: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * Downloads audio with progress tracking
 * @param ipfs_link - The IPFS link or URL to the audio file
 * @param filename - Optional custom filename
 * @param onProgress - Optional callback for download progress (0-100)
 * @returns Promise that resolves when download completes
 */
export const downloadAudioWithProgress = async (
  ipfs_link: string,
  filename?: string,
  onProgress?: (progress: number) => void,
): Promise<void> => {
  try {
    const response = await fetch(ipfs_link);

    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Get total size
    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;

    // Read the response body with progress tracking
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    let receivedLength = 0;
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      // Calculate and report progress
      if (onProgress && total > 0) {
        const progress = Math.round((receivedLength / total) * 100);
        onProgress(progress);
      }
    }

    // Combine chunks into single array
    const allChunks = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      allChunks.set(chunk, position);
      position += chunk.length;
    }

    // Create blob from chunks
    const blob = new Blob([allChunks], { type: "audio/mpeg" });

    // Extract filename
    let finalFilename = filename;
    if (!finalFilename) {
      const urlParts = ipfs_link.split("/");
      const urlFilename = urlParts[urlParts.length - 1];
      finalFilename =
        urlFilename && urlFilename.includes(".")
          ? urlFilename
          : `audio-${new Date().getTime()}.mp3`;
    }

    if (!finalFilename.includes(".")) {
      finalFilename = `${finalFilename}.mp3`;
    }

    // Trigger download
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    // Final progress update
    if (onProgress) {
      onProgress(100);
    }
  } catch (error) {
    console.error("Error downloading audio:", error);
    throw new Error(
      `Failed to download audio: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
