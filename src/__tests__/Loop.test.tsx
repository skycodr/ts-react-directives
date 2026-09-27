/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Test scenarios for Loop directives.
 *
 */
import { Loop } from '@directives';
import { ERRORS, LogicErrors } from '@fixtures';
import { render } from '@testing-library/react';
import { DataShape, IteratorParams, IteratorProps, LoopDataShape } from '@types';
import { FC, ReactElement } from 'react';
import { vi } from 'vitest';

describe('Test scenarios for <Loop>', () => {
  const num_arr = [1, 3, 5, 7];
  const chr_arr = ['a', 'b', 'c', 'd', 'e'];

  function getComponent<T extends DataShape>(props: LoopDataShape<T>): ReturnType<typeof render> {
    return render(<Loop {...props}>{({ data, index: _i }) => <span>{data as unknown as ReactElement}</span>}</Loop>);
  }

  describe('Test suites for iterating over an array, successfully', () => {
    function assertSuccess<T extends DataShape>(props: LoopDataShape<T>) {
      const end = props.over?.length ?? -1;
      const { getByText } = getComponent(props);
      for (let i = 0; i < end; i++) {
        const data = props.over?.[i] as string;
        expect(getByText(data)).toBeInTheDocument();
      }
    }

    it('should render, if a valid array is provided', () => {
      assertSuccess<number>({ over: num_arr });
    });

    it('should render, if an array and boundary are provided', () => {
      assertSuccess<string>({ over: chr_arr, from: 0, to: chr_arr.length });
    });

    it('should render, if array and from and to are provided where from > to', () => {
      assertSuccess<string>({ over: chr_arr, from: chr_arr.length, to: 0 });
    });

    it('should render, if all parameters are provided (ascendent), correctly', () => {
      assertSuccess<string>({ over: chr_arr, from: 0, to: chr_arr.length, step: 1 });
    });

    it('should render, if all parameters are provided (descendent), correctly', () => {
      assertSuccess<string>({ over: chr_arr, from: chr_arr.length, to: 0, step: -1 });
    });

    it('should render, if no array and to and from is (ascendant numeric range) provided', () => {
      assertSuccess<number>({ from: 1, to: 10, step: 1 });
    });
  });

  describe('Test suite for iterating over numeric range, successfully', () => {
    function assertSuccess<T extends DataShape>(props: LoopDataShape<T>) {
      const from = props.from ?? 0;
      const to = props.to ?? 0;
      const step = props.step ? props.step : to - from >= 0 ? 1 : -1;

      const { getByText } = getComponent(props);

      for (let i = from; step > 0 ? i <= to : i >= to; i += step) {
        expect(getByText(i)).toBeInTheDocument();
      }
    }

    it('should render, if no array and from and to is (descendent numeric range) provided', () => {
      assertSuccess({ from: 7, to: 2, step: -1 });
    });

    it('should render, if negative to positive range is given (ascending numeric range)', () => {
      /* Note: This test should be serving the step value not provided as well */
      assertSuccess({ from: -10, to: 10 });
    });

    it('should render, if negative to positive range is given (descending numeric range)', () => {
      assertSuccess({ from: 10, to: -5 });
    });
  });

  describe('Test suite for breaking out of a loop with breakOn', () => {
    const arr = [10, 20, 30, 40, 50];

    it('should stop the loop on the item that matches, and not render it', () => {
      const { queryByText } = render(
        <Loop<number> over={arr} breakOn={({ data }) => data === 30}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(queryByText('10')).toBeInTheDocument();
      expect(queryByText('20')).toBeInTheDocument();
      expect(queryByText('30')).toBeNull();
      expect(queryByText('40')).toBeNull();
      expect(queryByText('50')).toBeNull();
    });

    it('should render nothing, if the very first item matches', () => {
      const { queryByText } = render(
        <Loop<number> over={arr} breakOn={({ index }) => index === 0}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      arr.forEach((data) => expect(queryByText(String(data))).toBeNull());
    });

    it('should render every item, if breakOn never matches', () => {
      const { getByText } = render(
        <Loop<number> over={arr} breakOn={() => false}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      arr.forEach((data) => expect(getByText(String(data))).toBeInTheDocument());
    });

    it('should render all but the last item, if the last item matches', () => {
      const { getByText, queryByText } = render(
        <Loop<number> over={arr} breakOn={({ data }) => data === 50}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(getByText('10')).toBeInTheDocument();
      expect(getByText('40')).toBeInTheDocument();
      expect(queryByText('50')).toBeNull();
    });

    it('should receive the item and its index, and stop being called once it breaks', () => {
      const breakOn = vi.fn(({ data }: IteratorParams<number>) => data === 30);

      render(
        <Loop<number> over={arr} breakOn={breakOn}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(breakOn).toHaveBeenCalledTimes(3);
      expect(breakOn).toHaveBeenNthCalledWith(1, { data: 10, index: 0 });
      expect(breakOn).toHaveBeenNthCalledWith(2, { data: 20, index: 1 });
      expect(breakOn).toHaveBeenNthCalledWith(3, { data: 30, index: 2 });
    });

    it('should break on a descending loop, where the index counts down', () => {
      const { getByText, queryByText } = render(
        <Loop<string> over={chr_arr} step={-1} breakOn={({ index }) => index === 2}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(getByText('e')).toBeInTheDocument();
      expect(getByText('d')).toBeInTheDocument();
      expect(queryByText('c')).toBeNull();
      expect(queryByText('b')).toBeNull();
      expect(queryByText('a')).toBeNull();
    });

    it('should break a numeric range without an array', () => {
      const { getByText, queryByText } = render(
        <Loop<number> from={1} to={10} breakOn={({ data }) => data > 5}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      [1, 2, 3, 4, 5].forEach((data) => expect(getByText(String(data))).toBeInTheDocument());
      [6, 7, 8, 9, 10].forEach((data) => expect(queryByText(String(data))).toBeNull());
    });

    it('should break a loop whose child is a render element', () => {
      const Item: FC<IteratorProps<number>> = ({ data }) => <span>{data}</span>;

      const { getByText, queryByText } = render(
        <Loop<number> over={arr} breakOn={({ data }) => data === 30}>
          <Item />
        </Loop>,
      );

      expect(getByText('10')).toBeInTheDocument();
      expect(getByText('20')).toBeInTheDocument();
      expect(queryByText('30')).toBeNull();
      expect(queryByText('40')).toBeNull();
    });

    it('should report the loop errors instead of breaking, if the loop is malformed', () => {
      const breakOn = vi.fn(() => true);

      const { getByText } = render(
        <Loop<number> over={[1, 2, 3]} from={0} to={5} breakOn={breakOn}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(getByText(ERRORS[LogicErrors.MalformedLoop])).toBeInTheDocument();
      expect(breakOn).not.toHaveBeenCalled();
    });
  });

  describe('Test suite for skipping iterations with continueOn', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it('should skip the matching items and render the rest', () => {
      const { getByText, queryByText } = render(
        <Loop<number> over={arr} continueOn={({ data }) => data % 2 === 0}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      [1, 3, 5, 7, 9].forEach((data) => expect(getByText(String(data))).toBeInTheDocument());
      [2, 4, 6, 8, 10].forEach((data) => expect(queryByText(String(data))).toBeNull());
    });

    it('should render nothing, if every item matches', () => {
      const { queryByText } = render(
        <Loop<number> over={arr} continueOn={() => true}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      arr.forEach((data) => expect(queryByText(String(data))).toBeNull());
    });

    it('should render every item, if continueOn never matches', () => {
      const { getByText } = render(
        <Loop<number> over={arr} continueOn={() => false}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      arr.forEach((data) => expect(getByText(String(data))).toBeInTheDocument());
    });

    it('should receive the item and its index for every iteration, including the skipped ones', () => {
      const continueOn = vi.fn(({ data }: IteratorParams<number>) => data === 2);

      render(
        <Loop<number> over={arr} continueOn={continueOn}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(continueOn).toHaveBeenCalledTimes(arr.length);
      expect(continueOn).toHaveBeenNthCalledWith(2, { data: 2, index: 1 });
      expect(continueOn).toHaveBeenLastCalledWith({ data: 10, index: 9 });
    });

    it('should skip items of a numeric range without an array', () => {
      const { getByText, queryByText } = render(
        <Loop<number> from={1} to={5} continueOn={({ data }) => data === 3}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      [1, 2, 4, 5].forEach((data) => expect(getByText(String(data))).toBeInTheDocument());
      expect(queryByText('3')).toBeNull();
    });

    it('should skip items of a loop whose child is a render element', () => {
      const Item: FC<IteratorProps<number>> = ({ data }) => <span>{data}</span>;

      const { getByText, queryByText } = render(
        <Loop<number> over={arr} continueOn={({ index }) => index < 3}>
          <Item />
        </Loop>,
      );

      [4, 5, 6, 7, 8, 9, 10].forEach((data) => expect(getByText(String(data))).toBeInTheDocument());
      [1, 2, 3].forEach((data) => expect(queryByText(String(data))).toBeNull());
    });
  });

  describe('Test suite for breakOn and continueOn combined', () => {
    const arr = [1, 'two', 3, 'four', 5, 6];

    it('should break, when both match the same item', () => {
      const { getByText, queryByText } = render(
        <Loop<string | number> over={arr} continueOn={({ index }) => index > 0} breakOn={({ data }) => data === 'two'}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(getByText('1')).toBeInTheDocument();
      expect(queryByText('two')).toBeNull();
      expect(queryByText('3')).toBeNull();
    });

    it('should skip the continueOn matches until breakOn matches', () => {
      const { getByText, queryByText } = render(
        <Loop<string | number>
          over={arr}
          continueOn={({ data }) => typeof data === 'number' && data % 2 === 0}
          breakOn={({ data }) => data === 'four'}
        >
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(getByText('1')).toBeInTheDocument();
      expect(getByText('two')).toBeInTheDocument();
      expect(getByText('3')).toBeInTheDocument();
      expect(queryByText('four')).toBeNull();
      expect(queryByText('5')).toBeNull();
      expect(queryByText('6')).toBeNull();
    });

    it('should not call continueOn for the item that breaks', () => {
      const continueOn = vi.fn(() => false);

      render(
        <Loop<number> over={[1, 2, 3]} breakOn={({ data }) => data === 2} continueOn={continueOn}>
          {({ data }) => <span>{data}</span>}
        </Loop>,
      );

      expect(continueOn).toHaveBeenCalledTimes(1);
      expect(continueOn).toHaveBeenCalledWith({ data: 1, index: 0 });
    });
  });

  /* Loops generate too many error combinations.
   * Assertion has been simplified.
   * TODO: Add exhaustive checks.
   */
  it('should not render, if no params are provided', () => {
    const { container } = render(<Loop>{({ data }) => <span>{data}</span>}</Loop>);

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if empty array is provided', () => {
    const { container } = render(<Loop over={[]}>{({ data }) => <span>{data}</span>}</Loop>);

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if only step is provided', () => {
    const { container } = render(<Loop step={1}>{({ data }) => <span>{data}</span>}</Loop>);

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if step = 0 irrespective of other params', () => {
    const { container } = render(<Loop step={0}>{({ data }) => <span>{data}</span>}</Loop>);

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if out of bounds', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={-1} to={-1}>
        {({ data }) => <span>{data}</span>}
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if out of bounds 2', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={-1} to={3}>
        {({ data }) => <span>{data}</span>}
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={0} to={2} step={-1}>
        {({ data }) => <span>{data}</span>}
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={0} to={2} step={-1}>
        {({ data }) => <span>{data}</span>}
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop 2', () => {
    const { container } = render(
      <Loop from={10} to={2} step={1}>
        {({ data }) => <span>{data}</span>}
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop 3', () => {
    const { container } = render(
      <Loop from={10} step={1}>
        {({ data }) => <span>{data}</span>}
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop 4', () => {
    const { container } = render(
      <Loop to={2} step={1}>
        {({ data }) => <span>{data}</span>}
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });
});
