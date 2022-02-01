import React, { memo } from 'react';
import { StyleSheet } from "react-native";
import { Box, Heading, useTheme } from 'native-base';
import { Separator } from 'ui/atoms/Separator';

type HeaderProps = {
};

export const Header = memo<HeaderProps>(({ }) => {
    const { colors } = useTheme();

    return (
        <Box>
            <Box style={styles.swipeController}>
                <Separator width={52} height={3} />
            </Box>
            <Box style={styles.header}>
                <Heading
                    color={colors.headingSmall} size={'sm'}>
                    Notify when
                </Heading>
            </Box>
        </Box>
    );
});

const styles = StyleSheet.create({
    swipeController: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 36,
    }
})
