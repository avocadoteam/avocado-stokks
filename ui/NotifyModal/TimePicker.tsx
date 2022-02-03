import React, { memo } from 'react';
import { StyleSheet } from "react-native";
import { Box, Text as NativeText, useTheme } from 'native-base';
import { HorizontalSelect } from 'ui/HorizontalSelect/HorizontalSelect';

type TimePickerProps = {
    value: string
    values: string[]
    changeHandler: (value: string) => void
};

export const TimePicker = memo<TimePickerProps>(({ value, values, changeHandler }) => {
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
                    changeHandler={changeHandler}
                    value={value}
                    values={values} />
            </Box>
        </Box>
    );
});

const styles = StyleSheet.create({
    timePicker: {
        height: 46,
        marginTop: 31,
        flexDirection: 'row',
    },
    titleTimePicker: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    timePickerForm: {
        width: 'auto',
        marginHorizontal: 30,
    },
})
