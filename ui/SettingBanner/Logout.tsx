import { authActions } from 'core/modules/auth/reducer';
import { getUserId } from 'core/modules/auth/selectors';
import { useTheme } from 'native-base';
import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SettingCell } from 'ui/SettingCell';

export const Logout = memo(() => {
  const { colors } = useTheme();
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    Alert.alert('Are you sure you want to log out?', '', [
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          dispatch(authActions.deleteAuth());
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
    <SettingCell textColor={colors.downTextColor} onPress={onPress}>
      Log out
    </SettingCell>
  );
});
