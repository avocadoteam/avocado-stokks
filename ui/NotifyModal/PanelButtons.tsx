import React, { memo } from 'react';
import { StyleSheet } from "react-native";
import { Box, Button, Flex } from 'native-base';
import { CheckMarkLargeIcon } from 'ui/icons/CheckMarkLargeIcon';
import { TrashLargeIcon } from 'ui/icons/TrashLargeIcon';

type PanelButtonsProps = {
};

export const PanelButtons = memo<PanelButtonsProps>(({ }) => {

    return (
        <Flex direction='row' style={styles.panelButtons}>
            <Box style={styles.sideDelete}>
                <Button style={styles.buttonDelete} variant={"unstyled"}>
                    <TrashLargeIcon />
                </Button>
            </Box>
            <Box style={styles.sideAccept}>
                <Button style={styles.buttonAccept} variant={"unstyled"}>
                    <CheckMarkLargeIcon />
                </Button>
            </Box>
        </Flex>
    );
});

const styles = StyleSheet.create({
    panelButtons: {
        marginTop: 40
    },
    sideDelete: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '50%',
    },
    sideAccept: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '50%',
    },
    buttonAccept: {
        height: 50,
        width: 50,
    },
    buttonDelete: {
        height: 50,
        width: 50
    }
})
