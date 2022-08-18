import { Box } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import { ActiveOption } from './ActiveOption';
import { Option } from './Option';

type ReminderPickerProps = {
  items: Item[];
  value: string;
  changeHandler: (value: any) => void;
};

export const HorizontalSelect = React.memo<ReminderPickerProps>(({ items, value, changeHandler }) => {
  const options = mapItemsToOptions(items, value, changeHandler);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {options}
    </ScrollView>
  );
});

const mapItemsToOptions = (items: Item[], value: any, optionHandler: (value: any) => void) => {
  return items.map(item => {
    let option = <></>;
    if (item.value === value) {
      option = <ActiveOption title={item.title} />;
    } else {
      option = <Option title={item.title} onPress={() => optionHandler(item.value)} />;
    }
    return (
      <Box key={`timeInterval-${item.title}`} ml={2}>
        {option}
      </Box>
    );
  });
};

type Item = {
  title: string;
  value: string;
};
