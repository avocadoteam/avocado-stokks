import { UserNotificationInfo, UserGetNotificationModel, UserNotificationModel, UserNotificationUpdateModel } from '@models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'core/operations/data-fetch';

type UserNotificationUpdate = UserNotificationUpdateModel & {
  userId: number;
  id: number;
};

type UserInstallPushToken = {
  token: string;
  userId: number;
};

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getNotification: builder.query<UserNotificationInfo, UserGetNotificationModel>({
      query: data => ({ url: `user/${data.userId}/notifications/${data.symbolId}`, method: 'get' }),
    }),
    subscribeNotification: builder.mutation<number, UserNotificationModel>({
      query: data => ({ url: 'user/notification', method: 'post', data }),
    }),
    updateNotification: builder.mutation<UserNotificationInfo, UserNotificationUpdate>({
      query: data => ({ url: `user/${data.userId}/notification/${data.id}`, method: 'put', data }),
    }),
    installPushToken: builder.mutation<void, UserInstallPushToken>({
      query: data => ({ url: `user/${data.userId}/notification/install`, method: 'post', data }),
    }),
  }),
});

export const { useGetNotificationQuery, useSubscribeNotificationMutation, useUpdateNotificationMutation } = notificationsApi;
