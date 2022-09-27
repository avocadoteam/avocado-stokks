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
    { links: data.filter(d => !d.imgUrl).map(d => d.link) },
    { skip: data.filter(d => !d.imgUrl).length === 0 },
  ).data;
  const imgUrls = useMemo(
    () => data.map(d => d.imgUrl ?? (dataImgUrl?.find(item => item.link === d.link)?.imgUrl as string | null)),
    [dataImgUrl],
  );

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
