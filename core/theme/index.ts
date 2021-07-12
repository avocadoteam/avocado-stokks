import { extendTheme } from 'native-base';

export const lightTheme = extendTheme({
  colors: {
    primary: {
      50: '#34C075',
      100: '#34C075',
      200: '#34C075',
      300: '#34C075',
      400: '#34C075',
      500: '#34C075',
      600: '#34C075',
      700: '#34C075',
      800: '#34C075',
      900: '#34C075',
    },
    appBackground: '#fff',
    downBg: 'rgba(236, 55, 55, 0.05)',
    downTextColor: '#E75656',
    upBg: 'rgba(70, 200, 130, 0.05)',
    upTextColor: '#00A54C',
    heading: '#3C3C3C',
    headingSmall: '#000',
    text: '#242424',
    textGray: '#757575',
    textDarkGray: '#535353',
  },
});

export const darkTheme = extendTheme({
  colors: {
    primary: {
      50: '#03CF6D',
      100: '#03CF6D',
      200: '#03CF6D',
      300: '#03CF6D',
      400: '#03CF6D',
      500: '#03CF6D',
      600: '#03CF6D',
      700: '#03CF6D',
      800: '#03CF6D',
      900: '#03CF6D',
    },
    appBackground: '#212121',
    downBg: 'rgba(236, 55, 55, 0.15);',
    downTextColor: '#EC3737',
    upBg: 'rgba(3, 207, 109, 0.15)',
    upTextColor: '#03CF6D',
    heading: '#fff',
    headingSmall: 'rgba(255, 255, 255, 0.9)',
    text: 'rgba(255, 255, 255, 0.9)',
    textGray: '#AEAEAE',
    textDarkGray: 'rgba(255, 255, 255, 0.9);',
  },
});
