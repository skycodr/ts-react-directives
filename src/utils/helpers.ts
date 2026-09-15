/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Helper methods for the library.
 *
 */

import { Errors } from '@components';

import { LogicErrors } from '@fixtures';
import { DataShape, LoopComputedShape, LoopProps } from '@types';
import { ConfigManager } from '@utils';

import { createElement, FunctionComponent, isValidElement, NamedExoticComponent, ReactElement } from 'react';

/**
 * Create error components for the given errors if showErrors and showErrorsInPlace are true.
 *
 *
 * @param errors Array of errors to be rendered.
 * @returns An Error component with the errors if showErrors and showErrorsInPlace are true, otherwise null.
 */
export const getErrors = (errors: LogicErrors[]) => {
  if (errors.length) {
    const { isShowErrors, isShowErrorsInPlace } = ConfigManager.getInstance();
    let ch = null;

    if (isShowErrors && isShowErrorsInPlace) ch = createElement(Errors, { errors });

    return ch;
  }
};

/**
 * Conditional elements to be rendered.
 *
 * WARNING!! DO NOT use this function, internal use only. This function is used by the If, ElseIf and Else components to determine which element to render.
 *
 * @param elements Array of react elements. Namely If, ElseIf, Else
 * @returns Returns the first element that has a true condition, or the Else element if present, otherwise null.
 */
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

/**
 * A helper function to compute the loop parameters based on the provided props.
 *
 * WARNING!! DO NOT use this function, internal use only. This function is used by the useLoop hook to compute the loop parameters.
 *
 * TODO: Might be able to optimize this in the future.
 *
 * @param props LoopProps<T> object containing the loop parameters: over, from, to, step
 *
 * @returns Computed props
 */
export const getComputedProps = <T extends DataShape>({ over, from, to, step }: LoopProps<T>): LoopComputedShape<T> => {
  let _over = over ?? null;
  const hasOver = _over !== null;
  const lastIndex = hasOver ? _over!.length - 1 : null;

  // from | to | step combinations are resolved differently depending on whether we
  // iterate over an array ('over') or a numeric range. A missing from/to means the
  // prop is undefined, so explicit zeros are real values. A missing step is falsy, and
  // a zero step is always invalid: a loop with step 0 can never advance and would run
  // forever. When the step is omitted it is derived from the range direction.
  const missingFromValue = from === undefined;
  const missingToValue = to === undefined;
  const missingStepValue = !step;

  let _from: number | null = null;
  let _to: number | null = null;
  let _step: number | null = null;
  let _errors: LogicErrors[] = [];

  if (step === 0) {
    // explicitly check for zero step, which is invalid
    _errors = [LogicErrors.InfiniteLoopCondition];
  } else if (hasOver) {
    // Over an array, from/to default to the array bounds and step defaults to the direction
    if (_over?.length === 0) {
      _errors = [LogicErrors.EmptyLoopSource];
    } else if (missingFromValue && missingToValue) {
      if (missingStepValue) {
        _from = 0;
        _to = lastIndex!;
        _step = 1;
      } else {
        _step = step;
        _from = _step! > 0 ? 0 : lastIndex!;
        _to = _step! > 0 ? lastIndex! : 0;
      }
    } else if (missingFromValue) {
      _from = to! > 0 ? 0 : lastIndex!;
      _to = to!;
      if (missingStepValue) {
        _step = to! > 0 ? 1 : -1;
      } else {
        _step = step;
        if (Math.sign(_to - _from) !== Math.sign(_step!)) {
          _errors = [LogicErrors.InfiniteLoopCondition];
        }
      }
    } else if (missingToValue) {
      _from = from!;
      if (missingStepValue) {
        _to = from! > 0 ? lastIndex! : 0;
        _step = from! > 0 ? 1 : -1;
      } else {
        _step = step;
        _to = _step! > 0 ? lastIndex! : 0;
        if (Math.sign(_to - _from) !== Math.sign(_step!)) {
          _errors = [LogicErrors.InfiniteLoopCondition];
        }
      }
    } else {
      _from = from!;
      _to = to!;
      if (missingStepValue) {
        _step = _to >= _from ? 1 : -1;
      } else {
        _step = step;
        if (Math.sign(_to - _from) !== Math.sign(_step!)) {
          _errors = [LogicErrors.InfiniteLoopCondition];
        }
      }
    }
  } else {
    // Numeric range: from and to are required; the step defaults to the range direction
    if (missingFromValue && missingToValue && missingStepValue) {
      _errors = [LogicErrors.MalformedLoop, LogicErrors.MalformedLoopParams, LogicErrors.MalformedLoopBounds];
    } else if (missingFromValue && missingToValue) {
      // Step only
      _errors = [LogicErrors.MalformedLoop, LogicErrors.MalformedLoopParams, LogicErrors.MalformedLoopBounds];
    } else if (missingFromValue && missingStepValue) {
      // To only, the step cannot be determined
      _errors = [LogicErrors.MalformedLoop, LogicErrors.MalformedLoopParams, LogicErrors.MalformedLoopBounds];
    } else if (missingFromValue) {
      // To + step without from: indeterminate start, left as null
      _errors = [LogicErrors.MalformedLoop, LogicErrors.MalformedLoopParams, LogicErrors.MalformedLoopBounds];
    } else if (missingToValue) {
      // removed check condition: /* && missingStepValue */
      _errors = [LogicErrors.MalformedLoop, LogicErrors.MalformedLoopParams, LogicErrors.MalformedLoopBounds];
    } else {
      _from = from!;
      _to = to!;
      _step = step ? step : _to - _from > 0 ? 1 : -1;

      if (Math.sign(_to - _from) !== Math.sign(_step!)) {
        _errors = [LogicErrors.InfiniteLoopCondition];
      }
    }
  }

  // Bound checks for from and to against the array length
  if (_over && (_from! < 0 || _from! > _over!.length || _to! < 0 || _to! > _over!.length)) {
    _errors = [LogicErrors.MalformedLoop, LogicErrors.MalformedLoopParams, LogicErrors.MalformedLoopBounds];
  }

  if (_errors.length) {
    _over = _from = _to = _step = null;
  }

  return { over: _over, from: _from, to: _to, step: _step, errors: _errors };
};
