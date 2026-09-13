import { Errors } from '@components';

import { LogicErrors } from '@fixtures';
import { DataShape, LoopDataShape, LoopProps } from '@types';
import { ConfigManager } from '@utils';

import { createElement, FunctionComponent, isValidElement, NamedExoticComponent, ReactElement } from 'react';

export const getErrors = (errors: LogicErrors[]) => {
  if (errors.length) {
    const { isShowErrors, isShowErrorsInPlace } = ConfigManager.getInstance();
    let ch = null;

    if (isShowErrors && isShowErrorsInPlace) ch = createElement(Errors, { errors });

    return ch;
  }
};

export const getElementRenderer = (elements: ReactElement[]) => {
  for (const element of elements) {
    if (!element || !isValidElement(element)) continue;

    const { displayName } = element.type as NamedExoticComponent | FunctionComponent;

    if (displayName) {
      const { condition } = element.props as { condition: boolean };

      if ((displayName === 'If' || displayName === 'ElseIf') && condition === true) return element;

      if (displayName === 'Else') return element;
    }
  }

  return null;
};

export const getComputedProps = <T extends DataShape>({ over, from, to, step }: LoopProps<T>): LoopDataShape<T> => {
  const _over = over;
  const _last = _over?.length ? _over.length - 1 : (to ?? 0);

  let _to = to ?? _last;
  let _from = from ?? 0;

  let _step = step;

  // Depending on the direction of _to relative to _from, the default step is either 1 or -1
  if (_step === undefined) {
    _step = _from < _to ? 1 : -1;
  } else {
    if ((_step > 0 && _from > _to) || (_step < 0 && _from < _to)) {
      [_from, _to] = [_to, _from];
    }
    // else if();
  }

  _from = Math.max(0, Math.min(from ?? 0, _last));
  _to = Math.max(0, Math.min(to ?? _last, _last));

  _step = step ?? (_from < _to ? 1 : -1);

  if ((_step > 0 && _from > _to) || (_step < 0 && _from < _to)) {
    [_from, _to] = [_to, _from];
  }

  return { over: _over, from: _from, to: _to, step: _step };
};
