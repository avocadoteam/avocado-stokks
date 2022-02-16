import * as shape from 'd3-shape';
import { useTheme } from 'native-base';
import React from 'react';
import { AreaChart } from 'react-native-svg-charts';

type Props = {
  up: boolean;
  data: number[];
};

export const AreaGraph = React.memo<Props>(({ data, up }) => {
  const { colors } = useTheme();
  const colorFill = up ? colors.upTextColor : colors.downTextColor;
  return (
    <AreaChart
      style={{ height: 32, width: 82 }}
      contentInset={{ top: 5, bottom: 5 }}
      data={data?.filter(d => typeof d === 'number') ?? []}
      curve={shape.curveNatural}
      svg={{
        fill: colorFill,
        stroke: colorFill,
        fillOpacity: 0.4,
        strokeLinecap: 'round',
      }}
    />
  );
});
