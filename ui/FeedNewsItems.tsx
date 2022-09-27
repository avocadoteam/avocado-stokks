import { NewsItem } from '@models';
import { useGetImgFromArticleQuery } from 'core/modules/url-parser/query';
import { Box } from 'native-base';
import React, { useMemo } from 'react';
import { Separator } from 'ui/atoms/Separator';
import { NewsItemFeed } from 'ui/NewsItemFeed';

type LatestNewsBannerProps = {
  data: NewsItem[];
};

export const FeedNewsItems = React.memo<LatestNewsBannerProps>(({ data }) => {
  const dataImgUrl = useGetImgFromArticleQuery(
    { links: data.map(d => d.link) },
    { skip: !data.some(item => !item.imgUrl) },
  ).data;
  const imgUrls = useMemo(() => (dataImgUrl ?? data).map(d => d.imgUrl as string | null), [dataImgUrl]);

  const newsItems = data.map((n, index) => (
    <Box key={n.uuid}>
      <Box py={1}>
        <NewsItemFeed data={n} imgUrl={imgUrls[index]} />
      </Box>
      {index !== data.length - 1 && <Separator />}
    </Box>
  ));

  return <Box>{newsItems}</Box>;
});
