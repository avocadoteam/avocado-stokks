import { Ionicons } from '@expo/vector-icons';
import { SymbolGeneralInfo } from '@models';
import { NavigationModal } from 'core/models';
import { modalActions } from 'core/modules/modal/reducer';
import { getNotification } from 'core/modules/notifications/selectors';
import { useAddToUserStoreMutation } from 'core/modules/user/query';
import { getUserStoreData } from 'core/modules/user/selectors';
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
  userId: number;
  symbolInfo: SymbolGeneralInfo | undefined;
};

export const BannerHeading = memo<Props>(({ symbolInfo, symbol, userId }) => {
  const { colors } = useTheme();
  const notification = useSelector(getNotification);
  const isUserSubscribedNotification = useMemo(() => (!notification.deleted ? true : false), [notification.deleted]);
  const stokks = useSelector(getUserStoreData);
  const isStokkInUserStore = useMemo(() => stokks.some(s => s.symbol === symbol), [stokks, symbol]);

  const dispatch = useDispatch();
  const openModalHandler = useCallback(() => {
    dispatch(modalActions.openModal(NavigationModal.Notify));
  }, []);

  const [addToUserStore, { isLoading }] = useAddToUserStoreMutation();
  const addStockkHandler = useCallback(() => {
    if (!isStokkInUserStore) {
      addToUserStore({ symbol, userId });
    }
  }, [symbol, userId]);

  const up = (symbolInfo?.regularMarketChange ?? 0) > 0;

  if (symbolInfo) {
    return (
      <Box mb={8}>
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
                  <If else={<NotificationOutlineIcon />} is={isUserSubscribedNotification}>
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
          {symbolInfo?.fullExchangeName}
        </Text>
      </Box>
    );
  } else {
    return <SkeletonBannerHeading />;
  }
});
