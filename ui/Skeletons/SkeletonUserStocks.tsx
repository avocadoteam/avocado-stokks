import React from 'react';
import { Box } from 'native-base';
import { SkeletonUserStock } from './SkeletonUserStock';

type SkeletonUserStockProps = {

}

export const SkeletonUserStocks = React.memo<SkeletonUserStockProps>(({ }) => {
    const skeletonUserStoksId = [1, 2, 3, 4, 5, 6, 7]

    return (
        <Box>
            {skeletonUserStoksId.map(s => <SkeletonUserStock key={`SUS${s}`} />)}
        </Box>
    );
});
