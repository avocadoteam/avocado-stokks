import React from "react";
import { Box, useTheme } from "native-base";

type SkeletonBlockProps = {
    width?: number
    height?: number
}

export const SkeletonBlock = React.memo<SkeletonBlockProps>(({ width, height }) => {
    const { colors } = useTheme()

    return <Box style={{ width: width ?? 54, height: height ?? 14 }} backgroundColor={colors.skeleton}
        borderRadius={10} />
})
