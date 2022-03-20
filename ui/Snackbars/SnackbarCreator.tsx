import { snackbarActions } from 'core/modules/snackbar/reducer';
import { Box, Flex, Text as NativeText, useTheme } from 'native-base';
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Snackbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

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
          label: (<NativeText color={colors.upTextColor}>{actionText}</NativeText>) as unknown as string,
          onPress: actionHandler ?? (() => {}),
        }}
        style={{ backgroundColor: colors.bgSnackbar, ...styles.snackbar }}
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

const styles = StyleSheet.create({
  snackbar: { borderRadius: 24, padding: 5, marginHorizontal: 10 },
});
