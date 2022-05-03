import { useVerticalSwipeHandler } from 'core/hooks/useVerticalSwipeHandler';
import { NavigationModal } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { getVisibleModal } from 'core/modules/modal/selectors';
import { notificationToggle } from 'core/modules/notifications/actions';
import Device from 'expo-device';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { Box, Button, Heading, Link, Switch, Text as NativeText, useTheme } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Platform, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Toggle } from './atoms/Toggle';
import { AppIcon } from './icons/AppIcon';

export const InfoModal = React.memo(({}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const [notifReq, setNotifReq] = useState('');
  const [token, setToken] = useState('');
  const notificationListener = useRef<Subscription>();
  const visibleModal = useSelector(getVisibleModal);
  const [height, setHeight] = useState(557);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(!!notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
    };
  }, []);

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
    setHeight(557);
  };
  const [touchStartHandler, touchMoveHandler] = useVerticalSwipeHandler({ min: 400, current: height, max: 600 }, setHeight, {
    min: closeModalHandler,
  });

  const getToken = () => {
    dispatch(notificationToggle());
  };
  const getTokenHere = () => {
    registerForPushNotificationsAsync().then(({ token, response }) => {
      setNotifReq(response);
      setToken(token);
    });
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
            notifications <Button onPress={getToken}>get token</Button>
            <Switch value={notification} onChange={() => getToken()} colorScheme="emerald" />
          </Box>
          <Box>
            notifications just click <Button onPress={getTokenHere}>get token</Button>
          </Box>
          <Box>
            Response: {notifReq} ; Token: {token};
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

async function registerForPushNotificationsAsync() {
  let token = '';
  let response = '';
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      response = 'Failed to get push token for push notification!';
      return { response, token };
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    response = 'Must use physical device for Push Notifications';
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return { token, response };
}

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
