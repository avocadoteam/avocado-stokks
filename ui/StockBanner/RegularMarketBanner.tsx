import { SymbolGeneralInfo } from '@models';
import { convertNumberToShortForm } from 'core/utils';
import { Box, Flex } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SkeletonRegularMarketBanner } from 'ui/Skeletons/SkeletonStockBanner/SkeletonRegularMarketBanner';
import { RegularMarketValue } from '../RegularMarketValue';

type RegularMarketBannerProps = {
  data?: SymbolGeneralInfo;
};

export const RegularMarketBanner = React.memo<RegularMarketBannerProps>(({ data }) => {
  if (data) {
    return (
      <Flex marginTop={8} direction="row" style={styles.mainBox}>
        <Box style={styles.leftSide}>
          <RegularMarketValue key="Open" title="Open" value={data?.regularMarketOpen ?? 0} />
          <RegularMarketValue key="High" my={3} title="High" value={data?.regularMarketDayRange.high ?? 0} />
          <RegularMarketValue key="Low" title="Low" value={data?.regularMarketDayRange.low ?? 0} />
        </Box>
        <Box style={styles.rightSide}>
          <RegularMarketValue
            key="MarketCup"
            title="Market Cup"
            value={data?.marketCap ? convertNumberToShortForm(data.marketCap) : 0}
          />
          <RegularMarketValue
            key="Volume"
            my={3}
            title="Volume"
            value={data?.regularMarketVolume ? convertNumberToShortForm(data.regularMarketVolume) : 0}
          />
          <RegularMarketValue key="Low" title="Low" value={data?.regularMarketDayRange.low ?? 0} />
        </Box>
      </Flex>
    );
  } else {
    return <SkeletonRegularMarketBanner />;
  }
});

const styles = StyleSheet.create({
  leftSide: {
    width: '50%',
  },
  rightSide: {
    width: '50%',
  },
  mainBox: {
    width: '100%',
  },
});
