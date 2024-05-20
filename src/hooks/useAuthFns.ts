import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { LoginSchemaType } from '@/lib/validations/auth/login.schema';
import AuthRoute from '@/services/routes/auth.route';
import { useNotification } from '@/shared/Notification';
import { ROUTES } from '@/utils/routes';
import Storage from '@/utils/storage';
import apiHandler from '@/services/api-handler';
import Encrypt from '@/utils/encrypt';
import getErrorMessage from '@/utils/getErrorMessage';
import { SignupDto } from '@/types/auth';

/* eslint-disable prefer-destructuring */

const useAuthFns = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState({
    SIGNIN: false,
    REGISTER: false,
    SEND_EMAIL_VERIFICATION: false,
    VERIFY_EMAIL_TOKEN: false,
    LOGOUT: false,
    FORGOT_PASSWORD_CODE: false,
    RESET_PASSWORD: false,
  });

  const loadingFn = (state: keyof typeof loading, value: boolean) => {
    setLoading({ ...loading, [state]: value });
  };

  const { onMessage } = useNotification();

  const fns = {
    login: async (data: LoginSchemaType, path = '/') => {
      loadingFn('SIGNIN', true);

      try {
        const res = await apiHandler.post(AuthRoute.login, data, {
          headers: { 'x-created-by': data.username },
        });

        const expires = new Date(new Date().getTime() + res.data.data.expireDurationSeconds * 1000);

        const accessToken = res.data.data.accessToken;

        Storage.setCookie('token', accessToken, expires);
        Storage.setCookie('cu', data.username);
        onMessage(res.data.message);

        window.location.href = path;
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('SIGNIN', false);
      }
    },

    signup: async (data: SignupDto) => {
      const email = data?.username;
      const businessName = data?.businessRequestDto?.name;
      loadingFn('REGISTER', true);

      try {
        const res = await apiHandler.post(AuthRoute.signup, data, {
          headers: {
            'x-created-by': email,
          },
        });

        if (res) {
          await fns.login(
            { username: email, password: data?.password },
            `${ROUTES['verify-email']}?id=${encodeURIComponent(Encrypt.encrypt(`${email},${businessName}`) ?? '')}`,
          );
        }

        Storage.setCookie('cu', data.username);
        onMessage(res.data.message);
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('REGISTER', false);
      }
    },

    sendEmailVerification: async () => {
      loadingFn('SEND_EMAIL_VERIFICATION', true);

      try {
        const res = await apiHandler.post(AuthRoute.sendEmailVerification, {});
        onMessage(res.data.message);
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('SEND_EMAIL_VERIFICATION', false);
      }
    },

    verifyEmailToken: async (token: string, userId: string, callback: () => void) => {
      loadingFn('VERIFY_EMAIL_TOKEN', true);

      try {
        await apiHandler.get(AuthRoute.verifyEmailToken(userId, token));
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('VERIFY_EMAIL_TOKEN', false);
      }
    },

    sendForgotPasswordCode: async (email: string, callback?: () => void) => {
      loadingFn('FORGOT_PASSWORD_CODE', true);

      try {
        await apiHandler.post(AuthRoute.sendForgotPasswordCode(email), {});

        if (callback) callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('FORGOT_PASSWORD_CODE', false);
      }
    },

    resetPassword: async (body: { password: string; code: string }, callback: () => void) => {
      loadingFn('RESET_PASSWORD', true);

      try {
        await apiHandler.post(AuthRoute.resetPassword, { ...body });

        callback();
      } catch (error: any) {
        onMessage(getErrorMessage(error));
      } finally {
        loadingFn('RESET_PASSWORD', false);
      }
    },

    logout: async () => {
      loadingFn('LOGOUT', true);

      const callback = () => {
        Storage.removeCookie('token');
        Storage.removeCookie('cu');
        window.location.href = ROUTES.login;
      };

      try {
        const res = await apiHandler.get(AuthRoute.logout);

        if (res) {
          callback();
        }
      } catch (error: any) {
        callback();
      } finally {
        callback();
        loadingFn('LOGOUT', false);
      }
    },
  };

  return { ...fns, loading };
};

export default useAuthFns;
