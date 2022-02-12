import React from 'react';
import { useTheme, Heading, Button } from 'native-base';
import { styles } from './OptionStyle';

type ItemProps = {
  title: React.ReactNode;
  onPress: () => void;
};

export const Option = React.memo<ItemProps>(({ title, onPress }) => {
  const { colors } = useTheme();
  const { horizontalSelect } = colors;

  return (
    <Button onPress={onPress} style={{ ...styles.mainBox, backgroundColor: horizontalSelect.bgOption }}>
      <Heading color={horizontalSelect.textOption} size={'sm'}>
        {title}
      </Heading>
    </Button>
  );
});
