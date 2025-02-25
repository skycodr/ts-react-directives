import { ValidationFactory } from '@utils';
import { Children, PropsWithChildren } from 'react';

export const useValidate = (props: PropsWithChildren, name: string) => {
  const { children } = props;
  const _children = Children.toArray(children);

  return ValidationFactory.get(name)(_children);
};
