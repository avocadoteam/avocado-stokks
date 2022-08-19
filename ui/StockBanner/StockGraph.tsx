import { HistoryPeriodTarget } from '@models';
import { useGraphQuery, useSymbolInfoQuery } from 'core/modules/stock/query';
import { getSelectedSymbol } from 'core/modules/stock/selectors';
import { Box, Button, useTheme } from 'native-base';
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineGraph } from 'ui/graphs/LineChart';
import { SkeletonStockGraph } from 'ui/Skeletons/SkeletonStockBanner/SkeletonStockGraph';
import { periods, targets } from './constants';

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
      <Box alignItems="center" mb={8}>
        <LineGraph
          up={up}
          data={graphData.indicators.quote[0].close ?? []}
          target={target}
          timestamps={graphData.timestamp}
        />
      </Box>
      <Button.Group justifyContent="space-evenly" colorScheme="gray" variant="ghost">
        {periods.map(period => (
          <Button
            width={48.83}
            height={44}
            _text={{
              color: colors.textGray,
            }}
            borderRadius={14}
            key={period}
            colorScheme={colors.date_switch}
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
