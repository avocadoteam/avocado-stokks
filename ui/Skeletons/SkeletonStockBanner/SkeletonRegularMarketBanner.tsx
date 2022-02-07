import React from "react";
import { Box, Flex } from 'native-base';
import { StyleSheet } from "react-native";
import { SymbolGeneralInfo } from "@models";
import { convertNumberToShortForm } from "core/utils";
import { SkeletonBlock } from "../SkeletonBlock";

type RegularMarketBannerProps = {
}

export const SkeletonRegularMarketBanner = React.memo<RegularMarketBannerProps>(({ }) => {
    const leftSideJSX = [1, 2, 3].map(l => <Rmvs key={`rmvs${l}`} />)
    const rightSideJSX = [4, 5, 6].map(r => <Rmvs key={`rmvs${r}`} />)

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

const Rmvs = React.memo<{ key: string }>(({ key }) => {
    return <Box key={key} marginTop={3}>
        <Box>
            <SkeletonBlock width={57} height={14} />
        </Box>
        <Box marginTop={1}>
            <SkeletonBlock width={88} height={18} />
        </Box>
    </Box>
})
