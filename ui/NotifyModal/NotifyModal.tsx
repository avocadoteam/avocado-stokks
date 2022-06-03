import { NavigationModal } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { getVisibleModal } from 'core/modules/modal/selectors';
import { notificationActions } from 'core/modules/notifications/reducer';
import { getModalHeight, getNotification } from 'core/modules/notifications/selectors';
import { Box, useTheme } from 'native-base';
import React, { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './Header';
import { PanelButtons } from './PanelButtons';
import { PricePicker } from './PricePicker';
import { TimePicker } from './TimePicker';

export const NotifyModal = memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleModal);
  const notification = useSelector(getNotification);
  const height = useSelector(getModalHeight);

  const closeModalHandler = useCallback(() => {
    dispatch(modalActions.closeModal());
    dispatch(notificationActions.setModalHeight(404));
  }, []);

  return (
    <Modal
      onBackdropPress={closeModalHandler}
      onSwipeComplete={closeModalHandler}
      swipeDirection="down"
      style={{ margin: 0 }}
      isVisible={visibleModal === NavigationModal.Notify}
      propagateSwipe
    >
      <Box style={{ ...styles.contentBox, height, backgroundColor: colors.bgTweet }}>
        <Header />
        <PricePicker triggerParam={notification.triggerParam} triggerValue={notification.triggerValue} />
        <TimePicker notifyInterval={notification.notifyInterval} />
        <PanelButtons notification={notification} closeModalHandler={closeModalHandler} />
      </Box>
    </Modal>
  );
});

const styles = StyleSheet.create({
  contentBox: {
    display: 'flex',
    marginTop: 'auto',
    flexDirection: 'column',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingLeft: 24,
  },
});
