import { Box, Button, useTheme } from 'native-base';
import React, { memo, useState } from 'react';
import { periods, targets } from './constants';
import { useGraphQuery, useSymbolInfoQuery } from 'core/modules/stock/query';

import { GG } from 'ui/graphs/GG';
import { HistoryPeriodTarget } from '@models';
import { SkeletonStockGraph } from 'ui/Skeletons/SkeletonStockBanner/SkeletonStockGraph';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { useSelector } from 'react-redux';

export const StockGraph = memo(() => {
  const { colors } = useTheme();
  const [target, setHistoryTarget] = useState(HistoryPeriodTarget.Day);
  const symbol = useSelector(getSelectedSymbol);
  const { up } = useSymbolInfoQuery(
    { symbol },
    {
      skip: !symbol,
      selectFromResult: ({ data }) => {
        return { up: (data?.regularMarketChange ?? 0) > 0 };
      },
    },
  );

  const { data } = useGraphQuery(
    {
      symbol,
      target,
    },
    { skip: !symbol },
  );
  if (!data) return <SkeletonStockGraph />;

  const [graphData] = data.chart.result;
  return (
    <Box>
      <Box>
        <Box alignItems="center" mb={8}>
          <GG up={up} data={graphData.indicators.quote[0].close ?? []} />
        </Box>
      </Box>
      <Button.Group justifyContent="space-between" colorScheme="gray" variant="ghost">
        {periods.map(period => (
          <Button
            _text={{
              color: colors.textGray,
            }}
            borderRadius={14}
            key={period}
            variant={target === targets[period] ? 'solid' : 'ghost'}
            onPress={() => setHistoryTarget(targets[period])}
          >
            {period}
          </Button>
        ))}
      </Button.Group>
    </Box>
  );
});
