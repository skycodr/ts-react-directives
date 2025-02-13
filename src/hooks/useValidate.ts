import { Children, PropsWithChildren, ReactNode } from 'react';
import { ValidationFactory } from '../utils';

export const useValidate = <T extends ReactNode>(props: PropsWithChildren<T>, name: string) => {
  const { children } = props;
  const _children = Children.toArray(children);

  return ValidationFactory.get(name)(_children);
};
