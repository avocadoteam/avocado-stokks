import { getUserId } from 'core/modules/auth/selectors';
import { useDeleteUserMutation } from 'core/modules/user/query';
import { useTheme } from 'native-base';
import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RemoveIcon } from 'ui/icons/RemoveIcon';
import { SettingCell } from 'ui/SettingCell';

export const DangerBanner = memo(() => {
  const { colors } = useTheme();
  const userId = useSelector(getUserId);
  const [deleteUser] = useDeleteUserMutation();

  const onPress = useCallback(() => {
    Alert.alert('Are you sure you want to delete all data?', '', [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteUser();
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }, []);

  if (!userId) return null;

  return (
    <SettingCell textColor={colors.downTextColor} before={<RemoveIcon />} onPress={onPress}>
      Delete all data
    </SettingCell>
  );
});
