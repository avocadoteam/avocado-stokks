import React from 'react';
import { StyleSheet, Text as NativeText, Image } from 'react-native';
import { Box, Flex, Heading, useTheme } from 'native-base';
import { NewsItem } from '@models';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import newsItemImage from 'assets/images/NewsItem.png';
import { If } from './atoms/If';

type NewsItemProps = {
  data: NewsItem;
};

export const NewsItemFeed = React.memo<NewsItemProps>(({ data }) => {
  const { colors } = useTheme();
  const dataImgUrl = useGetImgFromArticleQuery({ link: data.link }).data;

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
      <If is={!!dataImgUrl?.imgUrl}>
        <Box style={styles.imageBox}>
          <Image
            style={styles.image}
            source={dataImgUrl?.imgUrl ? { uri: dataImgUrl.imgUrl } : newsItemImage}
            resizeMode={'cover'}
          />
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
