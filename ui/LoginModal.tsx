import React from 'react';
import { Box, Button, Flex, Heading, Text as NativeText, useTheme } from 'native-base';
import { Dimensions, Modal, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationModal } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { getVisibleModal } from 'core/modules/modal/selectors';
import { AppIcon } from './icons/AppIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { useGoogleAuth } from 'core/hooks/useGoogleAuth';

export const LoginModal = React.memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleModal);
  const { promptAsync, response } = useGoogleAuth();
  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={closeModalHandler}
      visible={visibleModal === NavigationModal.Login}
    >
      <Box style={styles.mainBox}>
        <Box style={{ ...styles.contentBox, backgroundColor: colors.bgTweet }}>
          <Box style={styles.appIcon}>
            <AppIcon />
          </Box>
          <Box style={styles.appTitle}>
            <Heading color={colors.headingSmall} size={'md'}>
              Welcome to Stokks
            </Heading>
          </Box>
          <Box style={styles.description}>
            <NativeText textAlign={'center'} color={colors.textDarkGray}>
              Log in to sync your preferences across all of your devices.
              {JSON.stringify(response ?? {})}
            </NativeText>
          </Box>
          <Box style={styles.buttons}>
            <Box>
              <Button borderRadius={20} height={58} backgroundColor={colors.upBg} onPress={() => promptAsync()}>
                <Flex flexDirection={'row'}>
                  <Box flexDirection={'column'} justifyContent={'center'} mr={2}>
                    <GoogleIcon />
                  </Box>
                  <Box>
                    <NativeText color={colors.upTextColor}>Sign in via Google</NativeText>
                  </Box>
                </Flex>
              </Button>
            </Box>
            <Box>
              <Button height={58} variant={'unstyled'} onPress={closeModalHandler}>
                <NativeText color={colors.textGray}>Later</NativeText>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
});

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentBox: {
    height: height * 0.92,
    flexDirection: 'column',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
  },
  appIcon: {
    marginTop: height * 0.18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appTitle: {
    marginTop: height * 0.04,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  description: {
    marginTop: height * 0.015,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: height * 0.28,
  },
});
