/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-unused-vars, @typescript-eslint/no-floating-promises,  @typescript-eslint/no-misused-promises */
import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
} from "react";
import { Upload, Music, Check, X, Zap } from "lucide-react";
import { useUploadSample } from "../../hooks/useSampledContract";
import { useWallet } from "../../hooks/useWallet";
import { Button } from "antd";
import { InAppHeader } from "../shared/InAppHeader";
import { useUploadFileToIPFS } from "../../hooks/usePinata";
import { toast } from "sonner";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

// Type definitions
interface SampleFormData {
  title: string;
  price: string;
  bpm: string;
  key: MusicKey;
  genre: Genre;
  tags: string[];
  coverImage?: File | null;
}

interface UploadProgress {
  status: "idle" | "uploading" | "processing" | "complete" | "error";
  percentage: number;
  message?: string;
}

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  duration?: number;
  waveform?: number[];
}

// Enums for constrained values
enum MusicKey {
  C = "C",
  CSharp = "C#",
  D = "D",
  DSharp = "D#",
  E = "E",
  F = "F",
  FSharp = "F#",
  G = "G",
  GSharp = "G#",
  A = "A",
  ASharp = "A#",
  B = "B",
}

enum Genre {
  Trap = "trap",
  Drill = "drill",
  HipHop = "hip-hop",
  RnB = "r&b",
  Pop = "pop",
  Electronic = "electronic",
  Ambient = "ambient",
  Experimental = "experimental",
}

// Props interface
interface UploadUIProps {
  onUploadComplete?: (ipfsHash: string, metadata: SampleFormData) => void;
  walletAddress?: string;
  platformFeePercentage?: number;
}

// Component
const UploadUI: React.FC<UploadUIProps> = ({ platformFeePercentage = 10 }) => {
  // State management with proper types
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [_fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: "idle",
    percentage: 0,
  });

  const [formData, setFormData] = useState<SampleFormData>({
    title: "",
    price: "",
    bpm: "",
    key: MusicKey.C,
    genre: Genre.Trap,
    tags: [],
    coverImage: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SampleFormData, string>>
  >({});

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  // File validation
  const validateFile = (file: File): boolean => {
    const validTypes = ["audio/wav", "audio/mpeg", "audio/mp3", "audio/x-wav"];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(file.type)) {
      setErrors({ ...errors, title: "Please upload a WAV or MP3 file" });
      return false;
    }

    if (file.size > maxSize) {
      setErrors({ ...errors, title: "File size must be less than 50MB" });
      return false;
    }

    return true;
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>): Promise<void> => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && validateFile(droppedFile)) {
        setFile(droppedFile);
        await analyzeAudio(droppedFile);
      }
    },
    [],
  );

  // File input handler
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      analyzeAudio(selectedFile);
    }
  };

  // Cover image handlers
  const handleCoverImageSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Error", {
          className: "!bg-red-500 *:!text-white !border-0",
          description: (
            <p className="text-white">Cover image must be less than 5MB</p>
          ),
          duration: 5000,
          icon: <IoCloseCircleSharp size={20} />,
        });
        return;
      }

      setFormData((prev) => ({ ...prev, coverImage: selectedFile }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeCoverImage = (): void => {
    setFormData((prev) => ({ ...prev, coverImage: null }));
    setCoverImagePreview(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  };

  // Audio analysis (placeholder for actual implementation)
  const analyzeAudio = async (audioFile: File): Promise<void> => {
    try {
      // Create metadata
      const metadata: FileMetadata = {
        name: audioFile.name,
        size: audioFile.size,
        type: audioFile.type,
        lastModified: audioFile.lastModified,
      };

      // In production, I would:
      // 1. Use Web Audio API to analyze BPM
      // 2. Generate waveform data
      // 3. Detect key using music theory algorithms

      setFileMetadata(metadata);

      // Auto-fill title from filename
      const titleFromFile = audioFile.name.replace(/\.[^/.]+$/, "");
      setFormData((prev) => ({ ...prev, title: titleFromFile }));
    } catch (error) {
      console.error("Error analyzing audio:", error);
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SampleFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (
      !formData.bpm ||
      parseInt(formData.bpm) < 60 ||
      parseInt(formData.bpm) > 200
    ) {
      newErrors.bpm = "BPM must be between 60 and 200";
    }

    if (!file) {
      newErrors.title = "Please select a file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form
  const resetForm = (): void => {
    setFile(null);
    setFileMetadata(null);
    setCoverImagePreview(null);
    setFormData({
      title: "",
      price: "",
      bpm: "",
      key: MusicKey.C,
      genre: Genre.Trap,
      tags: [],
      coverImage: null,
    });
    setErrors({});
    setUploadProgress({ status: "idle", percentage: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  };

  // Utility functions
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const calculateEarnings = (): string => {
    if (!formData.price) return "0";
    const price = parseFloat(formData.price);
    const earnings = price * (1 - platformFeePercentage / 100);
    return earnings.toFixed(2);
  };

  // Form input handlers
  const handleInputChange = (
    field: keyof SampleFormData,
    value: string | MusicKey | Genre,
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Upload handler
  const { mutateAsync: uploadSample, isPending } = useUploadSample();
  const {
    mutateAsync: uploadFile,
    isPending: isUploadingFile,
    uploadProgress: pinataProgress,
  } = useUploadFileToIPFS();
  const { address } = useWallet();

  const handleUpload = async (): Promise<void> => {
    if (!address) {
      toast.error("Error", {
        className: "!bg-red-500 *:!text-white !border-0",
        description: <p className="text-white">Wallet not connected</p>,
        duration: 5000,
        icon: <IoCloseCircleSharp size={20} />,
      });
      throw new Error("Wallet not connected");
    }
    if (!validateForm() || !file) return;

    try {
      const audioLink = await uploadFile(file);

      // Upload cover image if provided
      let coverImageLink = "";
      if (formData.coverImage) {
        coverImageLink = await uploadFile(formData.coverImage);
      }

      const response = await uploadSample({
        price: BigInt(Number(formData.price) * 10_000_000),
        ipfs_link: audioLink ?? "",
        bpm: Number(formData.bpm),
        title: formData.title,
        genre: formData.genre,
        seller: address,
        cover_image: coverImageLink,
      });

      toast.success("Success", {
        className: "!bg-primary !border-0",
        description: "Successfully uploaded your sample",
        duration: 5000,
        icon: <BsCheckCircleFill />,
        action: (
          <Link
            to={`https://stellar.expert/explorer/testnet/tx/${response?.transactionHash}`}
            target="_blank"
            className="underline font-semibold"
          >
            View on explorer
          </Link>
        ),
      });

      // // Reset form after success
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <div className="upload-container font-sequel from-primary/15 to-black bg-linear-to-bl">
        <InAppHeader />
        {/* Main content */}
        <main className="main-content">
          <h1 className="upload-title font-pixter">
            GET SAMPLE<span className="text-primary underline">D</span>
          </h1>
          <p className="upload-subtitle">
            Upload your beat. Set your price. Get paid instantly.
          </p>

          {uploadProgress.status === "complete" ? (
            <div className="success-message">
              <Check className="success-icon" size={48} />
              <h2>Successfully Uploaded!</h2>
              <p>Your sample is now live on the marketplace</p>
            </div>
          ) : uploadProgress.status === "error" ? (
            <div className="error-message">
              <X size={48} />
              <h2>Upload Failed</h2>
              <p>{uploadProgress.message}</p>
              <button className="btn btn-primary" onClick={resetForm}>
                Try Again
              </button>
            </div>
          ) : (
            <div className="upload-grid">
              {/* Drop zone */}
              <div className="space-y-4 md:space-y-20">
                <div
                  className={`drop-zone ${isDragging ? "dragging" : ""} ${file ? "has-file" : ""} ${errors.title && !file ? "error" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp3"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />

                  {!file ? (
                    <div className="drop-content">
                      <Upload className="drop-icon" />
                      <div className="drop-text">Drop your beat here</div>
                      <div className="drop-subtext">WAV or MP3 • Max 50MB</div>
                    </div>
                  ) : (
                    <div className="file-preview">
                      <div className="file-icon bg-linear-0 from-primary to-orange-400">
                        <Music color="black" size={24} />
                      </div>
                      <div className="file-info">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                      <button
                        className="file-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          setFileMetadata(null);
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <Button
                  className="min-w-[250px] !h-12"
                  type="primary"
                  onClick={handleUpload}
                  disabled={
                    !file ||
                    !formData.title ||
                    !formData.price ||
                    uploadProgress.status === "uploading"
                  }
                  loading={isPending || isUploadingFile}
                >
                  {isUploadingFile ? (
                    <div className="flex gap-2 items-center">
                      <span>Uploading...</span>
                    </div>
                  ) : isPending ? (
                    <div className="flex gap-2 items-center">
                      <span>Saving sample...</span>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Zap size={20} />
                      <span>GET SAMPLED NOW</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Form section */}
              <div className="form-section bg-grey-1000 p-5 rounded-md">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className={`form-input ${errors.title ? "error" : ""}`}
                    placeholder="Fire Beat Vol. 3"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                  {errors.title && (
                    <div className="error-text">{errors.title}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Price</label>
                  <div className="price-input-group">
                    <input
                      type="number"
                      className={`form-input ${errors.price ? "error" : ""}`}
                      placeholder="10"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                    />
                    <span className="price-currency">XLM</span>
                  </div>
                  {errors.price && (
                    <div className="error-text">{errors.price}</div>
                  )}
                </div>

                <div className="input-grid">
                  <div className="form-group">
                    <label className="form-label">BPM</label>
                    <input
                      type="number"
                      className={`form-input ${errors.bpm ? "error" : ""}`}
                      placeholder="140"
                      value={formData.bpm}
                      onChange={(e) => handleInputChange("bpm", e.target.value)}
                    />
                    {errors.bpm && (
                      <div className="error-text">{errors.bpm}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Key</label>
                    <select
                      className="form-select"
                      value={formData.key}
                      onChange={(e) =>
                        handleInputChange("key", e.target.value as MusicKey)
                      }
                    >
                      {Object.values(MusicKey).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Genre</label>
                  <select
                    className="form-select"
                    value={formData.genre}
                    onChange={(e) =>
                      handleInputChange("genre", e.target.value as Genre)
                    }
                  >
                    {Object.entries(Genre).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stats preview */}
                <div className="stats-preview">
                  <div className="stat-card">
                    <div className="stat-label">Platform Fee</div>
                    <div className="stat-value">{platformFeePercentage}%</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">You Earn</div>
                    <div className="stat-value">{calculateEarnings()} XLM</div>
                  </div>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="form-group">
                <label className="form-label">Cover Image (Optional)</label>

                {!coverImagePreview ? (
                  <div
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors bg-grey-900"
                    onClick={() => coverImageInputRef.current?.click()}
                  >
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-400">
                      Click to upload cover image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                    <input
                      ref={coverImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border-2 border-primary/30">
                    <img
                      src={coverImagePreview}
                      alt="Cover preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={removeCoverImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                      type="button"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {pinataProgress !== 0 && (
            <div className="space-y-4">
              <p>Uploading sample to IPFS... {pinataProgress}%</p>
              <div className="upload-progress">
                <div
                  className="progress-bar"
                  style={{ width: `${pinataProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default UploadUI;
