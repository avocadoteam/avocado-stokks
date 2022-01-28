import React from "react"
import { ScrollView } from "react-native";
import { Box } from "native-base";
import { ActiveOption } from "./ActiveOption";
import { Option } from './Option'

type ReminderPickerProps = {
    values: string[]
    value: string
    onPressOption: (value: string) => void
}

export const HorizontalSelect = React.memo<ReminderPickerProps>(({ values, value, onPressOption }) => {
    const options = mapValuesToOptionsIncludeValue(values, value, onPressOption)

    return <ScrollView
        horizontal={true}>
        {options}
    </ScrollView>
})

const mapValuesToOptionsIncludeValue = (
    values: string[], value: string, onPressOption: (value: string) => void) => {
    return values.map(v => {
        let option = <></>
        if (v === value) {
            option = <ActiveOption title={v} />
        } else {
            option = <Option title={v} onPress={() => onPressOption(v)} />
        }
        return <Box key={`timeInterval-${v}`} ml={2}>{option}</Box>
    })
}
