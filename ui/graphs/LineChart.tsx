import * as shape from 'd3-shape';
import { useTheme } from 'native-base';
import React from 'react';
import { AreaChart } from 'react-native-svg-charts';

type Props = {
  up: boolean;
  data: number[];
};

export const LineGraph = React.memo<Props>(({ data, up }) => {
  const { colors } = useTheme();
  const colorFill = up ? colors.upTextColor : colors.downTextColor;
  return (
    <AreaChart
      curve={shape.curveLinear}
      svg={{
        stroke: colorFill,
        fillOpacity: 0,
      }}
      style={{ width: 353, height: 260 }}
      data={data?.filter(d => typeof d === 'number') ?? []}
      contentInset={{ top: 20, bottom: 20, left: -1, right: -1 }}
    />
  );
});
