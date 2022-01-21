import React from "react";
import { Box, Heading, useTheme } from 'native-base';
import { SymbolGeneralInfo } from "@models";
import { PopularTweet } from "ui/PopularTweet";


type PopularTweetsBannerProps = {
    data?: SymbolGeneralInfo
}

export const PopularTweetsBanner = React.memo<PopularTweetsBannerProps>(({ data }) => {
    const { colors } = useTheme()

    return <Box>
        <Heading size={'sm'} my={5} mr={2} color={colors.heading}>
            Popular Tweets
        </Heading>
        <Box>

        </Box>
    </Box>
})