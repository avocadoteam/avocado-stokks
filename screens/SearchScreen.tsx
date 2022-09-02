import { NavigationScreen } from 'core/models';
import { useLazySearchQuery } from 'core/modules/stock/query';
import { stockActions } from 'core/modules/stock/reducer';
import { ScrollView, useTheme } from 'native-base';
import React, { useCallback } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { AnimatedBoxTheme } from 'ui/atoms/AnimatedBoxTheme';
import { LoginModal } from 'ui/LoginModal';
import { SearchHeader } from 'ui/SearchHeader';
import { SkeletonUserStocks } from 'ui/Skeletons/SkeletonUserStocks';
import { TrendingStock } from 'ui/TrendingStock';

type Props = {
  navigation: NavigationStackProp;
};

export const SearchScreen = React.memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const [startSearch, { data, isFetching }] = useLazySearchQuery();
  const dispatch = useDispatch();

  const onPressStock = useCallback((symbol: string) => {
    dispatch(stockActions.selectSymbol(symbol));
    navigation.navigate(NavigationScreen.Stock);
  }, []);

  return (
    <AnimatedBoxTheme>
      <SearchHeader search={startSearch} />
      <ScrollView>
        {isFetching ? (
          <SkeletonUserStocks />
        ) : (
          data?.map(ts => <TrendingStock onPress={onPressStock} key={ts.symbol} data={ts} />)
        )}
      </ScrollView>

      <LoginModal />
    </AnimatedBoxTheme>
  );
});
