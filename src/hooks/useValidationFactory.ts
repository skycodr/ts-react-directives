import { ValidationFactory } from '@utils';
import { Children, PropsWithChildren, useMemo } from 'react';

export const useValidationFactory = (props: PropsWithChildren, name: string) => {
  const { children } = props;
  const _children = Children.toArray(children);
  const validatorFn = useMemo(() => ValidationFactory.get(name), [name]);

  return validatorFn(_children, props);
};
