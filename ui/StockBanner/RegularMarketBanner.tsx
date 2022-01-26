import React from "react";
import { Box, Flex } from 'native-base';
import { StyleSheet } from "react-native";
import { SymbolGeneralInfo } from "@models";
import { RegularMarketValue } from "../RegularMarketValue";

type RegularMarketBannerProps = {
    data?: SymbolGeneralInfo
}

export const RegularMarketBanner = React.memo<RegularMarketBannerProps>(({ data }) => {
    const leftSide = createLeftSide(data)
    const leftSideJSX = leftSide.map((el, index) => <RegularMarketValue key={`lMV${index}`} {...el} />)
    const rightSide = createRightSide(data)
    const rightSideJSX = rightSide.map((el, index) => <RegularMarketValue key={`rMV${index}`} {...el} />)

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

const createLeftSide = (data?: SymbolGeneralInfo) => {
    return [
        { title: 'Open', value: data?.regularMarketOpen ?? 0 },
        { title: 'High', value: data?.regularMarketDayRange.high ?? 0 },
        { title: 'Low', value: data?.regularMarketDayRange.low ?? 0 }
    ]
}

const createRightSide = (data?: SymbolGeneralInfo) => {
    return [
        { title: 'Market Cup', value: data?.marketCap ?? 0 },
        { title: 'Volume', value: data?.regularMarketVolume ?? 0 },
        { title: 'Low', value: data?.regularMarketDayRange.low ?? 0 }
    ]
}
