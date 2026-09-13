import { Directives } from '@fixtures';
import { useValidationFactory } from '@hooks';
import { DataShape, LoopProps } from '@types';
import { getComputedProps, getErrors } from '@utils';
import { cloneElement } from 'react';

export const useLoop = <T extends DataShape>(props: LoopProps<T>, keyPrefix = 'trd-template') => {
  const { over, from, to, step } = getComputedProps(props);

  const { children } = props;

  const computedProps: LoopProps<T> = { over, from, to, step, children };
  const ch = [];

  const errors = useValidationFactory<LoopProps<T>>(computedProps, Directives.Loop);

  if (errors.length) return getErrors(errors);

  // calculate if 'i' should be greater than or equal to 'to' or less than or equal to 'to'
  // depending on 'from', 'to' and step

  for (let i = from; step! > 0 ? i! <= to! : i! >= to!; i! += step!) {
    ch.push(
      cloneElement<{ data: T | number; index: number }>(children as any, {
        key: `${keyPrefix}-${i}`,
        data: over?.[i!] ?? i,
        index: i,
      }),
    );
  }

  return ch;
};
