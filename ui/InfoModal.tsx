import { useVerticalSwipeHandler } from 'core/hooks/useVerticalSwipeHandler';
import { NavigationModal } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { getVisibleModal } from 'core/modules/modal/selectors';
import { notificationToggle } from 'core/modules/notifications/actions';
import { notificationActions } from 'core/modules/notifications/reducer';
import { isNotificationAllowed } from 'core/modules/notifications/selectors';
import { Box, Heading, Link, Switch, Text as NativeText, useTheme } from 'native-base';
import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Toggle } from './atoms/Toggle';
import { AppIcon } from './icons/AppIcon';

export const InfoModal = React.memo(({}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleModal);
  const enabled = useSelector(isNotificationAllowed);
  const [height, setHeight] = useState(557);

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
    setHeight(557);
  };
  const [touchStartHandler, touchMoveHandler] = useVerticalSwipeHandler({ min: 400, current: height, max: 600 }, setHeight, {
    min: closeModalHandler,
  });

  const toggle = () => {
    if (enabled) {
      dispatch(notificationActions.allowNotifications(false));
    } else {
      dispatch(notificationToggle());
    }
  };

  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={closeModalHandler}
      visible={visibleModal === NavigationModal.Info}
    >
      <Box style={styles.mainBox}>
        <Box style={{ ...styles.contentBox, height, backgroundColor: colors.bgTweet }}>
          <Toggle touchStartHandler={touchStartHandler} touchMoveHandler={touchMoveHandler} />
          <Box style={styles.appIcon}>
            <AppIcon />
          </Box>
          <Box style={styles.appTitle}>
            <Heading color={colors.headingSmall} size={'sm'}>
              Stokks
            </Heading>
          </Box>
          <Box style={styles.appVersion}>
            <NativeText color={colors.textDarkGray}>1.0</NativeText>
          </Box>
          <Box>
            <NativeText color={colors.textDarkGray}>notifications</NativeText>
            <Switch value={enabled} onChange={toggle} colorScheme="emerald" />
          </Box>
          <Box style={styles.additionalInfo}>
            <NativeText color={colors.textDarkGray}>Icons from</NativeText>
            <Link isUnderlined _text={{ color: colors.textDarkGray, marginLeft: 1 }} href={'https://useanimations.com/'}>
              useanimations.com
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
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
  appIcon: {
    marginTop: 97,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appTitle: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appVersion: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  additionalInfo: {
    marginTop: 157,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
