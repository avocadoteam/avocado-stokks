import React, { memo, useState } from 'react';
import { Box, Button, useTheme } from 'native-base';
import { HistoryPeriodTarget } from '@models';
import { LargeGraphSkeleton } from 'ui/icons/LargeGraphSkeleton';
import { periods, targets } from '../../StockBanner/constants';

export const SkeletonStockGraph = memo(({}) => {
  const { colors } = useTheme();
  const [target, setHistoryTarget] = useState(HistoryPeriodTarget.Day);

  return (
    <Box>
      <Box alignItems="center" mb={8}>
        <LargeGraphSkeleton />
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
