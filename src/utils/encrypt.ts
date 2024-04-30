import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const KEY = process.env.ENCRYPT_KEY!;
const IV_LENGTH = 16;

const Encrypt = {
  encrypt(data: string) {
    if (!data) {
      return '';
    }

    const iv = randomBytes(IV_LENGTH); // IV length is 16 bytes for CBC
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(KEY, 'hex'), iv);
    cipher.setAutoPadding(true); // Enable automatic padding for CBC

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const ivStr = iv.toString('hex');

    return ivStr + encrypted;
  },

  decrypt(value: string | null): string {
    if (!value) {
      return '';
    }

    try {
      const iv = Buffer.from(value.slice(0, 32), 'hex'); // IV + encrypted data length is 32 bytes
      const encryptedData = Buffer.from(value.slice(32), 'hex');

      const decipher = createDecipheriv('aes-256-cbc', Buffer.from(KEY, 'hex'), iv);
      decipher.setAutoPadding(true); // Enable automatic padding for CBC

      let decrypted = decipher.update(encryptedData as unknown as string, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      //
      return '';
    }
  },
};

export default Encrypt;
