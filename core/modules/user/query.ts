import { UserDeleteStoreModel, UserStoreItem, UserStoreModel } from '@models';

import { axiosBaseQuery } from 'core/operations/data-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['UserStore'],
  endpoints: builder => ({
    getUserStore: builder.query<UserStoreItem[], void>({
      query: () => ({ url: `user/store`, method: 'get' }),
      providesTags: [{ type: 'UserStore', id: 'list' }],
    }),
    addToUserStore: builder.mutation<void, UserStoreModel>({
      query: data => ({ url: 'user/store', method: 'put', data }),
      invalidatesTags: [{ type: 'UserStore', id: 'list' }],
    }),
    removeFromUserStore: builder.mutation<void, UserDeleteStoreModel>({
      query: data => ({ url: 'user/store', method: 'delete', data }),
      invalidatesTags: [{ type: 'UserStore', id: 'list' }],
    }),
  }),
});

export const { useGetUserStoreQuery, useAddToUserStoreMutation, useRemoveFromUserStoreMutation } = userApi;
