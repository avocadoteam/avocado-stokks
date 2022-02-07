import React from "react"
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"

export const LittleGraphSkeleton = () => {
    return <Svg width="82" height="32" viewBox="0 0 82 32" fill="none">
        <Path d="M27.1625 19L12.8125 26.5C10.8881 27.2265 9.92594 27.5898 9.65969 27.8176C8.49519 28.8144 8.83869 30.6967 10.2802 31.2179C10.6097 31.3371 11.6382 31.3371 13.6952 31.3371H78C79.8856 31.3371 80.8284 31.3371 81.4142 30.7513C82 30.1655 82 29.2227 82 27.3371V3L68.5 6.5618L55.4965 11.2618C55.1678 11.3806 55.0035 11.44 54.8322 11.47C54.661 11.5 54.4863 11.5 54.1368 11.5H42.4948C42.006 11.5 41.7617 11.5 41.5267 11.5577C41.2917 11.6154 41.0751 11.7286 40.642 11.955L27.1625 19Z" fill="url(#paint0_linear_944_882)" />
        <Path d="M27.1625 19L12.8125 26.5C10.8881 27.2265 9.92594 27.5898 9.65969 27.8176C8.49519 28.8144 8.83869 30.6967 10.2802 31.2179C10.6097 31.3371 11.6382 31.3371 13.6952 31.3371H78C79.8856 31.3371 80.8284 31.3371 81.4142 30.7513C82 30.1655 82 29.2227 82 27.3371V3L68.5 6.5618L55.4965 11.2618C55.1678 11.3806 55.0035 11.44 54.8322 11.47C54.661 11.5 54.4863 11.5 54.1368 11.5H42.4948C42.006 11.5 41.7617 11.5 41.5267 11.5577C41.2917 11.6154 41.0751 11.7286 40.642 11.955L27.1625 19Z" fill="url(#paint1_linear_944_882)" />
        <Path d="M1 31L13.5 26L28.5 18L40.2331 12.1334C40.8637 11.8181 41.179 11.6605 41.5189 11.5803C41.8589 11.5 42.2114 11.5 42.9164 11.5H53.4607C53.9791 11.5 54.2383 11.5 54.4924 11.456C54.7465 11.412 54.9906 11.3248 55.4787 11.1505L68.5 6.5L81 3.5" stroke="#5E5E5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Defs>
            <LinearGradient id="paint0_linear_944_882" x1="41" y1="1" x2="41" y2="31" gradientUnits="userSpaceOnUse">
                <Stop stop-color="#999999" stop-opacity="0.15" />
                <Stop offset="1" stop-color="#F6F6F6" stop-opacity="0" />
            </LinearGradient>
            <LinearGradient id="paint1_linear_944_882" x1="82" y1="17.0111" x2="6.04657e-07" y2="17.0111" gradientUnits="userSpaceOnUse">
                <Stop stop-color="#131313" />
                <Stop offset="0.223958" stop-color="#131313" stop-opacity="0" />
                <Stop offset="0.765625" stop-color="#131313" stop-opacity="0" />
                <Stop offset="1" stop-color="#131313" />
            </LinearGradient>
        </Defs>
    </Svg>
}
