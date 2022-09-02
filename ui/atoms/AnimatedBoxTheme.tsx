import React, { memo, useEffect, useState } from 'react';
import { Animated, Appearance } from 'react-native';

type Props = {
  flex?: number;
  children: React.ReactNode;
};

export const AnimatedBoxTheme = memo<Props>(({ children, flex }) => {
  const theme = Appearance.getColorScheme();
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const transition = {
    light: ['rgba(33, 33, 33, 1)', 'rgba(255, 255, 255, 1)'],
    dark: ['rgba(255, 255, 255, 1)', 'rgba(33, 33, 33, 1)'],
  };
  const [bgStyle, setBgStyle] = useState({
    backgroundColor: animation.interpolate({
      inputRange: [0, 300],
      outputRange: transition[theme ?? 'light'],
    }),
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 300,
      duration: 600,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setBgStyle({
          backgroundColor: animation.interpolate({
            inputRange: [0, 300],
            outputRange: transition[theme ?? 'light'],
          }),
        });
        setAnimation(new Animated.Value(0));
      }
    });
  }, [theme]);

  return <Animated.View style={[bgStyle, { flex: flex ?? 1 }]}>{children}</Animated.View>;
});
