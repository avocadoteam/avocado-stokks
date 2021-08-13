import { HistoryPeriodTarget } from '@models';

export const periods: ['D', 'W', 'M', 'Y', '5Y', '10Y'] = ['D', 'W', 'M', 'Y', '5Y', '10Y'];
export const targets = {
  D: HistoryPeriodTarget.Day,
  W: HistoryPeriodTarget.Week,
  M: HistoryPeriodTarget.Month,
  Y: HistoryPeriodTarget.Year,
  '5Y': HistoryPeriodTarget.FiveYears,
  '10Y': HistoryPeriodTarget.TenYears,
};
