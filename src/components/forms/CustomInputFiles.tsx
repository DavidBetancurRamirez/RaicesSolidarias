import React, { useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Trash2 } from 'lucide-react';

import CustomLabel from './CustomLabel';
import SafeMedia from '@components/common/SafeMedia';

import { Media, TypeOfMedia } from '@/constants/interfaces';

interface CustomInputFilesProps {
  accept?: Accept;
  className?: string;
  existingFiles?: Media[];
  label?: string;
  labelTitle?: string;
  maxFiles?: number;
  multiple?: boolean;
  newFiles: File[];
  onFilesSelected?: (files: File[]) => void;
  onRemoveFile?: (file: File | string) => void;
  required?: boolean;
}

// TODO: Refactor this component to reduce unnecessary rendering
const CustomInputFiles: React.FC<CustomInputFilesProps> = ({
  accept,
  className = '',
  label = "Drag 'n' drop files here, or click to select",
  labelTitle = 'Files',
  maxFiles,
  multiple = false,
  newFiles = [],
  onFilesSelected,
  onRemoveFile,
  existingFiles = [],
  required,
}) => {
  const computedMaxFiles = multiple ? (maxFiles ?? undefined) : 1;

  const handleRemove = (file: File | string) => {
    if (typeof file === 'string') {
      onRemoveFile?.(file);
    } else {
      const filtered = newFiles.filter((f) => f !== file);
      onFilesSelected?.(filtered);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updated = multiple
        ? [...newFiles, ...acceptedFiles]
        : [acceptedFiles[0]];
      onFilesSelected?.(updated);
    },
    [newFiles, onFilesSelected, multiple],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles: computedMaxFiles,
    multiple,
    onDrop,
  });

  const PreviewGrid = ({
    title,
    files,
    isMedia = true,
  }: {
    title?: string;
    files: Media[] | File[];
    isMedia?: boolean;
  }) => {
    if (files.length === 0) return null;

    return (
      <div className="mt-4">
        {multiple && title && (
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </p>
        )}

        <div
          className={
            multiple
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'w-full'
          }
        >
          {files.map((file, idx) => {
            let key: string;
            let src: string;
            let type: TypeOfMedia = 'image';

            // TODO: Add new media props
            if (isMedia) {
              // file is Media
              const mediaFile = file as Media;
              key = mediaFile.url ?? idx.toString();
              src = mediaFile.url;
              type = mediaFile.type || 'image';
            } else {
              // file is File
              const fileObj = file as File;
              key = fileObj.name + fileObj.size;
              src = URL.createObjectURL(fileObj);
              type = fileObj.type.startsWith('video/') ? 'video' : 'image';
            }

            return (
              <div
                key={key}
                className={`relative group border rounded overflow-hidden ${
                  multiple ? '' : 'w-full'
                }`}
              >
                <SafeMedia media={{ type, url: src }} />
                <button
                  className="absolute top-1 right-1 p-1 rounded bg-red-600 hover:bg-red-700 text-white opacity-80 group-hover:opacity-100"
                  title="Eliminar archivo"
                  type="button"
                  onClick={() => handleRemove(isMedia ? src : (file as File))}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <CustomLabel label={labelTitle} required={required} />

      <section
        className={`rounded border border-dashed border-text dark:border-dk_text p-4 ${className}`}
      >
        <div
          {...getRootProps()}
          className="cursor-pointer text-center text-text dark:text-dk_text hover:text-accent dark:hover:text-dk_accent"
        >
          <input {...getInputProps()} />
          <p>{label}</p>
        </div>

        <PreviewGrid
          files={newFiles}
          isMedia={false}
          title="Multimedia nueva"
        />
        <PreviewGrid title="Multimedia existente" files={existingFiles} />
      </section>
    </div>
  );
};

export default CustomInputFiles;
