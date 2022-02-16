import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { baseUrl } from 'core/constants';
import { State } from 'core/store/root-reducer';

export const delay = (time = 2000) => new Promise(res => setTimeout(res, time));

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data }, bqApi) => {
      try {
        const state = bqApi.getState() as State;

        const result = await axios({
          url: `${baseUrl}${url}`,
          method,
          data,
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        });
        return { data: result.data.data };
      } catch (axiosError) {
        let err = axiosError as AxiosError;
        return {
          error: { status: err.response?.status, data: err.response?.data },
        };
      }
    };
