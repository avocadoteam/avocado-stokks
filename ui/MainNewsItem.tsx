import { NewsItem } from '@models';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import moment from 'moment';
import { Box, Heading, Link } from 'native-base';
import React from 'react';
import { ImageBackground, StyleSheet, Text as NativeText } from 'react-native';
import { If } from './atoms/If';
import { NewsItemFeed } from './NewsItemFeed';

type MainNewsItemProps = {
  data: NewsItem;
};

export const MainNewsItem = React.memo<MainNewsItemProps>(({ data }) => {
  const dataImgUrl = useGetImgFromArticleQuery({ links: [data.link] }).data;

  return (
    <If is={!!dataImgUrl?.[0].imgUrl} else={<NewsItemFeed data={data} imgUrl={null} />}>
      <ImageBackground style={styles.imageBackground} borderRadius={20} source={{ uri: dataImgUrl?.[0].imgUrl ?? '' }}>
        <Box style={styles.mainBox}>
          <Box>
            <NativeText style={styles.text}>{data.publisher}</NativeText>
          </Box>
          <Box flexDirection="row">
            <Heading style={styles.text} size={'sm'}>
              <Link href={data.link} _text={styles.text}>
                {data.title}
              </Link>
            </Heading>
          </Box>
          <Box>
            <NativeText style={styles.text}>{moment.unix(data.providerPublishTime).format('HH:mm DD.MM.YYYY')}</NativeText>
          </Box>
        </Box>
      </ImageBackground>
    </If>
  );
});

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 326,
    borderRadius: 20,
    marginHorizontal: 'auto',
  },
  mainBox: {
    width: 353,
    height: 326,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  text: {
    width: 273,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
