import React from "react";
import { Box, useTheme } from "native-base";

type SkeletonBlockProps = {
    width?: number
    height?: number
    bgColor?: string
    borderRadius?: number
    marginTop?: number
    marginBottom?: number
    marginRight?: number
    marginLeft?: number
}

export const SkeletonBox = React.memo<SkeletonBlockProps>(({ width, height, bgColor, borderRadius, marginTop, marginBottom, marginLeft, marginRight }) => {
    const { colors } = useTheme()

    return <Box style={{
        width: width ?? 54, height: height ?? 14,
        borderRadius: borderRadius ?? 10,
        marginTop: marginTop ?? 0, marginBottom: marginBottom ?? 0,
        marginLeft: marginLeft ?? 0, marginRight: marginRight ?? 0
    }}
        backgroundColor={bgColor ?? colors.skeleton} />
})
