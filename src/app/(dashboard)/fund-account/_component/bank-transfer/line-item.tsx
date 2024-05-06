'use client';

import Copy from '@/components/icons/copy';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useNotification } from '@/shared/Notification';

function RenderItem({ title, value }: { title: string; value: string }) {
  const { copyToClipboard } = useCopyToClipboard();
  const { onMessage } = useNotification();

  const handleCopyClick = () => {
    copyToClipboard(value);
    onMessage(`${title} copied!`);
  };

  return (
    <div onClick={handleCopyClick} className="group cursor-pointer">
      <small className="text-sm font-normal text-secondary-400 sm:text-base">{title}</small>

      <div className="flex items-center justify-between">
        <p className="text-base font-semibold sm:text-xl">{value}</p>

        <button type="button" className="flex items-end space-x-1">
          <Copy />
          <span className="text-sm font-medium text-primary-main group-hover:text-primary-main/80 sm:text-base">
            Copy
          </span>
        </button>
      </div>
    </div>
  );
}

export default RenderItem;
