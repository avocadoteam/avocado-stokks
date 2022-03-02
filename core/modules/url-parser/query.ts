import { UrlParseResponse, UrlParserModel } from '@models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

const streamQuery = (data: string): UrlParseResponse[] => {
  try {
    const rows = data?.split('\n') ?? [];
    rows.pop();
    return (
      rows.map(v => {
        const [link, imgUrl] = v.split(';');

        return {
          imgUrl: imgUrl?.replace('imgUrl=', '') ?? null,
          link: link?.replace('link=', '') ?? '',
        };
      }) ?? []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const urlParserApi = createApi({
  reducerPath: 'urlParserApi',
  baseQuery: axiosBaseQuery<UrlParseResponse[]>(),
  endpoints: builder => ({
    getImgFromArticle: builder.query<UrlParseResponse[], UrlParserModel>({
      query: data => ({ url: 'url-parse', method: 'post', data, streamQuery }),
    }),
  }),
});

export const { useGetImgFromArticleQuery } = urlParserApi;
