import React from 'react';
import { Box, Flex, useTheme } from 'native-base';
import { LittleGraphSkeleton } from 'ui/icons/LittleGraphSkeleton';
import { SkeletonBox } from './SkeletonBox';

type SkeletonUserStockProps = {
}

export const SkeletonUserStock = React.memo<SkeletonUserStockProps>(({ }) => {
    const { colors } = useTheme();

    return (
        <Box>
            <Flex flexDirection={"row"} flex={3} px={6} py={6} backgroundColor={colors.appBackground}>
                <Box mr={7}>
                    <LittleGraphSkeleton />
                </Box>
                <Box style={{ marginRight: 'auto', width: '55%' }}>
                    <SkeletonBox width={94} height={15} />
                    <SkeletonBox marginTop={6} />
                </Box>
                <Box>
                    <SkeletonBox width={48} />
                    <SkeletonBox width={48} marginTop={6} />
                </Box>
            </Flex>
        </Box>
    );
});
