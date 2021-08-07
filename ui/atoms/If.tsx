import { memo, PropsWithChildren, ReactNode } from 'react';
import React from 'react';

type Props = PropsWithChildren<{
  is: boolean;
  else?: ReactNode;
}>;

export const If = memo<Props>(props => (props.is ? <>{props.children}</> : props.else ? <>{props.else}</> : null));
