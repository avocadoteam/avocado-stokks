import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Button, Flex, useTheme } from 'native-base';
import { CheckMarkLargeIcon } from 'ui/icons/CheckMarkLargeIcon';
import { TrashLargeIcon } from 'ui/icons/TrashLargeIcon';
import { UserNotificationInfo } from '@models';
import { useSubscribeNotificationMutation, useUpdateNotificationMutation } from 'core/modules/notifications/query';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { getUserId } from 'core/modules/auth/selectors';
import { notificationActions } from 'core/modules/notifications/reducer';
import { snackbarActions } from 'core/modules/snackbar/reducer';
import { NavigationSnackbar } from 'core/models';

type PanelButtonsProps = {
  notification: UserNotificationInfo;
  closeModalHandler: () => void;
};

export const PanelButtons = memo<PanelButtonsProps>(({ notification, closeModalHandler }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const symbol = useSelector(getSelectedSymbol);
  const userId = useSelector(getUserId);
  const [subscribeNotification, payloadSubscribe] = useSubscribeNotificationMutation();
  const [updateNotification, payloadUpdate] = useUpdateNotificationMutation();
  const isLoading = useMemo(() => payloadSubscribe.isLoading || payloadUpdate.isLoading, [payloadSubscribe, payloadUpdate]);

  const trySubscribeNotification = useCallback(async () => {
    const data = await subscribeNotification({ symbol, userId, ...notification });
    if (typeof data === 'number') {
      dispatch(notificationActions.setNotification({ ...notification, id: data }));
    }
  }, [userId, symbol, notification]);
  const tryUpdateNotification = useCallback(async () => {
    const data = await updateNotification({ delete: false, userId, ...notification });
    dispatch(notificationActions.setNotification({ ...notification, ...data.data, deleted: null }));
  }, [userId, notification]);
  const tryDeleteNotification = useCallback(async () => {
    const data = await updateNotification({ delete: true, userId, ...notification });
    dispatch(notificationActions.setNotification({ ...notification, ...data.data, deleted: new Date() }));
  }, [userId, notification]);

  const acceptHandler = useCallback(async () => {
    try {
      if (notification.id === -1) {
        await trySubscribeNotification();
      } else {
        await tryUpdateNotification();
      }
      closeModalHandler();
      dispatch(snackbarActions.openSnackbar(NavigationSnackbar.SubscribedNotification));
    } catch (e) {
      dispatch(snackbarActions.openSnackbar(NavigationSnackbar.Error));
    }
  }, [tryUpdateNotification, trySubscribeNotification]);
  const deleteHandler = useCallback(async () => {
    try {
      await tryDeleteNotification();
      closeModalHandler();
      dispatch(snackbarActions.openSnackbar(NavigationSnackbar.UnsubscribedNotification));
    } catch (e) {
      dispatch(snackbarActions.openSnackbar(NavigationSnackbar.Error));
    }
  }, [notification, tryDeleteNotification]);

  return (
    <Flex direction="row" style={styles.panelButtons}>
      <Box style={styles.sideDelete}>
        <Button
          disabled={isLoading || notification.id === -1}
          onPress={deleteHandler}
          style={styles.buttonDelete}
          variant={'unstyled'}
        >
          <TrashLargeIcon />
        </Button>
      </Box>
      <Box style={styles.sideAccept}>
        <Button onPress={acceptHandler} style={styles.buttonAccept} variant={'unstyled'}>
          <CheckMarkLargeIcon />
        </Button>
      </Box>
    </Flex>
  );
});

const styles = StyleSheet.create({
  panelButtons: {
    marginTop: 40,
  },
  sideDelete: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '50%',
  },
  sideAccept: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },
  buttonAccept: {
    height: 50,
    width: 50,
  },
  buttonDelete: {
    height: 50,
    width: 50,
  },
});
