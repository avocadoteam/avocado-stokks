import { useDoubleClick } from 'core/hooks/useDoubleClick';
import { useScrollBarHandler } from 'core/hooks/useScrollBarHandler';
import * as shape from 'd3-shape';
import { Box, Flex, useTheme, Pressable } from 'native-base';
import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { AreaChart, Grid, LineChart } from 'react-native-svg-charts';
import { If } from 'ui/atoms/If';

type Props = {
  up: boolean;
  data: number[];
};

export const LineGraph = React.memo<Props>(({ data, up }) => {
  const { colors } = useTheme();
  const colorFill = up ? colors.upTextColor : colors.downTextColor;
  const colorFillSecondary = up ? colors.upTextSecondryColor : colors.downTextSecondaryColor;
  const { positionX, isTouched, touchCancelHandler, touchMoveHandler, touchEndHandler, touchStartHandler } =
    useScrollBarHandler(353);
  const sliceIndex = Math.floor((positionX / 353) * data.length);
  return (
    <Pressable
      onTouchEnd={touchEndHandler}
      onTouchCancel={touchCancelHandler}
      onTouchMove={touchMoveHandler}
      onTouchStart={touchStartHandler}
    >
      <Flex flexDirection={'row'}>
        <AreaChart
          curve={shape.curveLinear}
          svg={{
            stroke: colorFill,
            fillOpacity: 0,
          }}
          style={{ width: positionX, height: 260 }}
          data={data?.slice(0, sliceIndex).filter(d => typeof d === 'number') ?? []}
          contentInset={{ top: 20, bottom: 20, left: -1, right: -1 }}
        />
        <AreaChart
          curve={shape.curveLinear}
          svg={{
            stroke: colorFillSecondary,
            fillOpacity: 0,
          }}
          style={{ width: 353 - positionX, height: 260 }}
          data={data?.slice(sliceIndex).filter(d => typeof d === 'number') ?? []}
          contentInset={{ top: 20, bottom: 20, left: -1, right: -1 }}
        />
        <If is={isTouched} else={<></>}>
          <Box
            style={{
              zIndex: 1000,
              position: 'absolute',
              width: 2,
              height: 260,
              left: positionX,
              backgroundColor: colorFill,
            }}
          />
        </If>
      </Flex>
      <Box></Box>
    </Pressable>
  );
});
