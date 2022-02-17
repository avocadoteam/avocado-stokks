import React from 'react';
import { Box, Heading } from 'native-base';
import { ImageBackground, StyleSheet, Text as NativeText } from 'react-native';
import { NewsItem } from '@models';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import { NewsItemFeed } from './NewsItemFeed';
import { If } from './atoms/If';

type MainNewsItemProps = {
  data: NewsItem;
};

export const MainNewsItem = React.memo<MainNewsItemProps>(({ data }) => {
  const dataImgUrl = useGetImgFromArticleQuery({ link: data.link }).data

  return (
    <If is={!!dataImgUrl?.imgUrl} else={<NewsItemFeed data={data} />}>
      <ImageBackground style={styles.imageBackground} borderRadius={20} source={{ uri: dataImgUrl?.imgUrl ?? "" }}>
        <Box style={styles.mainBox}>
          <Box>
            <NativeText style={styles.text}>{data.publisher}</NativeText>
          </Box>
          <Box>
            <Heading style={styles.text} size={'sm'}>
              {data.title}
            </Heading>
          </Box>
          <Box>
            <NativeText style={styles.text}>{data.providerPublishTime}</NativeText>
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
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
