import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { State } from 'core/store/root-reducer';
import { baseUrl } from 'core/constants';

export const axiosBaseQuery =
  <CustomResponse = unknown>(): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      streamQuery?: (data: string) => CustomResponse;
    },
    CustomResponse,
    unknown
  > =>
  async ({ url, method, data, streamQuery }, bqApi) => {
    try {
      const state = bqApi.getState() as State;

      const result = await axios({
        url: `${baseUrl}${url}`,
        method,
        data,
        headers: state.auth.token
          ? {
              Authorization: `Bearer ${state.auth.token}`,
            }
          : {},
      });
      if (streamQuery) {
        return { data: streamQuery(result.data) };
      }
      return { data: result.data.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
