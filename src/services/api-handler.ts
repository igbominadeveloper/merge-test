import { API_URL, COUNTRY_CODE, TENANT_ID } from '@/config';
import Storage from '@/utils/storage';
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosError } from 'axios';

const apiHandler = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT_ID!,
    'x-country-code': COUNTRY_CODE!,
    'x-trace-id': uuidv4(),
  },
});

export const accessToken = Storage.getCookie('token') || '';
export const currentUser = Storage.getCookie('cu') || '';

if (currentUser) apiHandler.defaults.headers['x-created-by'] = currentUser;
if (accessToken) apiHandler.defaults.headers.Authorization = accessToken;

async function onReqErr(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

async function onResError(error: AxiosError): Promise<AxiosError> {
  if (error.response?.status === 401 || error.response?.status === 403) {
    try {
      if (typeof window !== undefined) {
        window.location.href = '/logout';
      }

      return await Promise.reject(error);
    } catch (e) {
      return Promise.reject(e);
    }
  } else {
    // logout if x-created-by is not in the header
    if (!('x-created-by' in error.config!.headers)) {
      window.location.href = '/logout';
    }

    return Promise.reject(error);
  }
}

apiHandler.interceptors.response.use(config => config, onResError);
apiHandler.interceptors.request.use(config => config, onReqErr);

export default apiHandler;