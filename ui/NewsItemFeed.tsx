import { NewsItem } from '@models';
import newsItemImage from 'assets/images/NewsItem.png';
import moment from 'moment';
import { Box, Flex, Heading, Link, useTheme } from 'native-base';
import React from 'react';
import { Image, StyleSheet, Text as NativeText } from 'react-native';
import { If } from './atoms/If';

type NewsItemProps = {
  data: NewsItem;
  imgUrl: string | null;
};

export const NewsItemFeed = React.memo<NewsItemProps>(({ data, imgUrl }) => {
  const { colors } = useTheme();

  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center">
      <Flex style={styles.infoBox} flexDirection="column">
        <Box key={'publisher_news'} my={1}>
          <NativeText style={{ color: colors.textGray }}>{data.publisher}</NativeText>
        </Box>
        <Box key={'text_news'} my={1}>
          <Link isUnderlined={false} href={data.link} _text={{ color: colors.headingSmall }}>
            <Heading color={colors.headingSmall} lineHeight={19} size={'sm'}>
              {data.title}
            </Heading>
          </Link>
        </Box>
        <Box key={'date_published'} my={1}>
          <NativeText style={{ color: colors.textGray }}>
            {moment.unix(data.providerPublishTime).format('HH:mm DD.MM.YYYY')}
          </NativeText>
        </Box>
      </Flex>
      <Box style={{ width: 24 }} />
      <Box style={styles.imageBox}>
        <If is={!!imgUrl}>
          <Image style={styles.image} source={imgUrl ? { uri: imgUrl } : newsItemImage} resizeMode={'cover'} />
        </If>
      </Box>
    </Flex>
  );
});

const styles = StyleSheet.create({
  infoBox: {
    minHeight: 107,
    flexShrink: 2,
    flexGrow: 3,
  },
  imageBox: {
    flexGrow: 1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 14,
  },
});
