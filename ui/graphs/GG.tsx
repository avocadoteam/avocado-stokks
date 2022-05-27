import { SlideAreaChart, ToolTipProps } from '@connectedcars/react-native-slide-charts';
import { memo, useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { useTheme } from 'native-base';

type Props = {
  up: boolean;
  data: number[];
};

const s = { backgroundColor: 'transparent', marginBottom: -20 };
const yx = {
  verticalLineWidth: 0,
  horizontalLineWidth: 0,
  hideMarkers: true,
  axisLabel: '',
};
const xx = {
  axisLabel: '',
};

const tt: ToolTipProps = {
  displayTriangle: true,
  toolTipTextRenderers: [
    ({ scaleY, y }) => ({
      text: scaleY.invert(y).toFixed(2).toString(),
    }),
  ],
};

export const GG = memo(({ data, up }: Props) => {
  const { colors } = useTheme();
  const graphData = data?.filter(d => typeof d === 'number') ?? [];
  const colorFill = up ? colors.upTextColor : colors.downTextColor;
  const dispatch = useDispatch();

  const yRange = useMemo<[number, number]>(() => [Math.min(...graphData), Math.max(...graphData)], [graphData.length]);
  const graphDataMap = useMemo(() => graphData.map((gd, index) => ({ x: index, y: gd })), [graphData.length]);

  return (
    <SlideAreaChart
      scrollable
      chartLineWidth={2}
      data={graphDataMap}
      chartLineColor={colorFill}
      style={s}
      fillColor="transparent"
      cursorProps={{
        cursorColor: colorFill,
        displayCursor: true,
      }}
      yAxisProps={yx}
      yRange={yRange}
      xAxisProps={xx}
      toolTipProps={tt}
    />
  );
});
