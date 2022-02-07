import React from "react";
import { StyleSheet } from "react-native";
import { Box, Flex, useTheme } from 'native-base';
import { SkeletonBox } from "./SkeletonBox";

type SkeletonPopularTweetProps = {

}

export const SkeletonPopularTweet = React.memo<SkeletonPopularTweetProps>(({ }) => {
    const { colors } = useTheme()

    return <Box style={{ ...styles.tweet, borderColor: colors.borderColor, backgroundColor: colors.bgTweet }}>
        <Flex direction="row" style={styles.header}>
            <Box style={styles.headerAvatar}>
                <SkeletonBox borderRadius={20000} bgColor={colors.skeletonTweet} width={40} height={40} />
            </Box>
            <Box style={styles.headerTitle}>
                <SkeletonBox bgColor={colors.skeletonTweet} width={60} height={12} />
            </Box>
        </Flex>
        <Box style={styles.description}>
            {[118, 152.2, 167, 142, 167, 118, 118, 106].map((w, index) => <SkeletonBox
                marginTop={index !== 0 ? 8.5 : 0} key={`tweetText${index}`}
                bgColor={colors.skeletonTweet} width={w} height={12} />)}
        </Box>
    </Box>
})

const styles = StyleSheet.create({
    tweet: {
        borderRadius: 22,
        borderWidth: 1,
        padding: 20,
        height: 254,
        width: 207
    },
    header: {
        height: 40
    },
    headerAvatar: {
        height: 40,
        width: 40,
        backgroundColor: '#FAFAFA',
        borderRadius: 200,
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerTitle: {
        height: 40,
        width: 89,
        marginLeft: 12,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    description: {
        height: 160,
        width: 167,
        marginTop: 14,
        overflow: 'hidden'
    }
});
