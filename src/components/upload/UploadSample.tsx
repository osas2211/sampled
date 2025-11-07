/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-unused-vars, @typescript-eslint/no-floating-promises,  @typescript-eslint/no-misused-promises */
import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
  FormEvent,
} from "react";
import {
  Upload,
  Music,
  Loader2,
  Check,
  X,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Header } from "../shared/Header";

// Type definitions
interface SampleFormData {
  title: string;
  price: string;
  bpm: string;
  key: MusicKey;
  genre: Genre;
  tags: string[];
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
const UploadUI: React.FC<UploadUIProps> = ({
  onUploadComplete,
  walletAddress,
  platformFeePercentage = 10,
}) => {
  // State management with proper types
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);
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
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SampleFormData, string>>
  >({});

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      // In production, you would:
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

  // Upload handler
  const handleUpload = async (): Promise<void> => {
    if (!validateForm() || !file) return;

    try {
      setUploadProgress({ status: "uploading", percentage: 0 });

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress({
          status: "uploading",
          percentage: i,
          message: `Uploading to IPFS... ${i}%`,
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      setUploadProgress({
        status: "processing",
        percentage: 100,
        message: "Creating smart contract entry...",
      });

      // In production, you would:
      // 1. Upload file to IPFS
      // 2. Get IPFS hash
      // 3. Call smart contract with metadata
      // 4. Wait for transaction confirmation

      const mockIpfsHash = "Qm" + Math.random().toString(36).substring(2, 15);

      // Simulate contract interaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUploadProgress({
        status: "complete",
        percentage: 100,
        message: "Successfully uploaded!",
      });

      // Callback to parent component
      if (onUploadComplete) {
        onUploadComplete(mockIpfsHash, formData);
      }

      // Reset form after success
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadProgress({
        status: "error",
        percentage: 0,
        message: "Upload failed. Please try again.",
      });
    }
  };

  // Reset form
  const resetForm = (): void => {
    setFile(null);
    setFileMetadata(null);
    setFormData({
      title: "",
      price: "",
      bpm: "",
      key: MusicKey.C,
      genre: Genre.Trap,
      tags: [],
    });
    setErrors({});
    setUploadProgress({ status: "idle", percentage: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  const handleTagAdd = (tag: string): void => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string): void => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <>
      <div className="upload-container font-sequel">
        <Header />
        {/* Main content */}
        <main className="main-content">
          <h1 className="upload-title">GET SAMPLED</h1>
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

              {/* Form section */}
              <div className="form-section">
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
                  <div className="stat-card">
                    <div className="stat-label">Instant Pay</div>
                    <div className="stat-value">✓</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload actions */}
          {uploadProgress.status !== "complete" &&
            uploadProgress.status !== "error" && (
              <>
                <div className="upload-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleUpload}
                    disabled={
                      !file ||
                      !formData.title ||
                      !formData.price ||
                      uploadProgress.status === "uploading"
                    }
                  >
                    {uploadProgress.status === "uploading" ||
                    uploadProgress.status === "processing" ? (
                      <>
                        <Loader2 className="spinner" size={20} />
                        <span>UPLOADING...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        <span>GET SAMPLED NOW</span>
                      </>
                    )}
                  </button>
                  <button className="btn btn-secondary">
                    <TrendingUp size={20} />
                    <span>PREVIEW EARNINGS</span>
                  </button>
                </div>

                {/* Upload progress */}
                {(uploadProgress.status === "uploading" ||
                  uploadProgress.status === "processing") && (
                  <>
                    <div className="upload-progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${uploadProgress.percentage}%` }}
                      ></div>
                    </div>
                    {uploadProgress.message && (
                      <div className="progress-message">
                        {uploadProgress.message}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
        </main>
      </div>
    </>
  );
};

export default UploadUI;
