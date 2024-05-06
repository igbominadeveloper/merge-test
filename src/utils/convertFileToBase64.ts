export default function fileToBase64(uploadedFile: File): Promise<string> {
  if (uploadedFile instanceof File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = () => {
        const base64String = (reader.result && (reader.result as string as string)) ?? '';
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }

  return Promise.resolve('');
}
