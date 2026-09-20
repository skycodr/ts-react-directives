/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Hook to compute the loop parameters based on the provided props. It retrieves the appropriate validator function
 * from the ValidationFactory and applies it to the provided props.
 *
 */

import { Directives } from '@fixtures';
import { useValidationFactory } from '@hooks';
import { DataShape, LoopProps, LoopRenderElement, LoopRenderFunction } from '@types';
import { getComputedProps, getErrors } from '@utils';
import { cloneElement, createElement, Fragment, ReactNode, useId } from 'react';

export const useLoop = <T extends DataShape, P extends {} = {}>(props: LoopProps<T>) => {
  const id = useId();

  const { over, from, to, step, errors: propErrors } = getComputedProps(props);

  const { children } = props;

  const ch = [];

  const errors = useValidationFactory<LoopProps<T>>(
    {
      over,
      from,
      to,
      step,
      children: children as ReactNode,
      errors: propErrors,
    },
    Directives.Loop,
  );

  if (errors.length) return getErrors(errors);

  const renderFn: LoopRenderFunction<T> | undefined =
    typeof children === 'function' ? (children as LoopRenderFunction<T>) : undefined;

  // calculate if 'i' should be greater than or equal to 'to' or less than or equal to 'to' depending on
  // 'from', 'to' and step

  for (let i = from; step! > 0 ? i! <= to! : i! >= to!; i! += step!) {
    const key = `${id}-${i}`;
    const data: T = (over?.[i!] ?? i!) as unknown as T;
    const index: number = i!;

    if (renderFn) {
      ch.push(createElement(Fragment, { key, children: renderFn({ data, index }) }));
    } else {
      ch.push(
        // @ts-expect-error props may be present
        cloneElement<LoopRenderElement<T, P>>(children as any, { key, data, index, ...((children.props ?? {}) as P) }),
      );
    }
  }

  return ch;
};
