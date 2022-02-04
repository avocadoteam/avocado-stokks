import React, { memo } from 'react';
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Box, Pressable } from 'native-base';
import { Separator } from 'ui/atoms/Separator';

type ToggleProps = {
    paddingTop?: number
    touchStartHandler: (e: GestureResponderEvent) => void
    touchMoveHandler: (e: GestureResponderEvent) => void
};

export const Toggle = memo<ToggleProps>(({ touchStartHandler, touchMoveHandler, paddingTop }) => {

    return (
        <Box>
            <Pressable
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}>
                <Box
                    style={{ ...styles.swipeController, paddingTop: paddingTop ?? 24 }}>
                    <Separator width={52} height={3} />
                </Box>
            </Pressable>
        </Box>
    );
});

const styles = StyleSheet.create({
    swipeController: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
