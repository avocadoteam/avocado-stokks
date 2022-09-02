import { HistoryPeriodTarget } from '@models';
import { useScrollBarHandler } from 'core/hooks/useScrollBarHandler';
import { stockActions } from 'core/modules/stock/reducer';
import * as shape from 'd3-shape';
import { Box, Pressable, useTheme } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AreaChart } from 'react-native-svg-charts';
import { useDispatch } from 'react-redux';
import { If } from 'ui/atoms/If';
import { TimeBox } from './TimeBox';

type Props = {
  up: boolean;
  target: HistoryPeriodTarget;
  timestamps: number[];
  data: number[];
};

export const LineGraph = React.memo<Props>(({ data, up, target, timestamps }) => {
  const { colors } = useTheme();
  const width = 353;
  const height = 260;
  const graphData = data?.filter(d => typeof d === 'number') ?? [];
  const colorFill = up ? colors.upTextColor : colors.downTextColor;
  const colorFillSecondary = up ? colors.upTextSecondaryColor : colors.downTextSecondaryColor;
  const { positionX, isTouched, touchMoveHandler, touchEndHandler, touchCancelHandler, touchStartHandler } =
    useScrollBarHandler(width);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stockActions.setGraphTouched(isTouched));
  }, [isTouched]);

  return (
    <Pressable
      onTouchEnd={touchEndHandler}
      onTouchCancel={touchCancelHandler}
      onTouchMove={touchMoveHandler}
      onTouchStart={touchStartHandler}
    >
      <Box style={{ width, height, position: 'relative' }}>
        <Box style={{ width: positionX, overflow: 'hidden' }}>
          <AreaChart
            curve={shape.curveLinear}
            svg={{
              stroke: colorFill,
              fillOpacity: 0,
              strokeWidth: 2,
            }}
            style={{ width, height }}
            data={graphData}
            contentInset={{ top: 20, bottom: 20, left: -1, right: -1 }}
            animate
          />
        </Box>
        <Box style={{ width, zIndex: -1, position: 'relative', bottom: height }}>
          <AreaChart
            curve={shape.curveLinear}
            svg={{
              stroke: colorFillSecondary,
              fillOpacity: 0,
              strokeWidth: 2,
            }}
            style={{ width, height }}
            data={graphData}
            contentInset={{ top: 20, bottom: 20, left: -1, right: -1 }}
          />
        </Box>
        <If is={isTouched}>
          <Box
            style={{
              ...styles.scrollBar,
              left: positionX,
              height,
              backgroundColor: colorFill,
            }}
          />
          <Box style={styles.timeBox}>
            <TimeBox colorBar={colorFillSecondary} timestamps={timestamps} width={width} rule={target} />
          </Box>
        </If>
      </Box>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  scrollBar: {
    zIndex: 1000,
    position: 'absolute',
    width: 2,
  },
  timeBox: {
    position: 'absolute',
    left: 0,
  },
});
