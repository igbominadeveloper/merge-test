import Cookies from 'js-cookie';
import Encrypt from './encrypt';

const expireDefault = new Date(new Date().getTime() + 604800 * 1000);

const Storage = {
  setCookie(key: string, value: string, days: number | Date = expireDefault) {
    Cookies.set(key, Encrypt.encrypt(value) ?? '', {
      expires: days,
      secure: true,
      sameSite: 'strict',
    });
  },

  getCookie(key: string) {
    const data = Cookies.get(key);
    if (!data) return null;
    const decrypted = Encrypt.decrypt(data);
    return decrypted;
  },

  removeCookie(key: string) {
    return Cookies.remove(key);
  },
};

export default Storage;
