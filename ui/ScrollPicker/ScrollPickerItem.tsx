import { Flex, Heading, useTheme } from 'native-base';
import React, { memo } from 'react';

type ScrollPickerProps = {
  title: string;
  height: number;
  marginForFirstAndLastElement: number;
  marginVertical: number;
  isSelected: boolean;
  isLastElement: boolean;
  isFirstElement: boolean;
};

export const ScrollPickerItem = memo<ScrollPickerProps>(
  ({ isLastElement, isFirstElement, height, marginForFirstAndLastElement, title, isSelected, marginVertical }) => {
    const { colors } = useTheme();

    return (
      <Flex
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        style={{
          height: height,
          marginTop: isFirstElement ? marginForFirstAndLastElement : marginVertical,
          marginBottom: isLastElement ? marginForFirstAndLastElement : marginVertical,
        }}
      >
        <Heading size={'md'} color={isSelected ? colors.headingSmall : colors.textGray}>
          {title}
        </Heading>
      </Flex>
    );
  },
);
