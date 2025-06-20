import React from 'react';
import { Accept, FileWithPath, useDropzone } from 'react-dropzone';
import { ImageIcon } from 'lucide-react';

import CustomLabel from './CustomLabel';

interface CustomInputFilesProps {
  accept?: Accept;
  multiple?: boolean;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  label?: string;
  labelTitle?: string;
  className?: string;
}

const CustomInputFiles: React.FC<CustomInputFilesProps> = ({
  accept,
  multiple = false,
  maxFiles,
  onFilesSelected,
  label = "Drag 'n' drop files here, or click to select",
  labelTitle = 'Files',
  className = '',
}) => {
  const computedMaxFiles = multiple ? (maxFiles ?? undefined) : 1;

  const onDrop = (acceptedFiles: File[]) => {
    if (onFilesSelected) {
      onFilesSelected(acceptedFiles);
    }
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles: computedMaxFiles,
    multiple,
    onDrop,
  });

  return (
    <div>
      <CustomLabel label={labelTitle} />
      <section
        className={`rounded border border-dashed border-text dark:border-dk_text p-4 ${className}`}
      >
        <div
          {...getRootProps()}
          className="cursor-pointer text-center text-text dark:text-dk_text hover:text-accent dark:hover:text-dk_accent"
        >
          <input {...getInputProps()} />
          <p>{label}</p>

          {acceptedFiles.length > 0 && (
            <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-left">
              {acceptedFiles.map((file: FileWithPath) => (
                <li key={file.path} className="flex items-center gap-2">
                  <ImageIcon size={16} />
                  {file.path} — {(file.size / 1024).toFixed(1)} KB
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomInputFiles;
