import { NewsItem } from "@models";
import { Box, Heading } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet, Text as NativeText } from "react-native";

type MainNewsItemProps = {
    data: NewsItem
}

export const MainNewsItem = React.memo<MainNewsItemProps>(({ data }) => {

    return <ImageBackground
        style={styles.imageBackground}
        borderRadius={20}
        source={{ uri: data.link }}>
        <Box style={styles.mainBox}>
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
    </ImageBackground>
})

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: 326,
        borderRadius: 20,
        marginHorizontal: "auto"
    },
    mainBox: {
        width: 353,
        height: 326,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 24,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    text: {
        color: 'rgba(255, 255, 255, 0.9)'
    }
})
