import { Box, Button, Flex } from 'native-base';
import React, { memo } from 'react';
import { StyleSheet } from "react-native";
import { CheckMarkLargeIcon } from 'ui/icons/CheckMarkLargeIcon';
import { TrashLargeIcon } from 'ui/icons/TrashLargeIcon';

type PanelButtonsProps = {
};

export const PanelButtons = memo<PanelButtonsProps>(({ }) => {

    return (
        <Flex direction='row' style={styles.panelButtons}>
            <Box style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Button style={styles.buttonDelete} variant={"unstyled"}>
                    <TrashLargeIcon />
                </Button>
            </Box>
            <Box style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
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
    buttonAccept: {
        height: 50,
        width: 50,
    },
    buttonDelete: {
        height: 50,
        width: 50
    }
})
