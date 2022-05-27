import * as Device from 'expo-device';

export const currentDevice = Device.modelName + '_' + Device.osVersion;
