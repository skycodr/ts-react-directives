/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Test scenarios for Loop directives.
 *
 */
import { Loop, Template } from '@directives';
import { render } from '@testing-library/react';
import { DataShape, LoopDataShape } from '@types';
import { ReactElement } from 'react';

describe('Test scenarios for <Loop>', () => {
  const num_arr = [1, 3, 5, 7];
  const chr_arr = ['a', 'b', 'c', 'd', 'e'];

  function getComponent<T extends DataShape>(props: LoopDataShape<T>): ReturnType<typeof render> {
    return render(
      <Loop {...props}>
        <Template<T>>{({ data, index: _i }) => <span>{data as unknown as ReactElement}</span>}</Template>
      </Loop>,
    );
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

  /* Loops generate too many error combinations.
   * Assertion has been simplified.
   * TODO: Add exhaustive checks.
   */
  it('should not render, if no params are provided', () => {
    const { container } = render(
      <Loop>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if empty array is provided', () => {
    const { container } = render(
      <Loop over={[]}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if only step is provided', () => {
    const { container } = render(
      <Loop step={1}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if step = 0 irrespective of other params', () => {
    const { container } = render(
      <Loop step={0}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if out of bounds', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={-1} to={-1}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if out of bounds 2', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={-1} to={3}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={0} to={2} step={-1}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop', () => {
    const { container } = render(
      <Loop over={[1, 2, 3]} from={0} to={2} step={-1}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop 2', () => {
    const { container } = render(
      <Loop from={10} to={2} step={1}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop 3', () => {
    const { container } = render(
      <Loop from={10} step={1}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });

  it('should not render, if indeterministic loop 4', () => {
    const { container } = render(
      <Loop to={2} step={1}>
        <Template<number>>{({ data }) => <span>{data}</span>}</Template>
      </Loop>,
    );

    expect(container.querySelector('.trd-error-list')).toBeInTheDocument();
  });
});
