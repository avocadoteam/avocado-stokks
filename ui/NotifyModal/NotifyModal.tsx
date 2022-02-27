import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, StyleSheet } from 'react-native';
import { Box, useTheme } from 'native-base';
import { useVerticalSwipeHandler } from 'core/hooks/useVerticalSwipeHandler';
import { NavigationModal } from 'core/models';
import { getNotification } from 'core/modules/notifications/selectors';
import { getVisibleModal } from 'core/modules/modal/selectors';
import { modalActions } from 'core/modules/modal/reducer';
import { Header } from './Header';
import { PanelButtons } from './PanelButtons';
import { PricePicker } from './PricePicker';
import { TimePicker } from './TimePicker';

export const NotifyModal = memo(({ }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleModal);
  const notification = useSelector(getNotification);

  const [height, setHeight] = useState(404);
  const closeModalHandler = useCallback(() => {
    dispatch(modalActions.closeModal());
    setHeight(404);
  }, []);

  const [touchStartHandler, touchMoveHandler] = useVerticalSwipeHandler({ min: 200, current: height, max: 404 }, setHeight, {
    min: closeModalHandler,
  });

  return (
    <Box>
      <Modal
        transparent={true}
        animationType={'slide'}
        onRequestClose={closeModalHandler}
        visible={visibleModal === NavigationModal.Notify}
      >
        <Box style={styles.mainBox}>
          <Box style={{ ...styles.contentBox, height, backgroundColor: colors.bgTweet }}>
            <Header touchStartHandler={touchStartHandler} touchMoveHandler={touchMoveHandler} />
            <PricePicker {...notification} />
            <TimePicker {...notification} />
            <PanelButtons notification={notification} closeModalHandler={closeModalHandler} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
});

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentBox: {
    flexDirection: 'column',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
  },
});
