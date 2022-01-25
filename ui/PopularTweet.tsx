import React from "react";
import { Box, Flex, Image, useTheme } from 'native-base';
import { StyleSheet, Text as NativeText } from "react-native";
import { Tweet } from "@models";

type PopularTweetProps = {
    data: Tweet
}

export const PopularTweet = React.memo<PopularTweetProps>(({ data }) => {
    const { colors } = useTheme()

    return <Box style={{ ...styles.tweet, borderColor: colors.gray[100] }}>
        <Flex direction="row" style={styles.header}>
            <Box style={{ ...styles.headerAvatar }}>
                <Image source={{ uri: data.avatar }} alt={data.userName.toUpperCase().slice(0, 2)} />
            </Box>
            <Box style={styles.headerName}>
                {data.userName}
            </Box>
        </Flex>
        <Box style={styles.description}>
            {data.text}
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
        width: 40
    },
    headerName: {
        height: 40,
        width: 89,
        marginLeft: 12
    },
    description: {
        height: 160,
        width: 167,
        overflow: 'hidden'
    }
});
