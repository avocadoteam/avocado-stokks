import { Box, Flex, Heading, ScrollView, Text as NativeText, useTheme, Pressable } from 'native-base';
import React, { memo, ReactElement, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native'

type ScrollPickerProps = {
    items: Item[]
    selectedItem: Item
    changeHandler: (value: number) => void
};

export const ScrollPicker = memo<ScrollPickerProps>(({ items, selectedItem, changeHandler }) => {
    const { colors } = useTheme();
    const ref = useRef(null)

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const h = 25
        let verticalY = 0
        if (e.nativeEvent.contentOffset) {
            verticalY = e.nativeEvent.contentOffset.y
        }
        const selectedIndex = Math.round(verticalY / h)
        const verticalElem = selectedIndex * h
        try {
            if (ref) {
                //@ts-ignore
                ref?.scrollTo({ y: 100, animated: true })
            }
        } catch (e) {

        }
        finally {
            changeHandler(Number(items[selectedIndex].value ? items[selectedIndex].value : 1))
        }
    }

    const itemsJSX = items.map(i => <Flex flexDirection={"row"}
        justifyContent={"center"} my={1} key={`scrollPickerItem${i.title}`}>
        <Heading
            color={i.value === selectedItem.value ? colors.headingSmall : colors.textGray}
            size='md'>{i.title}</Heading>
    </Flex>)

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            ref={ref} onMomentumScrollEnd={onMomentumScrollEnd}
            style={styles.mainBox} backgroundColor={colors.bgScrollPicker}>
            {itemsJSX}
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    mainBox: {
        height: 70,
        width: 87,
        borderRadius: 16
    }
});

type Item = {
    value: string | number
    title: string | ReactElement<any, any>
}
