import { NewsItem } from '@models';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import moment from 'moment';
import { Box, Heading, Link } from 'native-base';
import React, { useMemo } from 'react';
import { ImageBackground, StyleSheet, Text as NativeText } from 'react-native';
import { If } from './atoms/If';
import { NewsItemFeed } from './NewsItemFeed';

type MainNewsItemProps = {
  data: NewsItem;
};

export const MainNewsItem = React.memo<MainNewsItemProps>(({ data }) => {
  const dataImgUrl = useGetImgFromArticleQuery({ links: [data.link] }, { skip: !!data.imgUrl }).data;
  const imgUrl = useMemo(() => dataImgUrl?.[0].imgUrl ?? data.imgUrl, [dataImgUrl, data.imgUrl]);

  return (
    <If is={!!imgUrl} else={<NewsItemFeed data={data} imgUrl={null} />}>
      <ImageBackground style={styles.imageBackground} borderRadius={20} source={{ uri: imgUrl }}>
        <Box style={styles.mainBox}>
          <Box>
            <NativeText style={styles.text}>{data.publisher}</NativeText>
          </Box>
          <Box my={1}>
            <Link isUnderlined={false} href={data.link} _text={styles.text}>
              <Heading lineHeight={20.57} style={styles.text} size={'sm'}>
                {data.title}
              </Heading>
            </Link>
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
