import { Theme } from 'core/theme';
import * as NB from 'native-base';

declare module 'native-base' {
  export declare function useTheme<T extends Theme>(): T;
}
