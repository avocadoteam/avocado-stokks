import { Ionicons } from '@expo/vector-icons';
import { SymbolGeneralInfo } from '@models';
import { NavigationModal } from 'core/models';
import { getUserId } from 'core/modules/auth/selectors';
import { modalActions } from 'core/modules/modal/reducer';
import { getNotification } from 'core/modules/notifications/selectors';
import { stockActions } from 'core/modules/stock/reducer';
import { useAddToUserStoreMutation } from 'core/modules/user/query';
import { Box, Button, Heading, HStack, Icon, Text, useTheme } from 'native-base';
import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { If } from 'ui/atoms/If';
import { CheckMarkGreenIcon } from 'ui/icons/CheckMarkGreenIcon';
import { NotificationOutlineIcon } from 'ui/icons/NotificationOutlineIcon';
import { NotificationOutlineOffIcon } from 'ui/icons/NotificationOutlineOffIcon';
import { SkeletonBannerHeading } from 'ui/Skeletons/SkeletonStockBanner/SkeletonBannerHeading';

type Props = {
  symbol: string;
  isStokkInUserStore: boolean;
  symbolInfo: SymbolGeneralInfo | undefined;
};

export const BannerHeading = memo<Props>(({ symbolInfo, symbol, isStokkInUserStore }) => {
  const { colors } = useTheme();
  const userId = useSelector(getUserId);
  const notification = useSelector(getNotification);
  const isUserSubscribedNotification = useMemo(() => (!notification.deleted ? true : false), [notification.deleted]);

  const dispatch = useDispatch();
  const openModalHandler = useCallback(() => {
    dispatch(modalActions.openModal(NavigationModal.Notify));
  }, []);

  const [addToUserStore, { isLoading }] = useAddToUserStoreMutation();
  const addStockkHandler = useCallback(() => {
    if (!userId) {
      dispatch(stockActions.setStockToBeAdded(symbol));
      dispatch(modalActions.openModal(NavigationModal.Login));

      return;
    }
    if (!isStokkInUserStore) {
      addToUserStore({ symbol });
    }
  }, [symbol]);

  const up = (symbolInfo?.regularMarketChange ?? 0) > 0;

  if (symbolInfo) {
    return (
      <Box>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            <Heading mr={2} color={colors.heading}>
              {symbolInfo?.regularMarketPrice.toFixed(2)}
            </Heading>
            <Text color={up ? colors.upTextColor : colors.downTextColor} fontSize={'xl'}>
              {up ? `+${symbolInfo?.regularMarketChange.toFixed(2)}` : symbolInfo?.regularMarketChange.toFixed(2)}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <If is={isStokkInUserStore}>
              <Button
                variant={'unstyled'}
                onPress={openModalHandler}
                endIcon={
                  <If is={isUserSubscribedNotification} else={<NotificationOutlineIcon />}>
                    <NotificationOutlineOffIcon />
                  </If>
                }
              />
            </If>
            <Button
              disabled={isLoading}
              onPress={addStockkHandler}
              variant="unstyled"
              endIcon={
                <If is={isStokkInUserStore} else={<Icon as={Ionicons} name="ios-add" size={7} color={colors.upTextColor} />}>
                  <CheckMarkGreenIcon />
                </If>
              }
            />
          </HStack>
        </HStack>
        <Text fontSize={'sm'} color={colors.textGray}>
          {symbolInfo?.label}
        </Text>
      </Box>
    );
  } else {
    return <SkeletonBannerHeading />;
  }
});
