import React, { memo, useState } from 'react';
import { StyleSheet } from "react-native";
import { Box, Heading, Pressable, useTheme } from 'native-base';
import { Separator } from 'ui/atoms/Separator';

type HeaderProps = {
    verticalSwipeHandler: (dif: number) => void
};

export const Header = memo<HeaderProps>(({ verticalSwipeHandler }) => {
    const { colors } = useTheme();

    const [lastValue, setLastValue] = useState(404)
    return (
        <Box>
            <Pressable
                onTouchStart={(e) => setLastValue(e.nativeEvent.pageY)}
                onTouchMove={(e) => {
                    const dif = lastValue - e.nativeEvent.pageY
                    if (e.nativeEvent.pageY) {
                        verticalSwipeHandler(dif)
                        setLastValue(prev => prev - dif)
                    }
                }}>
                <Box
                    style={styles.swipeController}>
                    <Separator width={52} height={3} />
                </Box>
            </Pressable>
            <Box style={styles.header}>
                <Heading
                    color={colors.headingSmall} size={'sm'}>
                    Notify when
                </Heading>
            </Box>
        </Box>
    );
});

const styles = StyleSheet.create({
    swipeController: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 24,
        paddingBottom: 36
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
