import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text as NativeText, Menu, Pressable, useTheme } from 'native-base';
import { DropdownItem } from 'ui/DropdownSelect/DropdownItem';

type DropdownSelectProps = {
  children: React.ReactNode;
  values: { title: string; value: any; icon: React.ReactNode }[];
  value: any;
  changeHandler: (value: any) => void;
};

export const DropdownSelect = memo<DropdownSelectProps>(({ values, value, changeHandler, children }) => {
  const { colors } = useTheme();
  const options = useMemo(
    () =>
      values.map(c => (
        <DropdownItem
          icon={c.icon}
          key={`dropdownItem${c.title}`}
          onPress={() => changeHandler(c.value)}
          isActive={value === c.value}
        >
          <NativeText style={{ color: colors.text }}>{c.title}</NativeText>
        </DropdownItem>
      )),
    [values, value, changeHandler],
  );

  return (
    <Menu
      style={{ ...styles.mainBox, backgroundColor: colors.bgDropdown }}
      closeOnSelect={false}
      w={201}
      trigger={triggerProps => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            {children}
          </Pressable>
        );
      }}
    >
      {options}
    </Menu>
  );
});

const styles = StyleSheet.create({
  mainBox: {
    borderRadius: 16,
  },
});
