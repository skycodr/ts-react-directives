import { ConfigManager, getComputedProps } from '@utils';

describe('Test individual functions', () => {
  test('should load .env.test configurations', () => {
    const confMgr = ConfigManager.getInstance();

    expect(confMgr.getConfig()).toEqual({
      mode: 'test',
      showErrors: true,
      showErrorsInProd: false,
      showErrorsInPlace: true,
    });

    expect(confMgr.isShowErrors).toBeTruthy();
    expect(confMgr.isShowErrorsInPlace).toBeTruthy();

    expect(confMgr.getByKey('VITE_TRD_SHOW_ERRORS')).toBe('true');
    expect(confMgr.getByKey('VITE_TRD_SHOW_ERRORS_IN_PROD')).toBe('false');
    expect(confMgr.getByKey('VITE_TRD_SHOW_ERRORS_IN_PLACE')).toBe('true');
  });

  test('should calculate the getComputedProps(), correct values, for all params', () => {
    const arr = ['1', '2', '3', '4'];
    const computedProps = getComputedProps({ from: 0, to: 10, step: 1, over: arr });
    expect(computedProps).toEqual({
      from: 0,
      to: 3,
      step: 1,
      over: arr,
    });
  });

  test('should calculate the getComputedProps(), correct values, for step, over, to params', () => {
    const arr = ['1', '2', '3', '4'];
    const computedProps = getComputedProps({ to: 10, step: 1, over: arr });

    expect(computedProps).toEqual({
      from: 0,
      to: 3,
      step: 1,
      over: arr,
    });
  });

  test('should calculate the getComputedProps(), correct values, for step, over, from params', () => {
    const arr = ['1', '2', '3', '4'];
    const computedProps = getComputedProps({ from: -1, step: 1, over: arr });

    expect(computedProps).toEqual({
      from: 0,
      to: 3,
      step: 1,
      over: arr,
    });
  });

  test('should calculate the getComputedProps(), correct values, for step, over, params', () => {
    const arr = ['1', '2', '3', '4'];
    const computedProps = getComputedProps({ step: 1, over: arr });
    expect(computedProps).toEqual({
      from: 0,
      to: 3,
      step: 1,
      over: arr,
    });
  });

  test('should calculate the getComputedProps(), correct values, for over params', () => {
    const arr = ['1', '2', '3', '4'];
    const computedProps = getComputedProps({ over: arr });
    expect(computedProps).toEqual({
      from: 0,
      to: 3,
      step: 1,
      over: arr,
    });
  });

  test('should calculate the getComputedProps(), correct values, for to, from, step  params', () => {
    const computedProps = getComputedProps({ from: 0, to: 10, step: 1 });

    expect(computedProps).toEqual({
      from: 0,
      to: 10,
      step: 1,
      over: undefined,
    });
  });

  test('should calculate the getComputedProps(), correct values, for to, from, params', () => {
    const computedProps = getComputedProps({ from: 0, to: 10 });

    expect(computedProps).toEqual({
      from: 0,
      to: 10,
      step: 1,
      over: undefined,
    });
  });

  test('should calculate the getComputedProps(), correct values, for to, from, params', () => {
    const computedProps = getComputedProps({ from: 0, to: 10, step: 2 });

    expect(computedProps).toEqual({
      from: 0,
      to: 10,
      step: 2,
      over: undefined,
    });
  });

  test('should calculate the getComputedProps(), correct values, for step, params', () => {
    const computedProps = getComputedProps({ step: 2 });

    expect(computedProps).toEqual({
      from: 0,
      to: 0,
      step: 2,
      over: undefined,
    });
  });

  test('should calculate the getComputedProps(), correct values, for from < 0, to to = 0', () => {
    const computedProps = getComputedProps({ from: -10, to: -1 });

    expect(computedProps).toEqual({
      from: -10,
      to: -1,
      step: 1,
      over: undefined,
    });
  });
});
