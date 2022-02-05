import React from "react";
import { Heading, useTheme, Box } from 'native-base';
import { NewsItem } from "@models";
import { MainNewsItem } from "ui/MainNewsItem";
import { FeedNewsItems } from "ui/FeedNewsItems";
import { If } from "ui/atoms/If";

type LatestNewsBannerProps = {
    data?: NewsItem[]
}

export const LatestNewsBanner = React.memo<LatestNewsBannerProps>(({ data }) => {
    const { colors } = useTheme()
    const mainNewsItem = (data && data[0]) && <MainNewsItem data={data[0]} />

    return <Box>
        <If is={!!data?.length}>
            <Heading size={'sm'} my={5} mr={2} color={colors.heading}>
                Latest News
            </Heading>
            <Box>
                <Box>
                    {mainNewsItem}
                </Box>
                <Box my={4}>
                    <FeedNewsItems data={(data && data.length > 1) ? [...data].slice(1,) : []} />
                </Box>
            </Box>
        </If>
    </Box>
})
