import trashLottie from 'assets/lottie/trash/trash.json';
import { getUserId } from 'core/modules/auth/selectors';
import { useRemoveFromUserStoreMutation } from 'core/modules/user/query';
import LottieView from 'lottie-react-native';
import React, { memo, PropsWithChildren, useCallback, useRef } from 'react';
import { Animated, I18nManager, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector } from 'react-redux';

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = PropsWithChildren<{
  symbolId: string;
}>;

export const SwipeDeleteStock = memo<Props>(({ children, symbolId }) => {
  const userId = useSelector(getUserId);
  const [deleteSymbol] = useRemoveFromUserStoreMutation();
  const swipRef = useRef<Swipeable | null>(null);
  const close = useCallback(() => {
    swipRef.current?.close();
  }, [swipRef]);

  const renderDelete = useCallback((_progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={close}>
        <AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
          <LottieView source={trashLottie} autoPlay loop={false} speed={0.6} />
        </AnimatedView>
      </RectButton>
    );
  }, []);

  const onSwipe = useCallback(() => {
    deleteSymbol({
      symbolId,
      userId,
    });
    close();
  }, [symbolId, userId, close]);

  return (
    <Swipeable
      ref={swipRef}
      renderRightActions={renderDelete}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={80}
      onSwipeableRightOpen={onSwipe}
    >
      <>{children}</>
    </Swipeable>
  );
});

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    height: 20,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: 'rgba(231, 86, 86, 0.1);',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
