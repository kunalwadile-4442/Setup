import React, { useState } from "react";
import type{ Control } from "react-hook-form";
import { Controller } from "react-hook-form";

interface UploadFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  allowedExtensions?: string[];
  multiple?: boolean;
  maxSizeMB?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  error?: string;
}

const UploadField: React.FC<UploadFieldProps> = ({
  name,
  control,
  label,
  allowedExtensions = ["jpg", "jpeg", "png", "webp"],
  multiple = false,
  maxSizeMB = 5,
  onFilesSelected,
  className,
  error,
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-2 font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept={allowedExtensions.map((ext) => `.${ext}`).join(", ")}
              multiple={multiple}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const validFiles: File[] = [];
                const previews: string[] = [];

                for (const file of files) {
                  const validation = validateFile(file);
                  if (validation === true) {
                    validFiles.push(file);
                    previews.push(URL.createObjectURL(file));
                  } else {
                    alert(validation);
                  }
                }

                setPreviewUrls(previews);
                field.onChange(multiple ? validFiles : validFiles[0]);
                onFilesSelected && onFilesSelected(validFiles);
              }}
              className="border rounded p-2"
            />

            {/* Preview */}
            {previewUrls.length > 0 && (
              <div className="flex gap-4 mt-2 flex-wrap">
                {previewUrls.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="preview"
                    className="w-24 h-24 object-cover border rounded"
                  />
                ))}
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </>
        )}
      />
    </div>
  );
};

export default UploadField;