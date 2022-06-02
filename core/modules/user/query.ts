import { UserDeleteStoreModel, UserStoreItem, UserStoreModel } from '@models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

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
    deleteUser: builder.mutation<void, void>({
      query: () => ({ url: 'user', method: 'delete' }),
      invalidatesTags: [{ type: 'UserStore', id: 'list' }],
    }),
  }),
});

export const { useGetUserStoreQuery, useAddToUserStoreMutation, useRemoveFromUserStoreMutation, useDeleteUserMutation } =
  userApi;
