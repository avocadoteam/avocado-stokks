import { Ionicons } from '@expo/vector-icons';
import { NotificationIntervalTarget, SymbolGeneralInfo } from '@models';
import { Box, Button, Flex, Heading, HStack, Icon, Text as NativeText, useTheme } from 'native-base';
import React, { memo, useState } from 'react';
import { Modal, StyleSheet } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
//@ts-ignore
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { If } from 'ui/atoms/If';
import { Separator } from 'ui/atoms/Separator';
import { HorizontalSelect } from 'ui/HorizontalSelect/HorizontalSelect';

type NotifyModalProps = {
    visible: boolean;
    closeNotifyModal: () => void;
};

export const NotifyModal = memo<NotifyModalProps>(({ visible, closeNotifyModal }) => {
    const { colors } = useTheme();
    const [visibleConditionDropdown, setVisibleConditionDropdown] = useState(false)
    const openDropdownCondition = () => {
        setVisibleConditionDropdown(true)
    }
    const closeDropdownCondition = () => {
        setVisibleConditionDropdown(false)
    }
    const [condition, setCondition] = useState('Equals to')
    const conditions = ['Equals to', 'Greater than', 'Less than']
    const onPressConditionItem = (value: string) => {
        setCondition(value)
    }

    const [intervalTime, setIntervalTime] = useState('Every hour')
    const timeIntervalItems = [
        'Every hour', 'Every 8 hours',
        'Daily', 'Weekly', 'Monthly'
    ]
    const onPressTimeIntervalItem = (value: string) => {
        setIntervalTime(value)
    }

    return (
        <Box>
            <Modal
                transparent={true}
                animationType="slide"
                onRequestClose={closeNotifyModal}
                visible={visible}>
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
                                    <Button
                                        onPress={openDropdownCondition}
                                        variant="unstyled"
                                        endIcon={<Icon as={Ionicons} name="ios-chevron-down" size={3} color={colors.textGray} />}
                                    ></Button>
                                </NativeText>
                                <If is={visibleConditionDropdown}>
                                    <Box style={styles.dropdownCondition}>
                                        <ModalDropdown
                                            options={conditions}
                                            onSelect={onPressConditionItem}
                                        />
                                    </Box>
                                </If>
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
                                    value={intervalTime}
                                    values={timeIntervalItems} />
                            </Box>
                        </Box>
                        <Flex direction='row' style={styles.panelButtons}>

                        </Flex>
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
    dropdownCondition: {
        zIndex: 1000
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
    },
    panelButtons: {
        marginTop: 40
    },
    buttonAccept: {
        height: 50,
        width: 50
    },
    buttonDelete: {
        height: 50,
        width: 50
    }
})
