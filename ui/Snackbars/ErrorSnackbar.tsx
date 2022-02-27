import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavigationSnackbar } from 'core/models';
import { getVisibleSnackbar } from 'core/modules/snackbar/selectors';
import { ErrorOutlineIcon } from 'ui/icons/ErrorOutlineIcon';
import { SnackbarCreator } from './SnackbarCreator';

export const ErrorSnackbar = memo(() => {
  const visibleSnackbar = useSelector(getVisibleSnackbar);
  return (
    <SnackbarCreator snackbarIsVisible={visibleSnackbar === NavigationSnackbar.Error} before={<ErrorOutlineIcon />}>
      Some error occured
    </SnackbarCreator>
  );
});
