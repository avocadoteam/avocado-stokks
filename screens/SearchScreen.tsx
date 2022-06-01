import { NavigationScreen } from 'core/models';
import { useLazySearchQuery } from 'core/modules/stock/query';
import { stockActions } from 'core/modules/stock/reducer';
import { Box, ScrollView, useTheme } from 'native-base';
import React, { useCallback } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { If } from 'ui/atoms/If';
import { LoginModal } from 'ui/LoginModal';
import { SearchHeader } from 'ui/SearchHeader';
import { TrendingStock } from 'ui/TrendingStock';

type Props = {
  navigation: NavigationStackProp;
};

export const SearchScreen = React.memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const [startSearch, searchResult] = useLazySearchQuery();
  const dispatch = useDispatch();

  const onPressStock = useCallback((symbol: string) => {
    dispatch(stockActions.selectSymbol(symbol));
    navigation.navigate(NavigationScreen.Stock);
  }, []);

  return (
    <Box backgroundColor={colors.appBackground} flex={1}>
      <SearchHeader search={startSearch} />
      <ScrollView>
        <If is={searchResult.isSuccess && !!searchResult.data.length}>
          {searchResult.data?.map(ts => (
            <TrendingStock onPress={onPressStock} key={ts.symbol} data={ts} />
          ))}
        </If>
      </ScrollView>

      <LoginModal />
    </Box>
  );
});
