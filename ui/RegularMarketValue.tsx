import React from "react";
import { Box, Heading, useTheme } from 'native-base';
import { Text as NativeText } from 'react-native';


type RegularMarketProps = {
    title: string
    value: number
}

export const RegularMarketValue = React.memo<RegularMarketProps>(({ title, value }) => {
    const { colors } = useTheme();

    return <Box>
        <NativeText
            style={{
                color: colors.textGray,
            }}
            numberOfLines={1}
        >
            {title}
        </NativeText>
        <Heading size={'sm'} textTransform={'uppercase'}>
            {value}
        </Heading>
    </Box>
}) 
