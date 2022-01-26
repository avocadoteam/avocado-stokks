import React from "react"
import { Box, useTheme } from "native-base"

type SeparatorProps = {

}

export const Separator = React.memo<SeparatorProps>(({ }) => {
    const { colors } = useTheme()

    return <Box style={{
        backgroundColor: colors.separator,
        width: '100%',
        height: 1
    }} />
})