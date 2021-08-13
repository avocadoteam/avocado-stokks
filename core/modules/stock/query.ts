import {
  HistoricalData,
  SearchModel,
  SymbolGeneralInfo,
  SymbolHystoryModel,
  SymbolInfoModel,
  TrendingModel,
  YahooSearchResult,
} from '@models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getTrendingSumbols: builder.query<YahooSearchResult[], TrendingModel>({
      query: data => ({ url: 'stocks/symbol/trending', method: 'post', data }),
    }),
    search: builder.query<YahooSearchResult[], SearchModel>({
      query: data => ({ url: `stocks/search?query=${data.query}`, method: 'get' }),
    }),
    symbolInfo: builder.query<SymbolGeneralInfo, SymbolInfoModel>({
      query: data => ({ url: `stocks/symbol/info?symbol=${data.symbol}`, method: 'get' }),
    }),
    graph: builder.query<HistoricalData, SymbolHystoryModel>({
      query: data => ({ url: 'stocks/symbol/history', method: 'post', data }),
    }),
  }),
});

export const { useGetTrendingSumbolsQuery, useLazySearchQuery, useSymbolInfoQuery, useGraphQuery } = stockApi;
