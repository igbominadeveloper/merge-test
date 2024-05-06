'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import CameraIcon from '@/components/icons/camera';
import { StringNull } from '@/types';
import useUserFns from '@/hooks/useUserFns';
import Spinner from '@/shared/Spinner';
import { useUserProfile } from '@/services/queries/user';

function ProfilePhoto() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { data } = useUserProfile();
  const [prevImg, setPrevImg] = useState<StringNull>(data?.photo ?? null);
  const { loading, uploadPhoto } = useUserFns();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');

    const file = event.target.files && event.target.files[0];
    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) {
        console.log('Selected file size exceeds 5MB limit.');
        alert('File is more than 5mb');

        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          setPrevImg(reader.result);
          await uploadPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <h3 className="flex-shrink-0 text-[20px] font-medium sm:text-xl">Profile Photo</h3>

      <div>
        <input
          onChange={handleFileChange}
          ref={inputRef}
          className="hidden"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif"
        />
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current?.click();
            }
          }}
          type="button"
          className="grid h-[144px] w-[144px] flex-shrink-0 place-items-center rounded-full border border-dashed"
          disabled={loading.UPLOAD_PHOTO}
        >
          <div className="relative grid h-[128px] w-[128px] place-items-center rounded-full bg-[#919EAB14]">
            {loading.UPLOAD_PHOTO && (
              <div className="absolute left-0 top-1/2 z-10 flex h-full w-full -translate-y-1/2 transform items-center justify-center rounded-full bg-black/30">
                <Spinner color="text-white" className="!ml-0 !mr-0" />
              </div>
            )}

            {prevImg ? (
              <Image
                src={prevImg!}
                alt="Preview Image"
                fill
                className="rounded-full object-cover"
                priority
              />
            ) : (
              <div className="flex flex-col items-center">
                <CameraIcon />
                <span className="text-xs text-disabled">Upload photo</span>
              </div>
            )}
          </div>
        </button>

        {errorMessage && <span className="mt-2 text-sm text-secondary-100">{errorMessage}</span>}
      </div>
    </div>
  );
}
export default ProfilePhoto;
