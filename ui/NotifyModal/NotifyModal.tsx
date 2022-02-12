import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, StyleSheet } from 'react-native';
import { Box, useTheme } from 'native-base';
import { getNoticification, getVisibleNotifyModal } from 'core/modules/stock/selectors';
import { closeNotifyModal } from 'core/modules/stock/reducer';
import { Header } from './Header';
import { PanelButtons } from './PanelButtons';
import { PricePicker } from './PricePicker';
import { TimePicker } from './TimePicker';
import { useVerticalSwipeHandler } from 'core/hooks/useVerticalSwipeHandler';

export const NotifyModal = memo(({}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isNotifyModalVisible = useSelector(getVisibleNotifyModal);
  const { triggerParam, triggerValue, notifyInterval } = useSelector(getNoticification);

  const [height, setHeight] = useState(404);
  const minHeightHandler = () => {
    dispatch(closeNotifyModal());
    setHeight(404);
  };
  const [touchStartHandler, touchMoveHandler] = useVerticalSwipeHandler({ min: 100, current: height }, setHeight, {
    min: minHeightHandler,
  });

  return (
    <Box>
      <Modal
        transparent={true}
        animationType={'slide'}
        onRequestClose={() => dispatch(closeNotifyModal())}
        visible={isNotifyModalVisible}
      >
        <Box style={styles.mainBox}>
          <Box style={{ ...styles.contentBox, height, backgroundColor: colors.bgTweet }}>
            <Header touchStartHandler={touchStartHandler} touchMoveHandler={touchMoveHandler} />
            <PricePicker triggerParam={triggerParam} triggerValue={triggerValue} />
            <TimePicker notifyInterval={notifyInterval} />
            <PanelButtons />
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
