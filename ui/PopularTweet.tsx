import { Tweet } from '@models';
import { Box, Flex, Heading, Image, Link, useTheme } from 'native-base';
import React from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { If } from './atoms/If';

type PopularTweetProps = {
  data: Tweet;
};

export const PopularTweet = React.memo<PopularTweetProps>(({ data }) => {
  const { colors } = useTheme();

  return (
    <Box style={{ ...styles.tweet, borderColor: colors.borderColor, backgroundColor: colors.bgTweet }}>
      <Flex direction="row" style={styles.header}>
        <Box style={styles.headerAvatar}>
          <If
            is={!!data.avatar}
            else={
              <Heading textAlign={'center'} color={colors.headingSmall} size={'sm'}>
                {data.userName.toUpperCase().slice(0, 2)}
              </Heading>
            }
          >
            <Image style={styles.avatar} resizeMode={'cover'} source={{ uri: data.avatar ?? 'alt' }} alt={''} />
          </If>
        </Box>
        <Box style={styles.headerName}>
          <NativeText style={{ color: colors.text }}>{data.userName}</NativeText>
        </Box>
      </Flex>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false} style={styles.description}>
        <Link href={data.source} _text={{ color: colors.text }} isUnderlined={false}>
          <NativeText style={{ color: colors.text }}>{data.text}</NativeText>
        </Link>
      </ScrollView>
    </Box>
  );
});

const styles = StyleSheet.create({
  tweet: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    height: 254,
    width: 207,
  },
  header: {
    height: 40,
  },
  headerAvatar: {
    height: 40,
    width: 40,
    backgroundColor: '#FAFAFA',
    borderRadius: 200,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20000,
  },
  headerName: {
    height: 40,
    width: 89,
    marginLeft: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  description: {
    height: 160,
    width: 167,
    marginTop: 14,
    overflow: 'hidden',
  },
});
