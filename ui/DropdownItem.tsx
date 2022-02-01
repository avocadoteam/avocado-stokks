import React, { ReactElement } from "react";
import { Box, Flex, Image, Menu, Pressable, useTheme } from 'native-base';
import { StyleSheet, Text as NativeText } from "react-native";
import { If } from "./atoms/If";
import { CheckMarkIcon } from "./icons/CheckMarkIcon";

type DropdownItemProps = {
    onPress: () => void
    isActive: boolean
    icon: ReactElement<any, any>
    children: ReactElement<any, any>
}

export const DropdownItem = React.memo<DropdownItemProps>(({ onPress, isActive, children, icon }) => {
    const { colors } = useTheme()

    return <Menu.Item><Pressable
        style={styles.mainBox}
        onPress={onPress} >
        <Box style={styles.leftBadge}>
            {icon}
        </Box>
        <Box style={styles.titleDropdown}>
            <NativeText style={{ color: colors.text }}>
                {children}
            </NativeText>
        </Box>
        <Box>
            <If is={isActive}><CheckMarkIcon /></If>
        </Box>
    </Pressable></Menu.Item>
})

const styles = StyleSheet.create({
    mainBox: {
        width: 201,
        height: 36,
        margin: -16,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftBadge: {
        height: 24,
        width: 24,
    },
    titleDropdown: {
        height: 24,
        width: 108,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rightBadge: {
        height: 20,
        width: 20
    }
})