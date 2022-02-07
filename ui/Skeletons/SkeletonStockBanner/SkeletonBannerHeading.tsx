import { Box, HStack } from 'native-base';
import React, { memo } from 'react';
import { SkeletonBox } from '../SkeletonBox';

type Props = {
};

export const SkeletonBannerHeading = memo<Props>(({ }) => {
    return (
        <Box mb={8}>
            <HStack justifyContent="space-between" alignItems="center">
                <HStack mb={2} alignItems="center">
                    <SkeletonBox
                        marginRight={8}
                        borderRadius={28} width={84} height={28} />
                    <SkeletonBox borderRadius={20000} width={28} height={28} />
                </HStack>
            </HStack>
            <SkeletonBox width={135} height={16} />
        </Box>
    );
});
