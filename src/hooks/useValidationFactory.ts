import { ValidationFactory } from '@utils';
import { PropsWithChildren, useMemo } from 'react';

export const useValidationFactory = <T>(props: PropsWithChildren<T>, name: string) => {
  const validatorFn = useMemo(() => ValidationFactory.get(name), [name]);

  return validatorFn(props);
};
