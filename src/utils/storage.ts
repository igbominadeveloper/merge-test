import Cookies from 'js-cookie';
import Encrypt from './encrypt';

const expireDefault = new Date(new Date().getTime() + 604800 * 1000);

const Storage = {
  setCookie(key: string, value: string, days: number | Date = expireDefault) {
    Cookies.set(key, Encrypt.encrypt(value), { expires: days, secure: true, sameSite: 'strict' });
  },

  getCookie(key: string) {
    const data = Cookies.get(key);
    if (!data) return null;
    const decrypted = Encrypt.decrypt(data as string);
    return decrypted;
  },

  removeCookie(key: string) {
    return Cookies.remove(key);
  },

  setLocalStorage(key: string, data: any) {
    if (!data) {
      return;
    }

    localStorage.setItem(key, Encrypt.encrypt(data));
  },

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  },

  getLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return Encrypt.decrypt(data);
  },
};

export default Storage;
