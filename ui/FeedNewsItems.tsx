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
  const linksToParse = data.filter(d => !d.imgUrl).map(d => d.link);
  const { data: dataImgUrls = [] } = useGetImgFromArticleQuery({ links: linksToParse }, { skip: !linksToParse.length });

  const imgUrls = useMemo(
    () =>
      data.reduce<Record<string, string | null>>((acc, next) => {
        acc[next.uuid] = next.imgUrl ?? dataImgUrls.find(item => item.link === next.link)?.imgUrl ?? null;
        return acc;
      }, {}),
    [dataImgUrls],
  );

  const newsItems = data.map((n, index) => (
    <Box key={n.uuid}>
      <Box py={1}>
        <NewsItemFeed data={n} imgUrl={imgUrls[n.uuid]} />
      </Box>
      {index !== data.length - 1 && <Separator />}
    </Box>
  ));

  return <Box>{newsItems}</Box>;
});
