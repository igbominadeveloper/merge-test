import { AxiosError } from 'axios';

export default function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.code === '500') {
      // TODO: send error to sentry

      return 'An error occured. Please try again!!!';
    }

    return error.response?.data.message as string;
  }
  return (error as { message: string })?.message;
}
