import { ScrollView, useTheme, Pressable, Input } from 'native-base';
import React, { memo, ReactElement, useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native'
import { ScrollPickerItem } from './ScrollPickerItem';
import { useDoubleClick } from 'core/hooks/useDoubleClick';

type ScrollPickerProps = {
    height: number
    width: number
    heightItem?: number
    marginVerticalItem?: number
    items: Item[]
    selectedItem: Item
    changeHandler: (value: any) => void
};

export const ScrollPicker = memo<ScrollPickerProps>(({ items, selectedItem, changeHandler, height, width, heightItem, marginVerticalItem }) => {
    const { colors } = useTheme();
    const [isFocusInput, setFocusInput] = useState(false)
    const onFocusInput = () => {
        setFocusInput(true)
    }
    const onBlurInput = () => {
        setFocusInput(false)
    }

    const [view, setView] = useState<any>(null)
    heightItem = heightItem ?? 24
    marginVerticalItem = marginVerticalItem ?? 6
    const heightItemIncludeMargin = heightItem + (2 * marginVerticalItem)
    const marginForFirstAndLastElement = (height - heightItem) / 2

    const fixScroll = () => {
        let indexCandidateSelectedItem = 0
        items.forEach((item, index) => {
            if (item.value === selectedItem.value) {
                indexCandidateSelectedItem = index
            }
        })

        if (view) {
            //@ts-ignore
            view.scrollTo({ y: indexCandidateSelectedItem * (heightItemIncludeMargin) })
        }
    }
    useEffect(() => {
        fixScroll()
    }, [view, isFocusInput, items])

    const momentumScrollEndHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const h = heightItemIncludeMargin
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

    const doubleClickHandler = useDoubleClick(onFocusInput)
    const changeInputHanlder = (text: string) => {
        changeHandler(text)
    }

    const itemsJSX = items.map((i, index) => <ScrollPickerItem
        title={String(i.title)} height={heightItem ?? 24} marginForFirstAndLastElement={marginForFirstAndLastElement}
        marginVertical={marginVerticalItem ?? 6} isSelected={i.value === selectedItem.value}
        isLastElement={index + 1 === items.length} isFirstElement={index === 0} />)

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            ref={(ref) => setView(ref)} onMomentumScrollEnd={momentumScrollEndHandler}
            style={{ ...styles.mainBox, height, width }}
            backgroundColor={colors.bgScrollPicker}>
            {isFocusInput ? <Input
                height={height} width={width} borderRadius={16}
                color={colors.text} onChangeText={changeInputHanlder}
                flex={1} flexDirection={"row"} justifyContent={"center"}
                autoFocus={true} onBlur={onBlurInput} /> : <Pressable onPress={doubleClickHandler}>
                {itemsJSX}
            </Pressable>}
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    mainBox: {
        borderRadius: 16,
    }
});

type Item = {
    value: any
    title: string | ReactElement<any, any>
}
