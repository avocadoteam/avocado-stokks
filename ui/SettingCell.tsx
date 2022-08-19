import { Box, Flex, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';
import { Dimensions, StyleSheet, TouchableHighlight } from 'react-native';

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
    <TouchableHighlight onPress={onPress}>
      <Flex py={3} flexDirection="row" background={colors.appBackground} px={5}>
        <Box width={26} alignItems="center" justifyContent={'center'} mr={3}>
          {before}
        </Box>
        <Box style={styles.center}>
          <Heading color={textColor ?? colors.headingSmall} size="sm">
            {children}
          </Heading>
        </Box>
        <Box>{after}</Box>
      </Flex>
    </TouchableHighlight>
  );
});

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  center: {
    width: width * 0.7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
