import React, { memo, ReactElement } from 'react';
import { StyleSheet } from "react-native";
import { Box, Flex, Text as NativeText, Menu, Pressable, useTheme } from 'native-base';
//@ts-ignore
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { ArrowDropDownIcon } from 'ui/icons/ArrowDropDownIcon';
import { DropdownItem } from 'ui/DropdownItem';

type PricePickerProps = {
    conditions: { title: string, icon: ReactElement<any, any> }[]
    condition: string
    conditionItemHandler: (value: string) => void
};

export const PricePicker = memo<PricePickerProps>(({ conditions, conditionItemHandler, condition }) => {
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
                    dataSource={[1, 2, 3, 4]}
                    activeItemColor={colors.headingSmall}
                    itemColor={colors.textGray}
                    wrapperBackground={'transparent'}
                    highlightColor={'transparent'}
                    wrapperHeight={70}
                    wrapperWidth={87} />
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
