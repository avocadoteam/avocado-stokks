import React, { memo, ReactElement } from 'react';
import { StyleSheet } from "react-native";
import { Box, Flex, Text as NativeText, Menu, Pressable, useTheme } from 'native-base';
import { ArrowDropDownIcon } from 'ui/icons/ArrowDropDownIcon';
import { DropdownItem } from 'ui/DropdownItem';
import { ScrollPicker } from 'ui/MyScrollPicker/TrueMyScrollPicker';

type PricePickerProps = {
    listPrice: number[]
    price: number
    conditions: { title: string, icon: ReactElement<any, any> }[]
    condition: string
    pricePickerHandler: (value: number) => void
    conditionItemHandler: (value: string) => void
};

export const PricePicker = memo<PricePickerProps>(({ conditions, conditionItemHandler, condition, price, listPrice, pricePickerHandler }) => {
    const { colors } = useTheme();

    const conditionsJSX = conditions.map(c => <DropdownItem
        icon={c.icon}
        onPress={() => conditionItemHandler(c.title)}
        isActive={condition === c.title}
    ><NativeText style={{ color: colors.text }}>{c.title}</NativeText></DropdownItem>)

    return (
        <Box style={styles.pricePicker}>
            <Box style={styles.conditionPricePicker}>
                <Menu
                    style={{ borderRadius: 16, backgroundColor: colors.bgDropdown }}
                    closeOnSelect={false}
                    w="201" trigger={triggerProps => {
                        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                            <Flex direction='row'>
                                <NativeText style={{ color: colors.textGray }}>
                                    The price is
                                </NativeText>
                                <ArrowDropDownIcon />
                            </Flex>
                        </Pressable>
                    }}>
                    {conditionsJSX}
                </Menu>
            </Box>
            <Box style={{ ...styles.pricePickerForm, backgroundColor: colors.bgScrollPicker }}>
                <ScrollPicker
                    height={70} width={87}
                    changeHandler={pricePickerHandler}
                    selectedItem={{ title: String(price), value: price }}
                    items={listPrice.map(p => { return { title: String(p), value: p } })} />
            </Box>
        </Box>
    );
});

const styles = StyleSheet.create({
    pricePicker: {
        flexDirection: 'row',
        marginTop: 19,
        height: 70
    },
    conditionPricePicker: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    pricePickerForm: {
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        borderRadius: 16
    },
})
