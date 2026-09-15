/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Test scenarios for general & helper functionality.
 *
 */

import { ConfigManager, getComputedProps } from '@utils';
import { LogicErrors } from '@fixtures';

describe('Test individual functions & helpers', () => {
  it('should load .env.test configurations', () => {
    const confMgr = ConfigManager.getInstance();

    expect(confMgr.getConfig()).toEqual({
      mode: 'test',
      showErrors: true,
      showErrorsInProd: false,
      showErrorsInPlace: true,
    });

    expect(confMgr.isShowErrors).toBeTruthy();
    expect(confMgr.isShowErrorsInPlace).toBeTruthy();

    expect(confMgr.getByKey('TRD_SHOW_ERRORS')).toBe('true');
    expect(confMgr.getByKey('TRD_SHOW_ERRORS_IN_PROD')).toBe('false');
    expect(confMgr.getByKey('TRD_SHOW_ERRORS_IN_PLACE')).toBe('true');
  });
});

describe('Test scenarios for getComputedProps', () => {
  const arr = ['a', 'b', 'c', 'd'];
  const arrayPass = (from: number | null, to: number | null, step: number | null) => ({
    over: arr,
    from,
    to,
    step,
    errors: [] as LogicErrors[],
  });
  const rangePass = (from: number | null, to: number | null, step: number | null) => ({
    over: null,
    from,
    to,
    step,
    errors: [] as LogicErrors[],
  });

  const err = (...errors: LogicErrors[]) => ({ over: null, from: null, to: null, step: null, errors });
  const malformed = () =>
    err(LogicErrors.MalformedLoop, LogicErrors.MalformedLoopParams, LogicErrors.MalformedLoopBounds);

  describe('Test scenarios when an array is present', () => {
    it('should render, if only array is present', () => {
      expect(getComputedProps({ over: arr })).toEqual(arrayPass(0, 3, 1));
    });

    it('should render, if array = [...] and step > 0', () => {
      expect(getComputedProps({ over: arr, step: 1 })).toEqual(arrayPass(0, 3, 1));
    });

    it('should render, if start/end is derived from a negative step', () => {
      expect(getComputedProps({ over: arr, step: -1 })).toEqual(arrayPass(3, 0, -1));
    });

    it('should render, if from is calculated from a positive to', () => {
      expect(getComputedProps({ over: arr, to: 2 })).toEqual(arrayPass(0, 2, 1));
    });

    it('should render, if to and step is within bounds', () => {
      expect(getComputedProps({ over: arr, to: 2, step: 1 })).toEqual(arrayPass(0, 2, 1));
    });

    it('should render, if deterministic conditions are met over array', () => {
      expect(getComputedProps({ over: arr, from: 2, step: 1 })).toEqual(arrayPass(2, 3, 1));
    });

    it('should not render, flags a reverse loop whose derived end equals the explicit from', () => {
      expect(getComputedProps({ over: arr, from: 0, step: -1 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
    });
  });

  it('should render, if params have positive corelation', () => {
    expect(getComputedProps({ over: arr, from: 1, to: 3 })).toEqual(arrayPass(1, 3, 1));
  });

  it('should render, if params have negative corelation', () => {
    expect(getComputedProps({ over: arr, from: 3, to: 1 })).toEqual(arrayPass(3, 1, -1));
  });

  // TODO: May need to consider indeterministic if to < from > rBound
  it('should render, if iterates from a given positive from', () => {
    expect(getComputedProps({ over: arr, from: 2 })).toEqual(arrayPass(2, 3, 1));
  });

  it('should not render, if step = 0, from and to = 0', () => {
    expect(getComputedProps({ over: arr, from: 0, to: 0, step: 0 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
  });

  it('should not render, if to is outside the array bounds', () => {
    expect(getComputedProps({ over: arr, to: -2 })).toEqual(malformed());
  });

  it('should not render, if to is beyond the array bounds', () => {
    expect(getComputedProps({ over: arr, to: 10 })).toEqual(malformed());
  });

  it('should not render, if indeterministic conditions met', () => {
    expect(getComputedProps({ over: arr, to: 2, step: -1 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
  });

  it('should not render, if indeterministic end condition to even with a matching step', () => {
    expect(getComputedProps({ over: arr, to: -2, step: -1 })).toEqual(malformed());
  });

  it('rejects a negative from', () => {
    expect(getComputedProps({ over: arr, from: -2 })).toEqual(malformed());
  });
  it('should not render, if the derived direction contradicts an upward step', () => {
    expect(getComputedProps({ over: arr, from: 4, step: 1 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
  });

  it('should not render, if negative from lBound over array', () => {
    expect(getComputedProps({ over: arr, from: -1, step: 1 })).toEqual(malformed());
  });

  it('should not render, rejects a negative from in a from/to pair', () => {
    expect(getComputedProps({ over: arr, from: -1, to: 3 })).toEqual(malformed());
  });

  it('accepts an explicit from/to/step triplet', () => {
    expect(getComputedProps({ over: arr, from: 1, to: 3, step: 1 })).toEqual(arrayPass(1, 3, 1));
  });

  it('accepts a descending from/to/step triplet', () => {
    expect(getComputedProps({ over: arr, from: 3, to: 0, step: -1 })).toEqual(arrayPass(3, 0, -1));
  });

  it('flags an infinite loop when the explicit step contradicts the range direction', () => {
    expect(getComputedProps({ over: arr, from: 1, to: 3, step: -1 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
  });

  it('flags a zero step over a non-empty range as an infinite loop', () => {
    expect(getComputedProps({ over: arr, from: 1, to: 3, step: 0 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
  });

  it('allows a to equal to the array length', () => {
    expect(getComputedProps({ over: arr, from: 1, to: 4, step: 1 })).toEqual(arrayPass(1, 4, 1));
  });

  it('rejects a negative from in a from/to/step triplet', () => {
    expect(getComputedProps({ over: arr, from: -2, to: 3, step: 1 })).toEqual(malformed());
  });

  it('rejects an empty over array', () => {
    expect(getComputedProps({ over: [] })).toEqual(err(LogicErrors.EmptyLoopSource));
  });

  it('flags a zero step over an empty range (from === to) as an infinite loop', () => {
    expect(getComputedProps({ over: arr, from: 2, to: 2, step: 0 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
  });

  describe('range (no over)', () => {
    it('accepts an explicit from/to/step triplet', () => {
      expect(getComputedProps({ from: 2, to: 5, step: 1 })).toEqual(rangePass(2, 5, 1));
    });

    it('accepts a descending negative range', () => {
      expect(getComputedProps({ from: -2, to: -5, step: -1 })).toEqual(rangePass(-2, -5, -1));
    });

    it('accepts an ascending negative range', () => {
      expect(getComputedProps({ from: -5, to: -2, step: 1 })).toEqual(rangePass(-5, -2, 1));
    });

    it('flags an infinite loop when the step contradicts the range direction', () => {
      expect(getComputedProps({ from: 5, to: 2, step: 1 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
    });

    it('flags a zero step over a non-empty range as an infinite loop', () => {
      expect(getComputedProps({ from: 2, to: 5, step: 0 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
    });

    it('rejects a range missing both to and step', () => {
      expect(getComputedProps({ from: 2 })).toEqual(malformed());
    });

    it('rejects a range missing to', () => {
      expect(getComputedProps({ from: 2, step: 1 })).toEqual(malformed());
    });

    it('accepts a range with an auto-derived step', () => {
      expect(getComputedProps({ from: 2, to: 5 })).toEqual(rangePass(2, 5, 1));
    });

    it('rejects a range with only a step', () => {
      expect(getComputedProps({ step: 1 })).toEqual(malformed());
    });

    it('rejects a range with no bounds at all', () => {
      expect(getComputedProps({})).toEqual(malformed());
    });

    it('rejects a range with only to (step cannot be determined)', () => {
      expect(getComputedProps({ to: 5 })).toEqual(malformed());
    });

    it('rejects a range with to + step but no from', () => {
      expect(getComputedProps({ to: 5, step: 1 })).toEqual(malformed());
    });

    it('accepts a range starting from 0', () => {
      expect(getComputedProps({ from: 0, to: 5, step: 1 })).toEqual(rangePass(0, 5, 1));
    });

    it('flags a zero step over an empty range (from === to) as an infinite loop', () => {
      expect(getComputedProps({ from: 2, to: 2, step: 0 })).toEqual(err(LogicErrors.InfiniteLoopCondition));
    });
  });
});
