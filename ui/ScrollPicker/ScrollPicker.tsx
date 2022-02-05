import React, { memo, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { ScrollView, useTheme, Pressable, Input } from 'native-base';
import { ScrollPickerItem } from './ScrollPickerItem';
import { useDoubleClick } from 'core/hooks/useDoubleClick';

type ScrollPickerProps = {
    height: number
    width: number
    borderRadius?: number
    heightItem?: number
    marginVerticalItem?: number
    items: Item[]
    selectedItem: Item
    changeHandler: (value: string) => void
};

export const ScrollPicker = memo<ScrollPickerProps>(({ items, selectedItem, changeHandler, height, width, heightItem, marginVerticalItem, borderRadius }) => {
    const { colors } = useTheme();
    const [view, setView] = useState<any>(null)
    const [isFocusInput, setFocusInput] = useState(false)
    const onFocusInput = () => {
        setFocusInput(true)
    }
    const onBlurInput = () => {
        setFocusInput(false)
    }

    borderRadius = borderRadius ?? 16
    heightItem = heightItem ?? 24
    marginVerticalItem = marginVerticalItem ?? 6
    const heightItemIncludeMargin = heightItem + (2 * marginVerticalItem)
    const marginForFirstAndLastElement = (height - heightItem) / 2

    const tryFixScroll = useCallback(() => {
        let indexCandidateSelectedItem = 0
        items.forEach((item, index) => {
            if (item.value === selectedItem.value) {
                indexCandidateSelectedItem = index
            }
        })

        //@ts-ignore
        view.scrollTo({ y: indexCandidateSelectedItem * (heightItemIncludeMargin) })
    }, [items, selectedItem, view])
    const fixScroll = useCallback(() => {
        try {
            tryFixScroll()
        } catch (e) {
            if (view) {
                //@ts-ignore
                view.scrollTo({ y: 0 })
            }
        }
    }, [tryFixScroll])
    useEffect(() => {
        fixScroll()
    }, [view, isFocusInput, items])

    const tryMomentumScrollEndHanlder = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const h = heightItemIncludeMargin
        let verticalY = e.nativeEvent.contentOffset.y
        const selectedIndex = Math.round(verticalY / h)
        const verticalElem = selectedIndex * h

        //@ts-ignore
        view.scrollTo({ y: verticalElem })
        changeHandler(items[selectedIndex].value ?? 1)
    }, [heightItemIncludeMargin, view, items, changeHandler])
    const momentumScrollEndHandler = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        try {
            tryMomentumScrollEndHanlder(e)
        } catch (e) {
            if (view) {
                //@ts-ignore
                view.scrollTo({ y: 0 })
            }
            changeHandler(items[0].value ?? 1)
        }
    }, [tryMomentumScrollEndHanlder])

    const doubleClickHandler = useCallback(useDoubleClick(onFocusInput), [onFocusInput])
    const changeInputHandler = useCallback((text: string) => {
        changeHandler(text)
    }, [changeHandler])

    const itemsJSX = useMemo(() => items.map((i, index) => <ScrollPickerItem
        title={String(i.title)} height={heightItem ?? 24}
        marginForFirstAndLastElement={marginForFirstAndLastElement}
        marginVertical={marginVerticalItem ?? 6} isSelected={i.value === selectedItem.value}
        isLastElement={index + 1 === items.length} isFirstElement={index === 0} />
    ), [items, selectedItem])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            ref={(ref) => setView(ref)} onMomentumScrollEnd={momentumScrollEndHandler}
            style={{ borderRadius, height, width }}
            backgroundColor={colors.bgScrollPicker}>
            {
                isFocusInput ? <Input
                    textAlign={"center"} fontWeight={"bold"} fontSize={20}
                    height={height} width={width} borderRadius={borderRadius}
                    color={colors.text} onChangeText={changeInputHandler}
                    autoFocus={true} onBlur={onBlurInput} /> :
                    <Pressable onPress={doubleClickHandler}>
                        {itemsJSX}
                    </Pressable>
            }
        </ScrollView>
    );
});

type Item = {
    value: any
    title: string | ReactElement<any, any>
}
