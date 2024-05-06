import { useState } from 'react';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(error => {
        console.error('Failed to copy:', error);
        setIsCopied(false);
      });
  };

  return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;
