import React from "react"
import { ScrollView } from "react-native";
import { Box } from "native-base";
import { ActiveOption } from "./ActiveOption";
import { Option } from './Option'

type ReminderPickerProps = {
    values: string[]
    value: string
    changeHandler: (value: string) => void
}

export const HorizontalSelect = React.memo<ReminderPickerProps>(({ values, value, changeHandler }) => {
    const options = mapValuesToOptions(values, value, changeHandler)

    return <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {options}
    </ScrollView>
})

const mapValuesToOptions = (
    values: string[], value: string, optionHandler: (value: string) => void) => {
    return values.map(v => {
        let option = <></>
        if (v === value) {
            option = <ActiveOption title={v} />
        } else {
            option = <Option title={v} onPress={() => optionHandler(v)} />
        }
        return <Box key={`timeInterval-${v}`} ml={2}>{option}</Box>
    })
}
