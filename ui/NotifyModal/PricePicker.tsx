import { TriggerParam } from '@models';
import { notificationActions } from 'core/modules/notifications/reducer';
import { Box, Flex, Input, ScrollView, Text as NativeText, useTheme } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { ScrollPicker } from 'ui/ScrollPicker';

type PricePickerProps = {
  triggerValue: string;
  triggerParam: TriggerParam;
};

const triggerParams = [
  { value: TriggerParam.Equals, title: 'Equals to' },
  { value: TriggerParam.Greater, title: 'Greater than' },
  { value: TriggerParam.Less, title: 'Less than' },
];

export const PricePicker = memo<PricePickerProps>(({ triggerParam, triggerValue }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const pricePickerHandler = (value: TriggerParam) => {
    dispatch(notificationActions.setNotifyTriggerParam(value));
  };

  const [isFocusInput, setFocusInput] = useState(false);
  const changeInputHandler = useCallback((value: string) => {
    dispatch(notificationActions.setNotifyTriggerValue(value));
  }, []);
  const blurInputHandler = useCallback(() => {
    setFocusInput(false);
    dispatch(notificationActions.setModalHeight(404));
  }, []);
  const focusInputHandler = useCallback(() => {
    setFocusInput(true);
    dispatch(notificationActions.setModalHeight(540));
  }, []);
  const triggerParams = [
    { value: TriggerParam.Equals, title: 'Equals to' },
    { value: TriggerParam.Greater, title: 'Greater than' },
    { value: TriggerParam.Less, title: 'Less than' },
  ];

  return (
    <Box style={styles.pricePicker}>
      <Box style={styles.conditionPricePicker}>
        <Flex direction="row">
          <Box style={{ justifyContent: 'center', flexDirection: 'column' }} mr={2}>
            <NativeText style={{ color: colors.textGray }}>The price is</NativeText>
          </Box>
          <ScrollPicker
            height={70}
            width={130}
            items={triggerParams}
            selectedItem={{
              value: triggerParam,
              title: triggerParam,
            }}
            changeHandler={pricePickerHandler}
          />
        </Flex>
      </Box>
      <Box style={{ ...styles.pricePickerForm, backgroundColor: colors.bgScrollPicker }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Input
            borderColor={isFocusInput ? colors.borderInputFocused : 'transparent'}
            textAlign={'center'}
            fontSize={20}
            fontWeight={'bold'}
            height={70}
            minWidth={87}
            borderRadius={16}
            color={colors.text}
            onChangeText={changeInputHandler}
            onBlur={blurInputHandler}
            onFocus={focusInputHandler}
            keyboardType={'numeric'}
            value={triggerValue}
            maxLength={10}
          />
        </ScrollView>
      </Box>
    </Box>
  );
});

const styles = StyleSheet.create({
  pricePicker: {
    flexDirection: 'row',
    marginTop: 19,
    height: 70,
    paddingRight: 24,
  },
  conditionPricePicker: {
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 100,
  },
  pricePickerForm: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    borderRadius: 16,
  },
});
