import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'native-base';
import { NavigationModal, NavigationSnackbar } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { getVisibleSnackbar } from 'core/modules/snackbar/selectors';
import { NotificationOutlineIcon } from 'ui/icons/NotificationOutlineIcon';
import { SnackbarCreator } from './SnackbarCreator';

export const SubscribedSnackbar = memo(() => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const visibleSnackbar = useSelector(getVisibleSnackbar);
  const actionHandler = () => {
    dispatch(modalActions.openModal(NavigationModal.Notify));
  };

  return (
    <SnackbarCreator
      snackbarIsVisible={visibleSnackbar === NavigationSnackbar.SubscribedNotification}
      actionText={'Modify'}
      actionHandler={actionHandler}
      before={<NotificationOutlineIcon color={colors.headingSmall} width={24} height={24} />}
    >
      Stock updates are on
    </SnackbarCreator>
  );
});
