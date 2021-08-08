import React from 'react';
import { Box, Image, Button, useTheme } from 'native-base';
import stockGraph from '../../assets/images/stock-graph.png';

const periods = ['D', 'W', 'M', 'Y', '5Y', '10Y'] as Array<string>;

export const StockGraph = () => {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = React.useState('D');

  const handlePress = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <Box>
      <Box alignItems="center" mb={8}>
        <Image alt="stock graph" source={stockGraph} resizeMode="contain" />
      </Box>
      <Button.Group justifyContent="space-between" colorScheme="gray" variant="ghost">
        {periods.map((period, i) => (
          <Button
            _text={{
              color: colors.textGray,
            }}
            borderRadius={14}
            key={period + i}
            variant={selectedPeriod === period ? 'solid' : 'ghost'}
            onPress={() => handlePress(period)}
          >
            {period}
          </Button>
        ))}
      </Button.Group>
    </Box>
  );
};
