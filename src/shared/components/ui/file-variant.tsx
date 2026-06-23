'use client';

import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import React from 'react';

interface FileVariantProps {
  isDisabled?: boolean;
  isError?: boolean;
  accept?: string;
  onChange?: (files: File[]) => void;
}

export default function FileVariant({
  isDisabled = false,
  isError = false,
  accept,
  onChange,
}: FileVariantProps) {
  // support multiple file selection
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [isDragActive, setIsDragActive] = React.useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  // open file browser when clicking the component
  const triggerFileBrowser = () => {
    if (isDisabled) return;
    fileInputRef.current?.click();
  };

  // handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) return;

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };
  // handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (isDisabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);
      onChange?.(updatedFiles);
    }
  };
  // get display string for selected files
  const getFilesNameDisplay = () => {
    if (selectedFiles.length === 0) return '';
    return selectedFiles.map((file) => file.name).join(', ');
  };

  return (
    <div
      tabIndex={isDisabled ? -1 : 0}
      onClick={triggerFileBrowser}
      onFocus={() => !isDisabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onKeyDown={(e) => {
        if (isDisabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerFileBrowser();
        }
      }}
      className={cn(
        'w-full text-zinc-800 border rounded-10 px-3 py-1.5 outline-none transition-colors cursor-pointer bg-white flex items-center min-h-[38px] select-none flex-row-reverse justify-between gap-3',
        isFocused
          ? 'border-maroon-600 dark:border-soft-pink-400 ring-0'
          : isDragActive
            ? 'border-maroon-600 bg-maroon-50/10'
            : isError
              ? 'border-red-600 bg-white'
              : 'border-zinc-300 hover:border-zinc-400 bg-white dark:bg-zinc-700 dark:border-zinc-600',
        isDisabled
          ? 'border-zinc-100 bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 cursor-not-allowed text-zinc-400'
          : ''
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        disabled={isDisabled}
        accept={accept}
        tabIndex={-1}
        onChange={(e) => {
          if (isDisabled) return;
          if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const updatedFiles = [...selectedFiles, ...newFiles];
            setSelectedFiles(updatedFiles);
            onChange?.(updatedFiles);
          }
        }}
        className="hidden"
      />

      <div
        className={cn(
          'flex items-center gap-1.5 font-medium text-sm dark:text-soft-pink-400 flex-row-reverse flex-shrink-0',
          isDisabled ? 'text-zinc-400' : 'text-maroon-600'
        )}
      >
        <span>Upload file</span>
        <Upload className="h-4 w-4 shrink-0" />
      </div>

      {selectedFiles.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-hidden flex-row w-full justify-start max-w-[70%]">
          <span
            dir="ltr"
            className={cn(
              'text-xs font-medium truncate text-left w-full block',
              isDisabled ? 'text-zinc-400' : 'text-zinc-800 dark:text-zinc-300'
            )}
            title={getFilesNameDisplay()}
          >
            {getFilesNameDisplay()}
          </span>
        </div>
      )}
    </div>
  );
}
