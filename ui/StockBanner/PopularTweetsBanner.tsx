import React from "react";
import { StyleSheet } from "react-native";
import { Heading, useTheme, ScrollView, Box } from 'native-base';
import { Tweet } from "@models";
import { PopularTweet } from "ui/PopularTweet";


type PopularTweetsBannerProps = {
    data?: Tweet[]
}

export const PopularTweetsBanner = React.memo<PopularTweetsBannerProps>(({ data }) => {
    const { colors } = useTheme()
    const tweets = data?.map(t => <Box mx={2}><PopularTweet data={t} key={`tweet${t.id}`} /></Box>) ?? []

    return <Box>
        <Heading size={'sm'} my={5} mr={2} color={colors.heading}>
            Popular Tweets
        </Heading>
        <ScrollView horizontal={true} style={styles.mainBox}>
            {tweets}
        </ScrollView>
    </Box>
})

const styles = StyleSheet.create({
    mainBox: {
        height: 254
    }
})