/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Hook to compute the loop parameters based on the provided props. It retrieves the appropriate validator function
 * from the ValidationFactory and applies it to the provided props.
 *
 */

import { Directives } from '@fixtures';
import { useValidationFactory } from '@hooks';
import { DataShape, LoopComputedShape, LoopProps } from '@types';
import { getComputedProps, getErrors } from '@utils';
import { cloneElement, useId } from 'react';

export const useLoop = <T extends DataShape>(props: LoopProps<T>) => {
  const id = useId();

  const { over, from, to, step, errors: propErrors } = getComputedProps(props);

  const { children } = props;

  const ch = [];

  const errors = useValidationFactory<LoopComputedShape<T>>(
    {
      over,
      from,
      to,
      step,
      children,
      errors: propErrors,
    },
    Directives.Loop,
  );

  if (errors.length) return getErrors(errors);

  // calculate if 'i' should be greater than or equal to 'to' or less than or equal to 'to'
  // depending on 'from', 'to' and step

  for (let i = from; step! > 0 ? i! <= to! : i! >= to!; i! += step!) {
    ch.push(
      cloneElement<{ data: T | number; index: number }>(children as any, {
        key: `${id}-${i}`,
        data: over?.[i!] ?? i!,
        index: i!,
      }),
    );
  }

  return ch;
};
