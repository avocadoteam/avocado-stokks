import React, { memo, useState } from 'react';
import { Modal, StyleSheet } from "react-native";
import { Box, useTheme } from 'native-base';
import { EqualToIcon } from 'ui/icons/EqualToIcon';
import { GreaterThanIcon } from 'ui/icons/GreaterThanIcon';
import { LessThanIcon } from 'ui/icons/LessThanIcon';
import { Header } from './Header';
import { PanelButtons } from './PanelButtons';
import { PricePicker } from './PricePicker';
import { TimePicker } from './TimePicker';

type NotifyModalProps = {
    visible: boolean;
    closeNotifyModal: () => void;
};

export const NotifyModal = memo<NotifyModalProps>(({ visible, closeNotifyModal }) => {
    const { colors } = useTheme();
    const [condition, setCondition] = useState('Equals to')
    const conditionItemHandler = (value: string) => {
        setCondition(value)
    }
    const conditions = [
        {
            title: 'Equals to',
            icon: <EqualToIcon />
        }, {
            title: 'Greater than',
            icon: <GreaterThanIcon />
        }, {
            title: 'Less than',
            icon: <LessThanIcon />
        }
    ]

    const [intervalTime, setIntervalTime] = useState('Every hour')
    const timeIntervalItems = [
        'Every hour', 'Every 8 hours',
        'Daily', 'Weekly', 'Monthly'
    ]
    const timeIntervalItemHandler = (value: string) => {
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
                        <Header />
                        <PricePicker
                            conditions={conditions} condition={condition}
                            conditionItemHandler={conditionItemHandler} />
                        <TimePicker
                            values={timeIntervalItems} value={intervalTime}
                            changeHandler={timeIntervalItemHandler} />
                        <PanelButtons />
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
        flexDirection: 'column',
        height: 404,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
    },
})
