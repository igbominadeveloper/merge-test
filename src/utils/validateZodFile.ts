import { z } from 'zod';

export const MAX_FILE_SIZE = 2000000;

const validateZodFile = ({
  requiredMessage,
  acceptedFileTypes,
  maxFileSize = MAX_FILE_SIZE,
  isRequired = true,
}: {
  requiredMessage: string;
  acceptedFileTypes: Array<string>;
  maxFileSize?: number;
  isRequired?: boolean;
}) => {
  const acceptedExtensions = acceptedFileTypes
    .map(fileType => `.${fileType.split('/')[1]}`)
    .join(', ');

  return z
    .custom<File>()
    .refine(file => (isRequired ? file instanceof File : true), {
      message: requiredMessage,
    })
    .refine(file => (isRequired ? file && file.size <= maxFileSize : true), {
      message: `Max file size is ${maxFileSize / (1024 * 1024)}MB.`,
    })
    .refine(file => !file || acceptedFileTypes.includes(file.type), {
      message: `Only ${acceptedExtensions} formats are supported.`,
    });
};

export default validateZodFile;
