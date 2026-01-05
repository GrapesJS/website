export type FileUploadType = "resume" | "image";

export interface FileTypeConfig {
  prompt: string;
  mimeTypes: string[];
  maxSize?: number;
}

export const FILE_UPLOAD_TYPES = {
  RESUME: "resume" as const,
  IMAGE: "image" as const,
} as const;

export const FILE_TYPE_CONFIGS: Record<FileUploadType, FileTypeConfig> = {
  resume: {
    prompt: "Build website from my resume pdf",
    mimeTypes: ["application/pdf"],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  image: {
    prompt: "Build website from this image",
    mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export function validateFileType(file: File, type: FileUploadType): boolean {
  const config = FILE_TYPE_CONFIGS[type];
  return config.mimeTypes.includes(file.type);
}

export function validateFileSize(file: File, type: FileUploadType): boolean {
  const config = FILE_TYPE_CONFIGS[type];
  if (!config.maxSize) return true;
  return file.size <= config.maxSize;
}

export function getFileTypeConfig(type: FileUploadType): FileTypeConfig {
  return FILE_TYPE_CONFIGS[type];
}

