import React from 'react';
import { Box } from 'native-base';
import { BannerHeading } from './BannerHeading';
import { StockGraph } from './StockGraph';

export const StockBanner = () => {
  return (
    <Box px={6}>
      <BannerHeading />
      <StockGraph />
    </Box>
  );
};
