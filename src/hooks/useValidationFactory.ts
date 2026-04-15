import { ValidationFactory } from '@utils';
import { Children, PropsWithChildren, useMemo } from 'react';

export const useValidationFactory = <T = any>(props: PropsWithChildren<T>, name: string) => {
  const { children } = props;
  const _children = Children.toArray(children);
  const validatorFn = useMemo(() => ValidationFactory.get(name), [name]);

  return validatorFn(_children, props);
};
