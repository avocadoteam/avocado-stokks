import { NavigationScreen } from 'core/models';
import { useLazySearchQuery } from 'core/modules/stock/query';
import { Box, ScrollView, useTheme } from 'native-base';
import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { If } from 'ui/atoms/If';
import { SearchHeader } from 'ui/SearchHeader';
import { TrendingStock } from 'ui/TrendingStock';

type Props = {
  navigation: NavigationStackProp;
};

export const SearchScreen = React.memo<Props>(({ navigation }) => {
  const { colors } = useTheme();
  const [startSearch, searchResult] = useLazySearchQuery();
  const onPressStock = () => {
    navigation.navigate(NavigationScreen.Stock);
  };

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
    </Box>
  );
});
