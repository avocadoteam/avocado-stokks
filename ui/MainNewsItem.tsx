import { NewsItem } from "@models";
import { Box, Heading } from "native-base";
import React from "react";
import { StyleSheet, Text as NativeText } from "react-native";

type MainNewsItemProps = {
    data: NewsItem
}

export const MainNewsItem = React.memo<MainNewsItemProps>(({ data }) => {

    return <Box style={styles.mainBox}>
        <Box>
            <NativeText style={styles.text}>
                {data.publisher}
            </NativeText>
        </Box>
        <Box>
            <Heading style={styles.text} size={'sm'}>
                {data.title}
            </Heading>
        </Box>
        <Box>
            <NativeText style={styles.text}>
                {data.providerPublishTime}
            </NativeText>
        </Box>
    </Box>
})

const styles = StyleSheet.create({
    mainBox: {
        width: 353,
        height: 326,
        borderRadius: 20,
        padding: '20 20 24 20',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    text: {
        color: 'rgba(255, 255, 255, 0.9)'
    }
})
