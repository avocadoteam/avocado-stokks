import { NavigationScreen } from 'core/models';
import { useLazySearchQuery } from 'core/modules/stock/query';
import { stockActions } from 'core/modules/stock/reducer';
import { ScrollView } from 'native-base';
import React, { useCallback } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { ScreenBox } from 'ui/atoms/ScreenBox';
import { LoginModal } from 'ui/LoginModal';
import { SearchHeader } from 'ui/SearchHeader';
import { SkeletonUserStocks } from 'ui/Skeletons/SkeletonUserStocks';
import { TrendingStock } from 'ui/TrendingStock';

type Props = {
  navigation: NavigationStackProp;
};

export const SearchScreen = React.memo<Props>(({ navigation }) => {
  const [startSearch, { data, isFetching }] = useLazySearchQuery();
  const dispatch = useDispatch();

  const onPressStock = useCallback((symbol: string) => {
    dispatch(stockActions.selectSymbol(symbol));
    navigation.navigate(NavigationScreen.Stock);
  }, []);

  return (
    <ScreenBox>
      <SearchHeader search={startSearch} />
      <ScrollView>
        {isFetching ? (
          <SkeletonUserStocks />
        ) : (
          data?.map(ts => <TrendingStock onPress={onPressStock} key={ts.symbol} data={ts} />)
        )}
      </ScrollView>

      <LoginModal />
    </ScreenBox>
  );
});
