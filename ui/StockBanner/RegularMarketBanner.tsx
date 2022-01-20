import React from "react";
import { Box, Flex } from 'native-base';
import { SymbolGeneralInfo } from "@models";
import { RegularMarketValue } from "../RegularMarketValue";


interface RegularMarketBannerProps {
    data: SymbolGeneralInfo | undefined
}

export const RegularMarketBanner = React.memo<RegularMarketBannerProps>(({ data }) => {
    const leftSide = [
        { title: 'Open', value: data ? data.regularMarketOpen : 0 },
        { title: 'High', value: data ? data.regularMarketDayRange.high : 0 },
        { title: 'Low', value: data ? data.regularMarketDayRange.low : 0 }
    ]
    const leftSideJSX = leftSide.map(el => <RegularMarketValue {...el} />)
    const rightSide = [
        { title: 'Market Cup', value: data ? data.marketCap : 0 },
        { title: 'Volume', value: data ? data.regularMarketVolume : 0 },
        { title: 'Low', value: data ? data.regularMarketDayRange.low : 0 }
    ]
    const rightSideJSX = rightSide.map(el => <RegularMarketValue {...el} />)

    return <Flex marginTop={8} direction="row" style={{ width: '100%' }}>
        <Box style={{ width: '50%' }}>
            {leftSideJSX}
        </Box>
        <Box style={{ width: '50%' }}>
            {rightSideJSX}
        </Box>
    </Flex>
})