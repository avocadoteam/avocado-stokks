import { UserNotificationInfo, UserNotificationModel } from '@models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getNotification: builder.query<UserNotificationInfo, { symbol: string; userId: number }>({
      query: data => ({ url: `user/${data.userId}/notifications/${data.symbol}`, method: 'get' }),
    }),
    subscribeNotification: builder.mutation<number, UserNotificationModel>({
      query: data => ({ url: 'user/notification', method: 'post', data }),
    }),
    putNotification: builder.mutation<UserNotificationInfo, { userId: number; id: number }>({
      query: data => ({ url: `user/${data.userId}/notification/${data.id}`, method: 'put', data }),
    }),
  }),
});

export const { useGetNotificationQuery, useSubscribeNotificationMutation, usePutNotificationMutation } = notificationsApi;
