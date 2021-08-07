import { TrendingModel, YahooSearchResult } from '@models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getTrendingSumbols: builder.query<YahooSearchResult[], TrendingModel>({
      query: data => ({ url: 'stocks/symbol/trending', method: 'post', data }),
    }),
  }),
});

export const { useGetTrendingSumbolsQuery } = stockApi;
