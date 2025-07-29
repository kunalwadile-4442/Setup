import React, { useState, useEffect } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

interface ProfileImageUploadProps {
  name: string;
  control: Control<any>;
  label?: string;
  currentImage?: string; // Existing profile image
  allowedExtensions?: string[];
  maxSizeMB?: number;
  onFileSelected?: (file: File) => void;
  error?: string;
  className?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  name,
  control,
  label,
  currentImage,
  allowedExtensions = ["jpg", "jpeg", "png", "webp"],
  maxSizeMB = 2,
  onFileSelected,
  error,
  className,
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

 useEffect(() => {
  if (!currentImage) {
    setPreview(null);
    return;
  }

  if (typeof currentImage === "string") {
    setPreview(currentImage);
  } else if (
    typeof currentImage === "object" &&
    currentImage !== null &&
    "name" in currentImage &&
    "size" in currentImage &&
    "type" in currentImage
  ) {
    const objectUrl = URL.createObjectURL(currentImage as File);
    setPreview(objectUrl);

    // Clean up to avoid memory leak
    return () => URL.revokeObjectURL(objectUrl);
  }
}, [currentImage]);

  const validateFile = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      return `Only ${allowedExtensions.join(", ")} files are allowed`;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size should not exceed ${maxSizeMB}MB`;
    }
    return true;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {label && <label className="mb-2 font-semibold">{label}</label>}

      {/* Profile Image Preview */}
      <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-300">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Upload Button */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              id={`upload-${name}`}
              type="file"
              accept={allowedExtensions.map((ext) => `.${ext}`).join(", ")}
              style={{ display: "none" }}
             onChange={(e) => {
  const file = e.target.files?.[0];
  if (file) {
    const validation = validateFile(file);
    if (validation === true) {
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL); // <-- Show selected image
      field.onChange(file); // <-- Send file to react-hook-form
      onFileSelected?.(file);

      // Optional: Revoke previous objectURL to prevent memory leak
      return () => URL.revokeObjectURL(objectURL);
    } else {
      alert(validation);
    }
  }
}}
            />
            <label
              htmlFor={`upload-${name}`}
              className="mt-3 px-4 py-2 bg-primary text-white text-sm rounded cursor-pointer hover:bg-primaryHover"
            >
              Upload New Image
            </label>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </>
        )}
      />
    </div>
  );
};

export default ProfileImageUpload;
