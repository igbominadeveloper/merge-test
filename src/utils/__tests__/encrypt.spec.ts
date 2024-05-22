import { randomBytes } from 'crypto';
import Encrypt from '../encrypt';

const originalENV = process.env;

afterAll(() => {
  process.env = originalENV;
});
describe('Encrypt module', () => {
  // TODO - couldn't test the error catching path of these functions
  // one way to be able to do this is to be able to isolate the process.env.ENCRYPT_KEY and change it without polluting the global scope
  describe('encrypt function', () => {
    it('should return empty string for empty input', () => {
      const result = Encrypt.encrypt('');
      expect(result).toBe('');
    });

    it('should correctly encrypt a string', () => {
      process.env.ENCRYPT_KEY = randomBytes(32).toString('hex'); // Mock ENCRYPT_KEY
      const data = 'Hello, World!';
      const encryptedData = Encrypt.encrypt(data);
      expect(encryptedData).not.toBe(data);
      expect(encryptedData).not.toBeNull();
    });
  });

  describe('decrypt function', () => {
    it('should return empty string for empty input', () => {
      const result = Encrypt.decrypt('');
      expect(result).toBe('');
    });

    it('should correctly decrypt an encrypted string', () => {
      process.env.ENCRYPT_KEY = randomBytes(32).toString('hex'); // Mock ENCRYPT_KEY
      const data = 'Hello, World!';
      const encryptedData = Encrypt.encrypt(data);
      const decryptedData = Encrypt.decrypt(encryptedData!);
      expect(decryptedData).toBe(data);
    });

    it('should return null for invalid decryption input', () => {
      const invalidData = 'invalid encrypted data';
      const result = Encrypt.decrypt(invalidData);
      expect(result).toBeNull();
    });

    it('should handle decryption of data with invalid IV length', () => {
      process.env.ENCRYPT_KEY = randomBytes(32).toString('hex'); // Mock ENCRYPT_KEY
      const invalidIVData = `shortiv${Encrypt.encrypt('Test')!.slice(8)}`;
      const result = Encrypt.decrypt(invalidIVData);
      expect(result).toBeNull();
    });

    it('should handle decryption of data with tampered encrypted content', () => {
      process.env.ENCRYPT_KEY = randomBytes(32).toString('hex'); // Mock ENCRYPT_KEY
      const data = 'Hello, World!';
      const encryptedData = Encrypt.encrypt(data);
      const tamperedData = `${encryptedData!.slice(0, -1)}`; // Tamper the encrypted data
      const result = Encrypt.decrypt(tamperedData);
      expect(result).toBeNull();
    });
  });
});
