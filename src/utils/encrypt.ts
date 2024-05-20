import CryptoJS from 'crypto-js';

const KEY = process.env.ENCRYPT_KEY!;

const Encrypt = {
  encrypt(data: string): any | PromiseLike<ArrayBuffer> {
    return !data ? null : CryptoJS.AES.encrypt(JSON.stringify(data), KEY).toString();
  },
  decrypt(value: string | null): any {
    if (!value) {
      return null;
    }

    try {
      const decryptData = CryptoJS.AES.decrypt(value.toString(), KEY);
      return JSON.parse(decryptData.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      if (typeof window !== 'undefined') window.location.href = '/logout';
    }
  },
};

export default Encrypt;
