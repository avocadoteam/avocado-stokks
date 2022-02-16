import React from 'react';
import { Box } from 'native-base';
import { SkeletonUserStock } from './SkeletonUserStock';

export const SkeletonUserStocks = React.memo(({}) => {
  const skeletonUserStoksId = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Box>
      {skeletonUserStoksId.map(s => (
        <SkeletonUserStock key={`SUS${s}`} />
      ))}
    </Box>
  );
});
