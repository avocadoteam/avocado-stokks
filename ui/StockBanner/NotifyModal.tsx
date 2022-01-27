import { Ionicons } from '@expo/vector-icons';
import { SymbolGeneralInfo } from '@models';
import { Box, Button, Heading, HStack, Icon, Text as NativeText, useTheme } from 'native-base';
import React, { memo } from 'react';
import { Modal, ScrollView, StyleSheet } from "react-native";
//@ts-ignore
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { background } from 'styled-system';
import { Separator } from 'ui/atoms/Separator';

type NotifyModalProps = {
    isOpen: boolean;
    closeNotifyModal: () => void;
};

export const NotifyModal = memo<NotifyModalProps>(({ isOpen, closeNotifyModal }) => {
    const { colors } = useTheme();

    return (
        <Box>
            <Modal
                transparent={true}
                animationType="slide"
                presentationStyle="formSheet"
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
                            <Box style={{ ...styles.inputPricePicker, backgroundColor: colors.bgScrollPicker }}>
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
                        <Box style={styles.titleTimePicker}>
                            Also:
                        </Box>
                        <ScrollView style={styles.timeElementsPicker} horizontal={true}>
                            {[1, 2, 3, 4].map(item => <Box key={`time${item}`} style={{ ...styles.timeItem, backgroundColor: colors.bgScrollPicker }}>
                                <NativeText>{item}</NativeText></Box>)}
                        </ScrollView>
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
        paddingLeft: 24,
        flexDirection: 'column'
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
    inputPricePicker: {
        justifyContent: 'flex-end',
        marginRight: 24,
        marginLeft: 'auto',
        borderRadius: 16,
        borderWidth: 1
    },
    timePicker: {
        marginTop: 31,
        flexDirection: 'row',
        height: 46
    },
    titleTimePicker: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    timeElementsPicker: {
        marginLeft: 12
    },
    timeItem: {
        borderRadius: 24,
        height: 46,
        width: 132,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
