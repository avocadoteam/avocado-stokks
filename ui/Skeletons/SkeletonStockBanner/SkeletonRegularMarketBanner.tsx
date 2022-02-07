import React from "react";
import { Box, Flex } from 'native-base';
import { StyleSheet } from "react-native";
import { SkeletonBox } from "../SkeletonBox";

type SkeletonRegularMarketBannerProps = {
}

export const SkeletonRegularMarketBanner = React.memo<SkeletonRegularMarketBannerProps>(({ }) => {
    const leftSideJSX = [1, 2, 3].map(l => <Srmv key={`rmvs${l}`} />)
    const rightSideJSX = [4, 5, 6].map(r => <Srmv key={`rmvs${r}`} />)

    return <Flex marginTop={8} direction="row" style={styles.mainBox}>
        <Box style={styles.leftSide}>
            {leftSideJSX}
        </Box>
        <Box style={styles.rightSide}>
            {rightSideJSX}
        </Box>
    </Flex>
})

const styles = StyleSheet.create({
    leftSide: {
        width: '50%'
    },
    rightSide: {
        width: '50%'
    },
    mainBox: {
        width: '100%'
    }
})

const Srmv = React.memo<{ key: string }>(({ key }) => {
    return <Box key={key} marginTop={4}>
        <SkeletonBox width={57} height={14} />
        <SkeletonBox width={88} height={18} marginTop={10} />
    </Box>
})
