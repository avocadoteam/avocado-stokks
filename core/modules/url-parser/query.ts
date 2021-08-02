// Need to use the React-specific entry point to allow generating React hooks
import { UrlParseResponse, UrlParserModel } from '@models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

// Define a service using a base URL and expected endpoints
export const urlParserApi = createApi({
  reducerPath: 'urlParserApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getImgFromArticle: builder.query<UrlParseResponse, UrlParserModel>({
      query: data => ({ url: 'url-parse', method: 'post', data }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetImgFromArticleQuery } = urlParserApi;
