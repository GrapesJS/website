'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiFilePdfBox, mdiImageOutline, mdiPlus } from '@mdi/js';
import cn from 'classnames';
import type { FileUploadType } from './types';

interface UploadMenuProps {
  onFileSelect: (file: File, type: FileUploadType) => void;
  disabled?: boolean;
}

interface FileTypeConfig {
  id: FileUploadType;
  label: string;
  description: string;
  icon: string;
  iconColor: string;
  accept: string;
  mimeTypes: string[];
  validate: (file: File) => boolean;
  errorMessage: string;
}

const FILE_TYPE_CONFIGS: FileTypeConfig[] = [
  {
    id: "resume",
    label: "Upload Resume PDF",
    description: "Build website from resume",
    icon: mdiFilePdfBox,
    iconColor: "text-red-400",
    accept: ".pdf,application/pdf",
    mimeTypes: ["application/pdf"],
    validate: (file: File) => file.type === "application/pdf",
    errorMessage: "Please select a PDF file",
  },
  {
    id: "image",
    label: "Upload Image",
    description: "Build website from image",
    icon: mdiImageOutline,
    iconColor: "text-blue-400",
    accept: "image/*",
    mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    validate: (file: File) => file.type.startsWith("image/"),
    errorMessage: "Please select an image file",
  },
];

export function UploadMenu({ onFileSelect, disabled }: Readonly<UploadMenuProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRefs = useRef<Map<FileUploadType, HTMLInputElement>>(new Map());

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]);

  const handleFileTypeClick = (config: FileTypeConfig) => {
    const inputRef = fileInputRefs.current.get(config.id);
    inputRef?.click();
    setIsOpen(false);
  };

  const createFileChangeHandler = (config: FileTypeConfig) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      
      if (file) {
        if (config.validate(file)) {
          onFileSelect(file, config.id);
        } else {
          alert(config.errorMessage);
        }
      }
      
      // Reset input
      const inputRef = fileInputRefs.current.get(config.id);
      if (inputRef) {
        inputRef.value = '';
      }
    };
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Main + button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center justify-center rounded-full p-2 transition-colors',
          'text-white/60 hover:text-white/80',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Upload file"
        title="Upload file"
      >
        <Icon
          path={mdiPlus}
          size={1.2}
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-45'
          )}
        />
      </button>

      {/* Hidden file inputs */}
      {FILE_TYPE_CONFIGS.map((config) => (
        <input
          key={config.id}
          ref={(el) => {
            if (el) {
              fileInputRefs.current.set(config.id, el);
            }
          }}
          type="file"
          accept={config.accept}
          onChange={createFileChangeHandler(config)}
          className="hidden"
        />
      ))}

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-56 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 overflow-hidden z-50">
          {FILE_TYPE_CONFIGS.map((config, index) => (
            <button
              key={config.id}
              type="button"
              onClick={() => handleFileTypeClick(config)}
              className={cn(
                "w-full px-4 py-3 flex items-center gap-3 text-left text-white hover:bg-zinc-700 transition-colors",
                index > 0 && "border-t border-zinc-700"
              )}
            >
              <Icon path={config.icon} size={1} className={config.iconColor} />
              <div>
                <div className="font-medium">{config.label}</div>
                <div className="text-xs text-gray-400">{config.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
