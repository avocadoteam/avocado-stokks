import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationModal, NavigationSnackbar } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { getVisibleSnackbar } from 'core/modules/snackbar/selectors';
import { NotificationOutlineOffIcon } from 'ui/icons/NotificationOutlineOffIcon';
import { SnackbarCreator } from './SnackbarCreator';
import { useTheme } from 'native-base';

export const UnsubscribedSnackbar = memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleSnackbar = useSelector(getVisibleSnackbar);
  const actionHandler = () => {
    dispatch(modalActions.openModal(NavigationModal.Notify));
  };

  return (
    <SnackbarCreator
      snackbarIsVisible={visibleSnackbar === NavigationSnackbar.UnsubscribedNotification}
      actionText={'Undo'}
      actionHandler={actionHandler}
      before={<NotificationOutlineOffIcon color={colors.headingSmall} width={24} height={24} />}
    >
      Stock updates are off
    </SnackbarCreator>
  );
});
