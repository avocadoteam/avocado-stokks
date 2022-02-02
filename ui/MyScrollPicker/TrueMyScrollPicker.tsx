import { tSTypeReference } from '@babel/types';
import { Box, Flex, Heading, ScrollView, Text as NativeText, useTheme, Pressable, Input, Button } from 'native-base';
import React, { memo, ReactElement, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native'
import { If } from 'ui/atoms/If';

type ScrollPickerProps = {
    height: number
    width: number
    items: Item[]
    selectedItem: Item
    changeHandler: (value: number) => void
};

export const ScrollPicker = memo<ScrollPickerProps>(({ items, selectedItem, changeHandler, height, width }) => {
    const { colors } = useTheme();
    const ref = useRef(null)
    const [view, setView] = useState<any>(null)
    const heightItem = 24

    useEffect(() => {
        let indexSelectedItem = 0
        items.forEach((item, index) => {
            if (item.value === selectedItem.value) {
                indexSelectedItem = index
            }
        })

        if (view) {
            //@ts-ignore
            view.scrollTo({ y: indexSelectedItem * (heightItem + 12) })
        }
    }, [view])

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const h = heightItem + 12
        let verticalY = 0
        if (e.nativeEvent.contentOffset) {
            verticalY = e.nativeEvent.contentOffset.y
        }
        const selectedIndex = Math.round(verticalY / h)
        const verticalElem = selectedIndex * h

        if (view) {
            //@ts-ignore
            view.scrollTo({ y: verticalElem })
        }
        changeHandler(Number(items[selectedIndex].value ? items[selectedIndex].value : 1))
    }

    const itemsJSX = items.map((i, index) => <Flex flexDirection={"row"}
        justifyContent={"center"} alignItems={"center"} style={{
            height: heightItem,
            marginTop: index === 0 ? (height - heightItem) / 2 : 6,
            marginBottom: index + 1 === items.length ? (height - heightItem) / 2 : 6
        }} key={`scrollPickerItem${i.title}`}>
        <Heading
            color={i.value === selectedItem.value ? colors.headingSmall : colors.textGray}
            size='md'>{i.title}</Heading>
    </Flex>)

    const [isFocus, setFocus] = useState(false)
    const [backCount, setBackCount] = useState(0)
    const [backTimer, setBackTimer] = useState<any>('timerId')
    const doubleClickHandler = () => {
        setBackCount(prev => (prev + 1))
        if (backCount == 2) {
            clearTimeout(backTimer)
            setFocus(true)
        } else {
            setBackTimer(setTimeout(() => {
                setBackCount(0)
            }, 3000))
        }
    }

    return (
        <Pressable onPress={doubleClickHandler}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={(ref) => setView(ref)} onMomentumScrollEnd={onMomentumScrollEnd}
                style={{ ...styles.mainBox, height, width }}
                backgroundColor={colors.bgScrollPicker}>
                {isFocus ? <Input

                    autoFocus={true} onBlur={() => setFocus(false)} /> : itemsJSX}
            </ScrollView>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    mainBox: {
        borderRadius: 16,
    }
});

type Item = {
    value: string | number
    title: string | ReactElement<any, any>
}
