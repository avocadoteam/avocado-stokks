import { NewsItem } from '@models';
import newsItemImage from 'assets/images/NewsItem.png';
import { Box, Flex, Heading, useTheme } from 'native-base';
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
    <Flex direction="row">
      <Flex style={styles.infoBox} direction="column">
        <Box key={'publisher_news'} my={2}>
          <NativeText style={{ color: colors.textGray }}>{data.publisher}</NativeText>
        </Box>
        <Box key={'text_news'} my={2}>
          <Heading color={colors.headingSmall} size={'sm'}>
            {data.title}
          </Heading>
        </Box>
        <Box key={'date_published'} my={2}>
          <NativeText style={{ color: colors.textGray }}>{data.providerPublishTime}</NativeText>
        </Box>
      </Flex>
      <If is={!!imgUrl}>
        <Box style={styles.imageBox}>
          <Image style={styles.image} source={imgUrl ? { uri: imgUrl } : newsItemImage} resizeMode={'cover'} />
        </Box>
      </If>
    </Flex>
  );
});

const styles = StyleSheet.create({
  infoBox: {
    width: 250,
    minHeight: 107,
  },
  imageBox: {
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 14,
    width: 60,
    height: 60,
  },
});
