import { Loop, Template } from '@directives';
import { ERRORS, LogicErrors } from '@fixtures';
import { render } from '@testing-library/react';

describe('tests for <Loop>', () => {
  it('should render items from an array using "over" prop', () => {
    const data = ['apple', 'banana', 'cherry'];
    const { getByText } = render(
      <Loop over={data}>
        <Template<string>>
          {({ data: item, index }) => (
            <div key={index}>
              {item}-{index}
            </div>
          )}
        </Template>
      </Loop>,
    );

    expect(getByText('apple-0')).toBeInTheDocument();
    expect(getByText('banana-1')).toBeInTheDocument();
    expect(getByText('cherry-2')).toBeInTheDocument();
  });

  it('should render a range of numbers using "to" prop', () => {
    const { getByText, queryByText } = render(
      <Loop to={3}>
        <Template<number>>{({ data: val }) => <span key={val}>Item-{val}</span>}</Template>
      </Loop>,
    );

    expect(getByText('Item-0')).toBeInTheDocument();
    expect(getByText('Item-1')).toBeInTheDocument();
    expect(getByText('Item-2')).toBeInTheDocument();
    expect(queryByText('Item-3')).toBeInTheDocument();
  });

  it('should render a range from "from" to "to"', () => {
    const { getByText, queryByText } = render(
      <Loop from={5} to={8}>
        <Template<number>>{({ data: val }) => <span key={val}>Num-{val}</span>}</Template>
      </Loop>,
    );

    expect(getByText('Num-5')).toBeInTheDocument();
    expect(getByText('Num-6')).toBeInTheDocument();
    expect(getByText('Num-7')).toBeInTheDocument();
    expect(queryByText('Num-8')).toBeInTheDocument();
  });

  it('should render an error if no Template is provided', () => {
    const { getByText } = render(<Loop over={[1, 2, 3]} />);

    expect(getByText(ERRORS[LogicErrors.TemplateBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if children are not a Template component', () => {
    const { getByText } = render(
      <Loop over={[1, 2, 3]}>
        <div>Not a template</div>
      </Loop>,
    );

    expect(getByText(ERRORS[LogicErrors.InvalidElement])).toBeInTheDocument();
  });

  it('should render an error if multiple Templates are provided', () => {
    const { getByText } = render(
      <Loop over={[1]}>
        <Template>{() => <div>1</div>}</Template>
        <Template>{() => <div>2</div>}</Template>
      </Loop>,
    );

    expect(getByText(ERRORS[LogicErrors.OnlyOneTemplateBlockExpected])).toBeInTheDocument();
    expect(getByText(ERRORS[LogicErrors.SingleChildExpected])).toBeInTheDocument();
    expect(getByText(ERRORS[LogicErrors.MalformedLoop])).toBeInTheDocument();
  });

  it('should render an error if neither "over" nor "to" is provided', () => {
    const { getByText } = render(
      <Loop>
        <Template>{() => <div>Test</div>}</Template>
      </Loop>,
    );

    expect(getByText(ERRORS[LogicErrors.MalformedLoop])).toBeInTheDocument();
  });

  it('should handle empty arrays gracefully', () => {
    const { getByText } = render(
      <Loop over={[]}>
        <Template<string>>{({ data }) => <div>{data}</div>}</Template>
      </Loop>,
    );

    expect(getByText(ERRORS[LogicErrors.EmptyLoopSource])).toBeInTheDocument();
  });
});
