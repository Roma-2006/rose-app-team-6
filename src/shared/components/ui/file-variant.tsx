'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import ErrorAlert from '../error-alert';
import { useTranslations } from 'next-intl';
import { Upload } from 'lucide-react';

interface FileVariantProps {
  isDisabled?: boolean;
  isError?: boolean;
  accept?: string;
  isRtl?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (files: File[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  id?: string;
}

const FileVariant = React.forwardRef<HTMLInputElement, FileVariantProps>(
  (
    {
      isDisabled = false,
      isRtl,
      className,
      isError = false,
      accept,
      placeholder,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const t = useTranslations('custom-input.file');

    // Local state to store and display the error from the offending extension
    const [localError, setLocalError] = React.useState<string | null>(null);

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

    // Merge local and external refs to ensure compatibility with the Form
    const handleRef = (node: HTMLInputElement | null) => {
      fileInputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
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

    // check if file matched
    const isFileAccepted = (file: File, acceptString?: string) => {
      if (
        !acceptString ||
        acceptString.trim() === '' ||
        (!acceptString.includes('/') && !acceptString.startsWith('.'))
      ) {
        return true;
      }

      const acceptedTypes = acceptString.split(',').map((type) => type.trim().toLowerCase());
      const fileType = file.type.toLowerCase();
      const fileName = file.name.toLowerCase();

      return acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return fileName.endsWith(type);
        } else if (type.endsWith('/*')) {
          const baseType = type.replace('/*', '');
          return fileType.startsWith(baseType);
        } else {
          return fileType === type;
        }
      });
    };

    // handle drop
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (isDisabled) return;
      setLocalError(null);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter((file) => isFileAccepted(file, accept));

        if (validFiles.length === 0) {
          setLocalError('File type not accepted.');
          return;
        }

        const updatedFiles = [...selectedFiles, ...validFiles];
        setSelectedFiles(updatedFiles);

        // accept only right files in the input
        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          updatedFiles.forEach((file) => dataTransfer.items.add(file));
          fileInputRef.current.files = dataTransfer.files;
        }
        onChange?.(updatedFiles);
      }
    };

    // get display string for selected files
    const getFilesNameDisplay = () => {
      if (selectedFiles.length === 0) return '';
      return selectedFiles.map((file) => file.name).join(', ');
    };

    return (
      <div className="w-full flex flex-col gap-1">
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
            'w-full px-3 h-11.5 text-text-plain border  rounded-lg py-1.5 outline-none transition-colors cursor-pointer bg-bg-plain flex items-center min-h-[38px] select-none  justify-between gap-3',
            isFocused
              ? 'border-border-primary '
              : isDragActive
                ? 'border-border-primary bg-bg-primary-fade '
                : isError || !!localError
                  ? 'border-border-danger bg-bg-plain'
                  : 'border-border-soft hover:border-border-default bg-bg-plain',
            isDisabled
              ? 'cursor-not-allowed border-border-subtle bg-bg-subtle text-text-muted'
              : '',
            className
          )}
        >
          <input
            {...props}
            ref={handleRef}
            type="file"
            multiple
            disabled={isDisabled}
            accept={accept}
            tabIndex={-1}
            onBlur={onBlur}
            onChange={(e) => {
              if (isDisabled) return;
              setLocalError(null);

              if (e.target.files && e.target.files.length > 0) {
                const chosenFiles = Array.from(e.target.files);
                const validFiles = chosenFiles.filter((file) => isFileAccepted(file, accept));

                if (validFiles.length === 0) {
                  setLocalError('File type not accepted.');
                  e.target.value = ''; // clear input
                  return;
                }

                const updatedFiles = [...selectedFiles, ...validFiles];
                setSelectedFiles(updatedFiles);

                if (fileInputRef.current) {
                  const dataTransfer = new DataTransfer();
                  updatedFiles.forEach((file) => dataTransfer.items.add(file));
                  fileInputRef.current.files = dataTransfer.files;
                }

                onChange?.(updatedFiles);
              }
            }}
            className="hidden"
          />

          <div className="flex items-center gap-3 flex-row w-full justify-between">
            <div className="flex-1 min-w-0 pointer-events-none">
              <span
                className={cn(
                  'text-sm font-normal truncate block text-start',
                  selectedFiles.length === 0 ? 'text-text-muted' : 'text-text-plain'
                )}
                title={selectedFiles.length > 0 ? getFilesNameDisplay() : 'placeholder'}
              >
                {selectedFiles.length > 0 ? getFilesNameDisplay() : 'placeholder'}
              </span>
            </div>

            <div
              className={cn(
                'flex items-center gap-1.5 font-medium text-sm flex-shrink-0 border-s ps-3 text-text-muted',
                isDisabled ? 'text-text-muted' : 'text-text-primary/90'
              )}
            >
              <Upload className="h-4 w-4 shrink-0 block" strokeWidth={2} />
              <span>{t('btn-text') || 'Upload File'}</span>
            </div>
          </div>
        </div>

        {(localError || isError) && <ErrorAlert errorMessage={localError || ''} isRtl={!!isRtl} />}
      </div>
    );
  }
);
FileVariant.displayName = 'FileVariant';
export default FileVariant;
