'use client';

import { useRef, useState } from 'react';
import updloadIcon from '@/assets/icons/upload-icon.svg';
import Error from '@/assets/icons/error.svg';
import pdfIcon from '@/assets/icons/pdf-icon.svg';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import { MAX_FILE_SIZE } from '@/utils/validateZodFile';

type UploadCardProps<T> = {
  title: string;
  setValue: (value: T) => void;
  validationErrorMessage: string;
  clearable?: boolean;
  valueAsString?: boolean;
  accepts?: string;
  value?: File;
};

function UploadCard<T>(props: UploadCardProps<T>) {
  const {
    title,
    setValue,
    validationErrorMessage,
    clearable = false,
    valueAsString = true,
    accepts,
    value = null,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(value);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');

    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setErrorMessage(`Selected file size exceeds ${selectedFile.size / (1024 * 1024)}MB limit.`);

        return;
      }

      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (!valueAsString) {
          setValue(selectedFile as T);
          return;
        }

        if (typeof reader.result === 'string') {
          setValue(reader.result as T);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  function convertFileSize(byte: number) {
    const fileSizeInKB = byte / 1024;
    if (fileSizeInKB >= 1024) {
      return `${(fileSizeInKB / 1024).toFixed(2)} MB`;
      // eslint-disable-next-line
    } else {
      return `${fileSizeInKB.toFixed(2)} KB`;
    }
  }

  const clearFile = () => {
    setFile(null);
    setValue('' as T);
  };

  const className =
    'flex w-full h-full rounded-xl border border-dashed border-[#919EAB]/20 bg-[#919EAB] bg-opacity-[8%] px-3 min-h-[82px] py-2';

  return (
    <div>
      {file ? (
        <div className={`${className} select-none items-center justify-between !px-5`}>
          <div className="flex items-center space-x-2">
            <Image src={pdfIcon} width={32} alt="pdf-icon" />
            <div>
              <p className="leading-0 text-sm font-semibold">{file?.name}</p>
              <span className="text-xs text-secondary-400">{convertFileSize(file?.size)}</span>
            </div>
          </div>

          {clearable ? (
            <Cancel
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={clearFile}
            />
          ) : (
            <CheckCircleIcon sx={{ color: '#1877F2', fontSize: 20 }} />
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current?.click();
            }
          }}
          type="button"
          className={`${className} flex-col items-center justify-center space-y-1 `}
        >
          <input
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
            type="file"
            accept={accepts ?? ''}
          />

          <Image src={updloadIcon} alt="Upload" width={40} height={40} />

          <span className="text-center text-sm text-disabled">{title}</span>
        </button>
      )}

      {(validationErrorMessage || errorMessage) && (
        <div className="mt-2 flex items-center gap-1 pl-3 text-[12px] text-error-600">
          <Image src={Error} alt="error sign" />
          {validationErrorMessage || errorMessage}
        </div>
      )}
    </div>
  );
}

export default UploadCard;
