import { Children, PropsWithChildren, ReactNode, useMemo } from 'react';
import { ValidationFactory } from '../utils';

export const useValidate = <T extends ReactNode>(props: PropsWithChildren<T>, name: string) => {
  const { children } = props;

  const _children = Children.toArray(children);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ValidationFactory.get(name)(_children), [_children]);
};
