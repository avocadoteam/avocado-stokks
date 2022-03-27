import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Flex, useTheme, Text as NativeText } from 'native-base';
import { HistoryPeriodTarget } from '@models';
import moment from 'moment';
import { If } from 'ui/atoms/If';

type Props = {
  colorBar: string;
  rule: HistoryPeriodTarget;
  width: number;
  timestamps: number[];
};

export const TimeBox = React.memo<Props>(({ rule, width, timestamps, colorBar }) => {
  const elements = timestampsToElements(timestamps, rule, colorBar, width);
  return <Flex flexDirection={'row'}>{elements}</Flex>;
});

const timestampsToElements = (
  timestamps: number[],
  rule: HistoryPeriodTarget,
  colorBar: string,
  width: number,
  limit = 5,
) => {
  const { colors } = useTheme();
  let densityTimestamps: { t: string; c: number }[] = [];
  timestamps.forEach(t => {
    const dt = moment(new Date(t * 1000)).format(ruleToMomentType(rule));
    if (densityTimestamps.some(d => d.t === dt)) {
      densityTimestamps.filter(d => d.t === dt)[0].c++;
    } else {
      densityTimestamps.push({ t: dt, c: 1 });
    }
  });

  const resultTimestamps: { t: string; w: number }[] = densityTimestamps.map(d => ({
    ...d,
    w: (d.c / timestamps.length) * width,
  }));

  const step = Math.ceil(resultTimestamps.length / limit);
  let reduceResultTimestamps: { t: string; w: number }[] = [];
  resultTimestamps.forEach((r, index) => {
    if (index % step === 0) {
      reduceResultTimestamps.push(r);
    } else {
      reduceResultTimestamps[Math.floor(index / step)].w = reduceResultTimestamps[Math.floor(index / step)].w + r.w;
    }
  });
  return reduceResultTimestamps.map(r => (
    <Box>
      <Box alignItems={'center'} key={r.t} style={{ width: Math.floor(r.w) }}>
        <Box
          alignItems={'center'}
          key={r.t}
          style={{
            ...styles.bar,
            backgroundColor: colorBar,
          }}
        ></Box>
        <NativeText color={colors.textGray} fontSize={14}>
          {r.t}
          <If is={rule === HistoryPeriodTarget.Day}>:00</If>
        </NativeText>
      </Box>
    </Box>
  ));
};

const ruleToMomentType = (rule: HistoryPeriodTarget) => {
  switch (rule) {
    case HistoryPeriodTarget.Day:
      return 'HH';
    case HistoryPeriodTarget.Week:
      return 'DD';
    case HistoryPeriodTarget.Month:
      return 'MM';
    case HistoryPeriodTarget.Year:
      return 'MM';
    case HistoryPeriodTarget.FiveYears:
      return 'YYYY';
    case HistoryPeriodTarget.TenYears:
      return 'YYYY';
  }
};

const styles = StyleSheet.create({
  bar: {
    zIndex: -1000,
    width: 1,
    height: 260,
  },
});
