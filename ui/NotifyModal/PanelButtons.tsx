import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Button, Flex } from 'native-base';
import { CheckMarkLargeIcon } from 'ui/icons/CheckMarkLargeIcon';
import { TrashLargeIcon } from 'ui/icons/TrashLargeIcon';
import { UserNotificationInfo } from '@models';
import { useSubscribeNotificationMutation, useUpdateNotificationMutation } from 'core/modules/notifications/query';
import { useSelector } from 'react-redux';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { getUserId } from 'core/modules/auth/selectors';

type PanelButtonsProps = {
  notification: UserNotificationInfo
  closeModalHandler: () => void
}

export const PanelButtons = memo<PanelButtonsProps>(({ notification, closeModalHandler }) => {
  const symbol = useSelector(getSelectedSymbol)
  const userId = useSelector(getUserId)
  const [subscribeNotification] = useSubscribeNotificationMutation()
  const [updateNotification] = useUpdateNotificationMutation()
  const acceptHandler = async () => {
    if (notification.id === 0) {
      subscribeNotification({ symbol, userId, ...notification })
    } else {
      updateNotification({ delete: false, userId, ...notification })
    }
    closeModalHandler()
  }
  const deleteHandler = async () => {
    if (notification.id) {
      updateNotification({ delete: true, userId, ...notification })
    }
    closeModalHandler()
  }

  return (
    <Flex direction="row" style={styles.panelButtons}>
      <Box style={styles.sideDelete}>
        <Button onPress={deleteHandler} style={styles.buttonDelete} variant={'unstyled'}>
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
