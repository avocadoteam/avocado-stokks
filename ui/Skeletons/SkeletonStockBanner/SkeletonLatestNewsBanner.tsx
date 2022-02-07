import React from "react";
import { Box } from 'native-base';
import { SkeletonMainNewsItem } from "../SkeletonMainNewsItem";
import { SkeletonBox } from "../SkeletonBox";
import { SkeletonNewsItem } from "../SkeletonNewsItem";

type SkeletonLatestNewsBannerProps = {
}

export const SkeletonLatestNewsBanner = React.memo<SkeletonLatestNewsBannerProps>(({ }) => {
    return <Box>
        <SkeletonBox
            marginBottom={24} marginTop={24}
            width={122} height={20} />
        <Box>
            <SkeletonMainNewsItem />
            <Box my={4}>
                {[1, 2, 3, 4].map(k => <SkeletonNewsItem key={`sni${k}`} />)}
            </Box>
        </Box>
    </Box>
})
