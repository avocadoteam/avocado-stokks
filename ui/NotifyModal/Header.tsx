import React, { memo } from 'react';
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Box, Heading, useTheme } from 'native-base';
import { Toggle } from 'ui/atoms/Toggle';

type HeaderProps = {
    touchStartHandler: (e: GestureResponderEvent) => void
    touchMoveHandler: (e: GestureResponderEvent) => void
};

export const Header = memo<HeaderProps>(({ touchStartHandler, touchMoveHandler }) => {
    const { colors } = useTheme();

    return (
        <Box>
            <Toggle
                touchStartHandler={touchStartHandler} touchMoveHandler={touchMoveHandler} />
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
    },
    header: {
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
