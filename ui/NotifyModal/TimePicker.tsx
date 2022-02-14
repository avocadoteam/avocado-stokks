import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text as NativeText, useTheme } from 'native-base';
import { NotificationIntervalTarget } from '@models';
import { HorizontalSelect } from 'ui/HorizontalSelect/HorizontalSelect';
import { useDispatch } from 'react-redux';
import { stockActions } from 'core/modules/stock/reducer';

type TimePickerProps = {
  notifyInterval: string;
};

export const TimePicker = memo<TimePickerProps>(({ notifyInterval }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const changeHandler = (value: NotificationIntervalTarget) => {
    dispatch(stockActions.setNotifyInterval(value));
  };

  return (
    <Box style={styles.timePicker}>
      <Box style={styles.titleTimePicker}>
        <NativeText style={{ color: colors.textGray }}>Also:</NativeText>
      </Box>
      <Box style={styles.timePickerForm}>
        <HorizontalSelect changeHandler={changeHandler} value={notifyInterval} items={timeIntervalItems} />
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
});

const timeIntervalItems = [
  {
    title: 'Every hour',
    value: NotificationIntervalTarget.EveryHour,
  },
  {
    title: 'Every 8 hours',
    value: NotificationIntervalTarget.Every8Hours,
  },
  {
    title: 'Daily',
    value: NotificationIntervalTarget.Daily,
  },
  {
    title: 'Weekly',
    value: NotificationIntervalTarget.Weekly,
  },
  {
    title: 'Monthly',
    value: NotificationIntervalTarget.Monthly,
  },
];
