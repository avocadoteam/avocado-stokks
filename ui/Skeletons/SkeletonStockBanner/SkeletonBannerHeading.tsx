import { Box, HStack } from 'native-base';
import React, { memo } from 'react';
import { SkeletonBlock } from '../SkeletonBlock';

type Props = {
};

export const SkeletonBannerHeading = memo<Props>(({ }) => {
    return (
        <Box mb={8}>
            <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center">
                    <Box mr={2}>
                        <SkeletonBlock width={84} height={28} />
                    </Box>
                    <SkeletonBlock width={28} height={28} />
                </HStack>
            </HStack>
            <SkeletonBlock width={135} height={16} />
        </Box>
    );
});
