import { snackbarActions } from 'core/modules/snackbar/reducer';
import { Box, Flex, Text as NativeText, useTheme } from 'native-base';
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
//@ts-ignore
import { Snackbar } from 'react-native-paper';

type Props = {
  snackbarIsVisible: boolean;
  duration?: number;
  actionText?: React.ReactNode;
  before?: React.ReactNode;
  children?: React.ReactNode;
  actionHandler?: () => void;
  closeHandler?: () => void;
};

export const SnackbarCreator = memo<Props>(
  ({ snackbarIsVisible, closeHandler, actionText, actionHandler, before, children, duration = 3000 }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    closeHandler =
      closeHandler ??
      useCallback(() => {
        dispatch(snackbarActions.closeSnackbar());
      }, []);

    return (
      <Snackbar
        onDismiss={closeHandler}
        duration={duration}
        visible={snackbarIsVisible}
        action={{
          //@ts-ignore
          label: <NativeText color={colors.upTextColor}>{actionText}</NativeText>,
          onPress: actionHandler ?? (() => {}),
        }}
        style={{ backgroundColor: colors.bgSnackbar, borderRadius: 24, padding: 5, marginHorizontal: 10 }}
      >
        <Flex flexDirection={'row'}>
          <Box>{before}</Box>
          <Box ml={2}>
            <NativeText color={colors.headingSmall}>{children}</NativeText>
          </Box>
        </Flex>
      </Snackbar>
    );
  },
);
