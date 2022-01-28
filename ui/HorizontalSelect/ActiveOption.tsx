import React from "react"
import { Button, useTheme, Heading } from "native-base"
import { styles } from "./OptionStyle";

type PickedItemProps = {
    title: string
}

export const ActiveOption = React.memo<PickedItemProps>(({ title }) => {
    const { colors } = useTheme()
    const { horizontalSelect } = colors

    return <Button key={`pickedItem-${title}`}
        style={{ ...styles.mainBox, backgroundColor: horizontalSelect.bgActiveOption }}>
        <Heading color={horizontalSelect.textActiveOption} size={'sm'}>
            {title}
        </Heading>
    </Button>
})
