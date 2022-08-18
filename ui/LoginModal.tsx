import loadingLottie from 'assets/lottie/loading/loading.json';
import { useGoogleAuth } from 'core/hooks/useGoogleAuth';
import { authUser } from 'core/modules/auth/auth-flow';
import { authGoogleUser } from 'core/modules/auth/google';
import { authActions } from 'core/modules/auth/reducer';
import { modalActions } from 'core/modules/modal/reducer';
import { isLoginModalVisible } from 'core/modules/modal/selectors';
import AnimatedLottieView from 'lottie-react-native';
import { Box, Button, Flex, FormControl, Heading, Input, Stack, Text as NativeText, useTheme } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppIcon } from './icons/AppIcon';
import { GoogleIcon } from './icons/GoogleIcon';

export const LoginModal = React.memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleModal = useSelector(isLoginModalVisible);
  const [view, setView] = useState<'G' | 'L'>('G');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLogin] = useState<{ username: string; password: string }>({ password: '', username: '' });
  const { promptAsync, response } = useGoogleAuth();

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      authGoogleUser(authentication?.accessToken ?? '').then(d => dispatch(authActions.completeAuth(d)));
    }
  }, [response]);
  useEffect(() => {
    if (!visibleModal) {
      setView('G');
    }
  }, [visibleModal]);

  const closeModalHandler = useCallback(() => {
    dispatch(modalActions.closeModal());
  }, []);

  const submit = useCallback(() => {
    setLoading(true);
    setError('');
    authUser(loginData.username, loginData.password)
      .then(r => {
        if (!r.error) {
          dispatch(authActions.completeAuth({ userId: r.userId!, token: r.token! }));
        } else {
          setError(JSON.stringify(r.error));
        }
      })
      .finally(() => setLoading(false));
  }, [loginData]);

  return (
    <Modal
      onBackdropPress={closeModalHandler}
      onSwipeComplete={closeModalHandler}
      swipeDirection="down"
      style={{ margin: 0 }}
      isVisible={visibleModal}
    >
      <Box style={styles.mainBox}>
        <Box style={{ ...styles.contentBox, backgroundColor: colors.bgTweet }}>
          {view === 'G' ? (
            <>
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
                </NativeText>
              </Box>
              <Box style={styles.buttons}>
                <Button borderRadius={20} height={58} backgroundColor={colors.upBg} onPress={() => promptAsync()} mb={2}>
                  <Flex flexDirection={'row'}>
                    <Box flexDirection={'column'} justifyContent={'center'} mr={2}>
                      <GoogleIcon />
                    </Box>
                    <Box>
                      <NativeText color={colors.upTextColor}>Sign in via Google</NativeText>
                    </Box>
                  </Flex>
                </Button>
                <Button borderRadius={20} height={58} backgroundColor={colors.upBg} onPress={() => setView('L')}>
                  <Flex flexDirection={'row'}>
                    <Box>
                      <NativeText color={colors.upTextColor}>Log in</NativeText>
                    </Box>
                  </Flex>
                </Button>
                <Box>
                  <Button height={58} variant={'unstyled'} onPress={closeModalHandler}>
                    <NativeText color={colors.textGray}>Later</NativeText>
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box style={styles.appTitle}>
                <Heading color={colors.headingSmall} size={'md'}>
                  Log in
                </Heading>
              </Box>
              <FormControl>
                <Stack space={5}>
                  {!!error ? (
                    <Stack>
                      <NativeText color={colors.downTextColor}>User not found</NativeText>
                    </Stack>
                  ) : null}
                  <Stack>
                    <FormControl.Label>
                      <NativeText color={colors.upTextColor}>Username</NativeText>
                    </FormControl.Label>
                    <Input
                      variant="outline"
                      fontSize={20}
                      p={2}
                      color={colors.text}
                      onChangeText={v => setLogin(l => ({ ...l, username: v }))}
                    />
                  </Stack>
                  <Stack>
                    <FormControl.Label>
                      <NativeText color={colors.upTextColor}>Password</NativeText>
                    </FormControl.Label>
                    <Input
                      variant="outline"
                      fontSize={20}
                      p={2}
                      color={colors.text}
                      onChangeText={v => setLogin(l => ({ ...l, password: v }))}
                      type="password"
                    />
                  </Stack>
                  <Stack>
                    <Button borderRadius={20} height={58} onPress={submit} backgroundColor={colors.upBg} disabled={loading}>
                      {loading ? (
                        <AnimatedLottieView source={loadingLottie} autoPlay loop speed={0.6} autoSize />
                      ) : (
                        <NativeText color={colors.upTextColor}>Log in</NativeText>
                      )}
                    </Button>
                  </Stack>
                </Stack>
              </FormControl>
            </>
          )}
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
