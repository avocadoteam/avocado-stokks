import React, { useState } from "react";
import { Box, Heading, Link, Text as NativeText, useTheme } from "native-base";
import { Modal, StyleSheet } from "react-native"
import { Toggle } from "./atoms/Toggle";
import { useSwipeHandler } from "core/hooks/useSwipeHandler";
import { AppIcon } from "./icons/AppIcon";

type InfoModalProps = {
    visible: boolean
    closeInfoModal: () => void
};

export const InfoModal = React.memo<InfoModalProps>(({ closeInfoModal, visible }) => {
    const { colors } = useTheme();
    const [height, setHeight] = useState(557)
    const [touchStartHandler, touchMoveHandler] = useSwipeHandler({ min: 400, current: height, max: 600 }, setHeight, { min: closeInfoModal })

    return (
        <Modal
            transparent={true}
            animationType="slide"
            onRequestClose={closeInfoModal}
            visible={visible}
        >
            <Box style={styles.mainBox}>
                <Box style={{ ...styles.contentBox, height, backgroundColor: colors.bgTweet }}>
                    <Toggle
                        touchStartHandler={touchStartHandler} touchMoveHandler={touchMoveHandler} />
                    <Box style={styles.appIcon}>
                        <AppIcon />
                    </Box>
                    <Heading style={styles.appTitle}
                        color={colors.headingSmall} size={"sm"}>
                        Stokks
                    </Heading>
                    <NativeText style={styles.appVersion}
                        color={colors.textDarkGray}>
                        1.0
                    </NativeText>
                    <NativeText style={styles.appVersion}
                        color={colors.textDarkGray}>
                        Icons from <Link
                            href={"https://useanimations.com/"}
                        >useanimations.com</Link>
                    </NativeText>
                </Box>
            </Box>
        </Modal>
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
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
    },
    appIcon: {
        marginTop: 97,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    appTitle: {
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    appVersion: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    additionalInfo: {
        marginTop: 157,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
