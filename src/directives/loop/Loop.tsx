import { Errors } from '@components';
import { Directives, LogicErrors } from '@fixtures';
import { useValidate } from '@hooks';
import { DataShape } from '@types';
import { cloneElement, createElement, PropsWithChildren } from 'react';

export type LoopDataShape<T extends DataShape> = {
  from?: number;
  to?: number;
  step?: number;
  over?: T[];
};
export type LoopProps<T extends DataShape> = PropsWithChildren<LoopDataShape<T>>;

const getComputedProps = <T extends DataShape>({ over, from, to, step }: LoopProps<T>) => {
  const _over = over;
  const _last = _over?.length ? _over.length - 1 : (to ?? 0);

  let _from = Math.max(0, Math.min(from ?? 0, _last));
  let _to = Math.max(0, Math.min(to ?? _last, _last));
  const _step = step ?? (_from < _to ? 1 : -1);

  if ((_step > 0 && _from > _to) || (_step < 0 && _from < _to)) {
    [_from, _to] = [_to, _from];
  }

  return { over: _over, from: _from, to: _to, step: _step };
};

const useValidateProps = <T extends DataShape>(props: LoopProps<T>) => {
  const { to, from, over, step } = props;
  const errors = [];

  if (over === undefined && from === undefined && to === undefined && step === undefined) {
    errors.push(LogicErrors.MalformedLoop);
  } else if (over?.length === 0) {
    errors.push(LogicErrors.EmptyLoopSource);
  } else if (from === undefined && to === undefined && !over) {
    errors.push(LogicErrors.MalformedLoop);
  } else if (from !== undefined && to !== undefined && step !== undefined) {
    if (from < 0 || to < 0) {
      errors.push(LogicErrors.MalformedLoop);
    }
    if ((from <= to && step <= 0) || (from >= to && step >= 0)) {
      errors.push(LogicErrors.MalformedLoop, LogicErrors.InfiniteLoopCondition);
    }
  }
  return errors;
};

const useLoop = <T extends DataShape>(props: LoopProps<T>) => {
  const { over, from, to, step } = getComputedProps(props);

  const { children } = props;
  const computedProps: LoopProps<T> = { over, from, to, step, children };

  const propErrors = useValidateProps(props);
  const computeErrors = useValidate(computedProps, Directives.Loop);
  const errors = [...propErrors, ...computeErrors];

  let ch;

  if (errors.length) {
    ch = createElement(Errors, { errors });
  } else {
    ch = [];
    // calculate if 'i' should be greater than or equal to 'to' or less than or equal to 'to'
    // depending on 'from', 'to' and step

    for (let i = from; step > 0 ? i <= to : i >= to; i += step) {
      ch.push(
        cloneElement<{ data: T | number; index: number }>(children as any, {
          key: `trd-template-${i}`,
          data: over?.[i] ?? i,
          index: i,
        }),
      );
    }
  }

  return { children: ch };
};

const Loop = <T extends DataShape = any>(props: LoopProps<T>) => {
  const { children } = useLoop(props);

  return children;
};

Loop.displayName = Directives.Loop;

export default Loop;
