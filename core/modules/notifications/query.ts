import {
  UserExpoSettingsInstallModel,
  UserExpoSettingsPatchModel,
  UserGetNotificationModel,
  UserNotificationInfo,
  UserNotificationModel,
  UserNotificationUpdateModel,
} from '@models';

<<<<<<< HEAD
=======
import { createApi } from '@reduxjs/toolkit/query/react';
>>>>>>> master
import { axiosBaseQuery } from 'core/operations/data-fetch';
import { createApi } from '@reduxjs/toolkit/query/react';

type UserNotificationUpdate = UserNotificationUpdateModel & {
  id: number;
};

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getNotification: builder.query<UserNotificationInfo, UserGetNotificationModel>({
<<<<<<< HEAD
      query: data => ({ url: `user/notifications/${data.symbolId}`, method: 'get' }),
=======
      query: data => ({ url: `stocks/user/notifications/${data.symbolId}`, method: 'get' }),
>>>>>>> master
    }),
    subscribeNotification: builder.mutation<number, UserNotificationModel>({
      query: data => ({ url: 'stocks/user/notification', method: 'post', data }),
    }),
    updateNotification: builder.mutation<UserNotificationInfo, UserNotificationUpdate>({
<<<<<<< HEAD
      query: data => ({ url: `user/notification/${data.id}`, method: 'put', data }),
    }),
    installPushToken: builder.mutation<void, UserExpoSettingsInstallModel>({
      query: data => ({ url: `user/notification/expo-settings`, method: 'post', data }),
    }),
    editExpoSettings: builder.mutation<void, UserExpoSettingsPatchModel>({
      query: data => ({ url: `user/notification/expo-settings`, method: 'patch', data }),
=======
      query: data => ({ url: `stocks/user/notification/${data.id}`, method: 'put', data }),
    }),
    installPushToken: builder.mutation<void, UserExpoSettingsInstallModel>({
      query: data => ({ url: `stocks/user/notification/expo-settings`, method: 'post', data }),
    }),
    editExpoSettings: builder.mutation<void, UserExpoSettingsPatchModel>({
      query: data => ({ url: `stocks/user/notification/expo-settings`, method: 'patch', data }),
>>>>>>> master
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useSubscribeNotificationMutation,
  useUpdateNotificationMutation,
  useEditExpoSettingsMutation,
} = notificationsApi;
