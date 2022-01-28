import { Ionicons } from '@expo/vector-icons';
import { NotificationIntervalTarget, SymbolGeneralInfo } from '@models';
import { Box, Button, Heading, HStack, Icon, Text as NativeText, useTheme } from 'native-base';
import React, { memo, useState } from 'react';
import { Modal, StyleSheet } from "react-native";
//@ts-ignore
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { Separator } from 'ui/atoms/Separator';
import { HorizontalSelect } from 'ui/HorizontalSelect/HorizontalSelect';

type NotifyModalProps = {
    isOpen: boolean;
    closeNotifyModal: () => void;
};

export const NotifyModal = memo<NotifyModalProps>(({ isOpen, closeNotifyModal }) => {
    const { colors } = useTheme();
    const [pickedItem, setPickedItem] = useState('Every hour')
    const timeIntervalItems = [
        'Every hour', 'Every 8 hours',
        'Daily', 'Weekly', 'Monthly'
    ]
    const onPressTimeIntervalItem = (item: string) => {
        setPickedItem(item)
    }

    return (
        <Box>
            <Modal
                transparent={true}
                animationType="slide"
                onRequestClose={closeNotifyModal}
                visible={isOpen}>
                <Box style={{ ...styles.mainBox }}>
                    <Box style={{ ...styles.contentBox, backgroundColor: colors.bgTweet }}>
                        <Box style={styles.swipeController}>
                            <Separator width={52} height={3} />
                        </Box>
                        <Box style={styles.header}>
                            <Heading
                                color={colors.headingSmall} size={'sm'}>
                                Notify when
                            </Heading>
                        </Box>
                        <Box style={styles.pricePicker}>
                            <Box style={styles.conditionPricePicker}>
                                <NativeText style={{ color: colors.textGray }}>
                                    The price reaches:
                                </NativeText>
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
                        <Box style={styles.timePicker}>
                            <Box style={styles.titleTimePicker}>
                                <NativeText style={{ color: colors.textGray }}>
                                    Also:
                                </NativeText>
                            </Box>
                            <Box style={styles.timePickerForm}>
                                <HorizontalSelect
                                    onPressOption={onPressTimeIntervalItem}
                                    value={pickedItem}
                                    values={timeIntervalItems} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
});

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        justifyContent: 'flex-end',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentBox: {
        height: 404,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        flexDirection: 'column',
    },
    swipeController: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24
    },
    header: {
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pricePicker: {
        marginTop: 19,
        flexDirection: 'row',
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
    timePicker: {
        marginTop: 31,
        flexDirection: 'row',
        height: 46,
    },
    titleTimePicker: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    timePickerForm: {
        marginHorizontal: 30,
        width: 'auto'
    }
})
