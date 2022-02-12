export const convertNumberToShortForm = (n: number) => {
  if (n < 100000) {
    return `${n}`;
  } else if (n < 1000000000) {
    return `${(n / 1000000).toFixed(2)}M`;
  } else {
    return `${(n / 1000000000).toFixed(2)}B`;
  }
};
