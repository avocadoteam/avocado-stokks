import React from "react";
import { Box, Flex } from 'native-base';
import { StyleSheet } from "react-native";


type PopularTweetProps = {
}

export const PopularTweet = React.memo<PopularTweetProps>(({ }) => {

    return <Box style={styles.tweet}>
        <Flex direction="row" style={styles.header}>
            <Box style={styles.headerAvatar}>
                Img
            </Box>
            <Box style={styles.headerName}>
                Name
            </Box>
        </Flex>
        <Box style={styles.description}>
            Here long description
        </Box>
    </Box>
})

const styles = StyleSheet.create({
    tweet: {
        borderColor: '#F6F6F6',
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
        marginRight: 12
    },
    description: {
        height: 160,
        width: 167,
        overflow: 'hidden'
    }
});
