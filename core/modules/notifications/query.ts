import {
  UserGetNotificationModel,
  UserNotificationInfo,
  UserNotificationInstallModel,
  UserNotificationModel,
  UserNotificationUpdateModel,
} from '@models';

import { axiosBaseQuery } from 'core/operations/data-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';

type UserNotificationUpdate = UserNotificationUpdateModel & {
  id: number;
};

type UserInstallPushToken = UserNotificationInstallModel;

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getNotification: builder.query<UserNotificationInfo, UserGetNotificationModel>({
      query: data => ({ url: `user/notifications/${data.symbolId}`, method: 'get' }),
    }),
    subscribeNotification: builder.mutation<number, UserNotificationModel>({
      query: data => ({ url: 'user/notification', method: 'post', data }),
    }),
    updateNotification: builder.mutation<UserNotificationInfo, UserNotificationUpdate>({
      query: data => ({ url: `user/notification/${data.id}`, method: 'put', data }),
    }),
    installPushToken: builder.mutation<void, UserInstallPushToken>({
      query: data => ({ url: `user/notification/install`, method: 'post', data }),
    }),
  }),
});

export const { useGetNotificationQuery, useSubscribeNotificationMutation, useUpdateNotificationMutation } = notificationsApi;
