import React, { useEffect } from 'react';
import Image from 'next/image';
import downloadIcon from '@/assets/icons/cloud-download.svg';
import pdfIcon from '@/assets/icons/pdf-icon.svg';
import Button from '@/shared/Form/Button';

interface Props {
  file: File;
  onClose: () => void;
  onNext: () => void;
}

let timeout = 0;
export default function Preview(props: Props) {
  const { file, onClose, onNext } = props;

  const download = () => {
    const url = URL.createObjectURL(file);

    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    timeout = window.setTimeout(() => {
      onNext();
    }, 2000);
  };

  const getFileSize = () => {
    const KB = 1024;
    const MB = KB * 1024;
    const bytes = file.size;

    if (bytes >= MB) {
      return `${(bytes / MB).toFixed(2)} MB`;
    }

    if (bytes >= KB) {
      return `${(bytes / KB).toFixed(2)} KB`;
    }
    return `${bytes} bytes`;
  };

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="my-6 flex gap-2 rounded-lg border border-gray-200 bg-gray-100 p-5">
        <Image src={pdfIcon} width={32} alt="pdf-icon" />
        <div className="flex flex-1 flex-col gap-1 text-sm">
          <p className="font-semibold">{file.name}</p>
          <p className="text-xs">{getFileSize()}</p>
        </div>
        <Image src={downloadIcon} width={25} alt="upload-icon" />
      </div>

      <section className="mt-10 flex flex-col gap-3 md:flex-row md:gap-6">
        <Button
          text="Cancel"
          type="button"
          variant="secondary"
          handleClick={onClose}
          className="w-full rounded-lg bg-gray-700/10 p-4 py-3 text-sm font-bold text-black"
        />
        <Button
          onClick={download}
          text="Download"
          className="w-full rounded-lg bg-primary-main p-4 py-3 text-sm font-bold text-white hover:bg-primary-main/90"
        />
      </section>
    </>
  );
}
