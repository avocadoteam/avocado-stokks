import React from "react";
import { Box } from 'native-base';
import { NewsItem } from "@models";
import { NewsItemFeed } from "ui/NewsItemFeed";
import { Separator } from "ui/atoms/Separator";

type LatestNewsBannerProps = {
    data: NewsItem[]
}

export const FeedNewsItems = React.memo<LatestNewsBannerProps>(({ data }) => {
    const newsItems = data.map((n, index) => <Box key={`newsItem${n.uuid}`} my={2}>
        <NewsItemFeed data={n} />{(index !== data.length - 1) && <Separator />}
    </Box>)

    return <Box>
        {newsItems}
    </Box>
})
