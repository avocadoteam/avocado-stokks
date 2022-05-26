import { Box, Flex, Input, Text as NativeText, ScrollView, useTheme } from 'native-base';
import React, { memo, useCallback, useState } from 'react';

import { ArrowDropDownIcon } from 'ui/icons/ArrowDropDownIcon';
import { DropdownSelect } from 'ui/DropdownSelect/DropdownSelect';
import { EqualToIcon } from 'ui/icons/EqualToIcon';
import { GreaterThanIcon } from 'ui/icons/GreaterThanIcon';
import { LessThanIcon } from 'ui/icons/LessThanIcon';
import { StyleSheet } from 'react-native';
import { TriggerParam } from '@models';
import { notificationActions } from 'core/modules/notifications/reducer';
import { useDispatch } from 'react-redux';

type PricePickerProps = {
  triggerValue: string;
  triggerParam: TriggerParam;
};

export const PricePicker = memo<PricePickerProps>(({ triggerParam, triggerValue }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const dropdownSelectHandler = (value: TriggerParam) => {
    dispatch(notificationActions.setNotifyTriggerParam(value));
  };

  const [isFocusInput, setFocusInput] = useState(false);
  const changeInputHandler = useCallback((value: string) => {
    dispatch(notificationActions.setNotifyTriggerValue(value));
  }, []);
  const blurInputHandler = useCallback(() => {
    setFocusInput(false);
  }, []);
  const focusInputHandler = useCallback(() => {
    setFocusInput(true);
  }, []);

  return (
    <Box style={styles.pricePicker}>
      <Box style={styles.conditionPricePicker}>
        <DropdownSelect values={triggerParams} value={triggerParam} changeHandler={dropdownSelectHandler}>
          <Flex direction="row">
            <NativeText style={{ color: colors.textGray }}>The price is</NativeText>
            <ArrowDropDownIcon />
          </Flex>
        </DropdownSelect>
      </Box>
      <Box style={{ ...styles.pricePickerForm, backgroundColor: colors.bgScrollPicker }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Input
            borderColor={isFocusInput ? colors.borderInputFocused : 'transparent'}
            textAlign={'center'}
            fontSize={20}
            fontWeight={'bold'}
            height={70}
            width={87}
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

const triggerParams = [
  {
    title: 'Equals to',
    value: TriggerParam.Equals,
    icon: <EqualToIcon />,
  },
  {
    title: 'Greater than',
    value: TriggerParam.Greater,
    icon: <GreaterThanIcon />,
  },
  {
    title: 'Less than',
    value: TriggerParam.Less,
    icon: <LessThanIcon />,
  },
];
