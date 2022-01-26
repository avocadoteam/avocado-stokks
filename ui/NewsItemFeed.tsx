import { NewsItem } from "@models";
import { Box, Flex, Heading, useTheme } from "native-base";
import React from "react";
import { StyleSheet, Text as NativeText, Image } from "react-native";

type NewsItemProps = {
    data: NewsItem
}

export const NewsItemFeed = React.memo<NewsItemProps>(({ data }) => {
    const { colors } = useTheme()

    return <Flex direction="row">
        <Flex style={styles.infoBox} direction="column">
            <Box key={"publisher_news"} my={2}>
                <NativeText style={{ color: colors.textGray }}>
                    {data.publisher}
                </NativeText>
            </Box>
            <Box key={"text_news"} my={2}>
                <Heading color={colors.headingSmall} size={'sm'}>
                    {data.title}
                </Heading>
            </Box>
            <Box key={"date_published"} my={2}>
                <NativeText style={{ color: colors.textGray }}>
                    {data.providerPublishTime}
                </NativeText>
            </Box>
        </Flex>
        <Box style={styles.imageBox}>
            <Image source={{ uri: data.link }} />
        </Box>
    </Flex>
})

const styles = StyleSheet.create({
    infoBox: {
        width: 269,
        minHeight: 107
    },
    imageBox: {
        marginLeft: 24,
        flexDirection: 'column',
        justifyContent: 'center'
    }
})


