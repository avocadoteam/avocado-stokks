import {
  TrendingModel,
  SearchModel,
  SymbolInfoModel,
  SymbolHystoryModel,
  TweetsModel,
  NewsItemsModel,
  YahooSearchResult,
  SymbolGeneralInfo,
  HistoricalData,
  Tweet,
  NewsItem,
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
    tweets: builder.query<Tweet[], TweetsModel>({
      query: data => ({ url: `stocks/symbol/tweets?query=${data.query}`, method: 'get' }),
    }),
    newsItems: builder.query<NewsItem[], NewsItemsModel>({
      query: data => ({ url: `stocks/symbol/news?query=${data.query}`, method: 'get' }),
    }),
  }),
});

export const {
  useGetTrendingSumbolsQuery,
  useLazySearchQuery,
  useSymbolInfoQuery,
  useGraphQuery,
  useTweetsQuery,
  useNewsItemsQuery,
} = stockApi;
