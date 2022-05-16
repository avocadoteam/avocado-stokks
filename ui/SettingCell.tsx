import { Box, Flex, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';

type Props = {
  textColor?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void;
};

export const SettingCell = memo<Props>(({ before, after, children, textColor, onPress }) => {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Flex my={3} flexDirection="row">
        <Box width={26} alignItems="center" mr={5}>
          {before}
        </Box>
        <Box style={styles.center}>
          <Heading color={textColor ?? colors.headingSmall} size="sm">
            {children}
          </Heading>
        </Box>
        <Box>{after}</Box>
      </Flex>
    </Pressable>
  );
});

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  center: {
    width: width * 0.7,
  },
});
