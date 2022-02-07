import React from 'react';
import { Box, Flex, HStack, useTheme } from 'native-base';
import { LittleGraphSkeleton } from 'ui/icons/LittleGraphSkeleton';
import { SkeletonBlock } from './SkeletonBlock';

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
                    <Box>
                        <SkeletonBlock width={94} height={15} />
                    </Box>
                    <Box marginTop={1}>
                        <SkeletonBlock />
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <SkeletonBlock width={48} />
                    </Box>
                    <Box marginTop={1}>
                        <SkeletonBlock width={48} />
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
});
