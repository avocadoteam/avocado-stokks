import React, { memo, ReactElement, useMemo } from 'react';
import { StyleSheet } from "react-native";
import { Box, Flex, Text as NativeText, useTheme } from 'native-base';
import { ArrowDropDownIcon } from 'ui/icons/ArrowDropDownIcon';
import { ScrollPicker } from 'ui/ScrollPicker/ScrollPicker';
import { DropdownSelect } from 'ui/DropdownSelect/DropdownSelect';

type PricePickerProps = {
    price: number
    listPrice: number[]
    conditions: { title: string, icon: ReactElement<any, any> }[]
    condition: string
    pricePickerHandler: (value: string) => void
    conditionItemHandler: (value: string) => void
};

export const PricePicker = memo<PricePickerProps>(({ conditions, conditionItemHandler, condition, price, listPrice, pricePickerHandler }) => {
    const { colors } = useTheme();
    const priceToScrollPickerItem = (p: number) => { return { title: String(p), value: p } }
    const scrollPickerSelectedItem = useMemo(() => priceToScrollPickerItem(price), [price])
    const scrollPickerItems = useMemo(() => listPrice.map(priceToScrollPickerItem), [listPrice])

    return (
        <Box style={styles.pricePicker}>
            <Box style={styles.conditionPricePicker}>
                <DropdownSelect
                    values={conditions} value={condition}
                    changeHandler={conditionItemHandler}>
                    <Flex direction='row'>
                        <NativeText style={{ color: colors.textGray }}>
                            The price is
                        </NativeText>
                        <ArrowDropDownIcon />
                    </Flex>
                </DropdownSelect>
            </Box>
            <Box style={{ ...styles.pricePickerForm, backgroundColor: colors.bgScrollPicker }}>
                <ScrollPicker
                    height={70} width={87}
                    changeHandler={pricePickerHandler}
                    selectedItem={scrollPickerSelectedItem}
                    items={scrollPickerItems} />
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
