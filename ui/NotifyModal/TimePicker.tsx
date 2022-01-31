import { Box, Text as NativeText, useTheme } from 'native-base';
import React, { memo } from 'react';
import { StyleSheet } from "react-native";
import { HorizontalSelect } from 'ui/HorizontalSelect/HorizontalSelect';

type TimePickerProps = {
    onPressOption: (value: string) => void
    value: string
    values: string[]
};

export const TimePicker = memo<TimePickerProps>(({ values, value, onPressOption }) => {
    const { colors } = useTheme();

    return (
        <Box style={styles.timePicker}>
            <Box style={styles.titleTimePicker}>
                <NativeText style={{ color: colors.textGray }}>
                    Also:
                </NativeText>
            </Box>
            <Box style={styles.timePickerForm}>
                <HorizontalSelect
                    onPressOption={onPressOption}
                    value={value}
                    values={values} />
            </Box>
        </Box>
    );
});

const styles = StyleSheet.create({
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
})
