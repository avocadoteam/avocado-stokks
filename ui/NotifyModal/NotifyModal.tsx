import { Box, useTheme } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './Header';
import Modal from 'react-native-modal';
import { NavigationModal } from 'core/models';
import { PanelButtons } from './PanelButtons';
import { PricePicker } from './PricePicker';
import { StyleSheet } from 'react-native';
import { TimePicker } from './TimePicker';
import { getNotification } from 'core/modules/notifications/selectors';
import { getVisibleModal } from 'core/modules/modal/selectors';
import { modalActions } from 'core/modules/modal/reducer';

export const NotifyModal = memo(({}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleModal);
  const notification = useSelector(getNotification);

  const [height, setHeight] = useState(404);
  const closeModalHandler = useCallback(() => {
    dispatch(modalActions.closeModal());
    setHeight(404);
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
    paddingHorizontal: 24,
  },
});
