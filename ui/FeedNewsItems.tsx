import React from 'react';
import { Box } from 'native-base';
import { NewsItem } from '@models';
import { NewsItemFeed } from 'ui/NewsItemFeed';
import { Separator } from 'ui/atoms/Separator';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';

type LatestNewsBannerProps = {
  data: NewsItem[];
};

export const FeedNewsItems = React.memo<LatestNewsBannerProps>(({ data }) => {
  const dataImgUrl = useGetImgFromArticleQuery({ links: data.map(d => d.link) }).data;

  const newsItems = data.map((n, index) => (
    <Box key={`newsItem${n.uuid}`}>
      <Box py={1}>
        <NewsItemFeed data={n} imgUrl={dataImgUrl?.find(v => v.link === n.link)?.imgUrl ?? null} />
      </Box>
      {index !== data.length - 1 && <Separator />}
    </Box>
  ));

  return <Box>{newsItems}</Box>;
});
