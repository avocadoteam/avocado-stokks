import { Box, Heading, Link, Text as NativeText, useTheme } from 'native-base';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppIcon } from './icons/AppIcon';
import Modal from 'react-native-modal';
import { NavigationModal } from 'core/models';
import { StyleSheet } from 'react-native';
import { Toggle } from './atoms/Toggle';
import { getVisibleModal } from 'core/modules/modal/selectors';
import { modalActions } from 'core/modules/modal/reducer';

export const InfoModal = React.memo(({}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleModal);
  const [height, setHeight] = useState(557);

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
    setHeight(557);
  };

  return (
    <Modal
      onBackdropPress={closeModalHandler}
      onSwipeComplete={closeModalHandler}
      swipeDirection="down"
      style={{ margin: 0 }}
      isVisible={visibleModal === NavigationModal.Info}
    >
      <Box style={styles.mainBox}>
        <Box style={{ ...styles.contentBox, height, backgroundColor: colors.bgTweet }}>
          <Toggle />
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
