import { Ionicons } from '@expo/vector-icons';
import { SearchModel } from '@models';
import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, IconButton, Input, useTheme } from 'native-base';
import React, { useMemo } from 'react';
import { debounceTime, of, Subject, throttle } from 'rxjs';

type Props = {
  search: (arg: SearchModel) => void;
};

export const SearchHeader = React.memo<Props>(({ search }) => {
  const { colors, borders } = useTheme();
  const navigation = useNavigation();

  const searchSubj = useMemo(() => {
    const sub = new Subject<SearchModel>();

    sub
      .pipe(
        debounceTime(200),
        throttle(sm => of(search(sm)), { leading: true, trailing: true }),
      )
      .subscribe();

    return sub;
  }, []);

  const handleSearch = React.useCallback((text: string) => {
    if (text) {
      searchSubj.next({ query: text });
    }
  }, []);

  return (
    <HStack mt={12} py={2} px={4}>
      <Input
        variant="filled"
        InputLeftElement={
          <IconButton
            variant="unstyled"
            icon={<Icon size="sm" as={<Ionicons name="arrow-back" />} color={colors.searchIcon} />}
            onPress={navigation.goBack}
          />
        }
        placeholder="Search"
        bg={colors.searchBg}
        placeholderTextColor={colors.placeholderColor}
        color={colors.searchColor}
        width="100%"
        borderRadius={borders.searchRadius}
        _focus={{
          borderColor: colors.searchBg,
        }}
        onChangeText={handleSearch}
      />
    </HStack>
  );
});
