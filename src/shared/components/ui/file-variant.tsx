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
        'w-full text-text-plain border rounded-10 px-3 py-1.5 outline-none transition-colors cursor-pointer bg-bg-plain flex items-center min-h-[38px] select-none flex-row-reverse justify-between gap-3',
        isFocused
          ? 'border-border-primary  ring-0'
          : isDragActive
            ? 'border-border-primary bg-bg-primary-fade'
            : isError
              ? 'border-border-danger bg-bg-plain'
              : 'border-border-soft hover:border-border-default  bg-bg-plain',
        isDisabled ? '  cursor-not-allowed border-border-subtle bg-bg-subtle text-text-muted' : ''
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
        className="hidden rounded-10"
      />

      <div
        className={cn(
          'flex items-center gap-1.5 font-medium text-sm  flex-row-reverse flex-shrink-0',
          isDisabled ? 'text-text-muted' : 'text-text-primary'
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
              isDisabled ? 'text-text-muted' : 'text-text-plain '
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
