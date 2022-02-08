import React from 'react';
import { Box, Flex, useTheme } from 'native-base';
import * as shape from 'd3-shape';
import { SkeletonBox } from './SkeletonBox';
import { AreaChart } from 'react-native-svg-charts';

type SkeletonUserStockProps = {
}

export const SkeletonUserStock = React.memo<SkeletonUserStockProps>(({ }) => {
    const { colors } = useTheme();

    return (
        <Box>
            <Flex flexDirection={"row"} flex={3} px={6} py={6} backgroundColor={colors.appBackground}>
                <Box mr={7}>
                    <AreaChart
                        style={{ height: 32, width: 82 }}
                        contentInset={{ top: 5, bottom: 5 }}
                        data={[0, 5, 10, 12, 20]}
                        svg={{
                            fill: colors.skeletonGraph,
                            stroke: colors.skeletonGraph,
                            fillOpacity: 0.4,
                            strokeLinecap: 'round',
                        }}
                    />
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
