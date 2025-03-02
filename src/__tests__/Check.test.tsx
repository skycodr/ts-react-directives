import { Else, ElseIf, If, Check } from '@directives';
import { render } from '@testing-library/react';
import { ERRORS, LogicErrors } from '@fixtures';

describe('tests for <Check>', () => {
  it('should render content of If block', () => {
    const { getByText } = render(
      <Check>
        <If condition={true}>If Block</If>
        <Else>Else Block</Else>
      </Check>,
    );
    expect(getByText('If Block')).toBeInTheDocument();
  });

  it('should render content of Else block', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If Block</If>
        <Else>Else Block</Else>
      </Check>,
    );
    expect(getByText('Else Block')).toBeInTheDocument();
  });

  it('should render content of ElseIf block', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If Block</If>
        <ElseIf condition={true}>ElseIf Block</ElseIf>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText('ElseIf Block')).toBeInTheDocument();
  });

  it('should render content of ElseIf block 2', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If Block</If>
        <ElseIf condition={false}>ElseIf Block 1</ElseIf>
        <ElseIf condition={true}>ElseIf Block 2</ElseIf>
        <ElseIf condition={false}>ElseIf Block 3</ElseIf>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText('ElseIf Block 2')).toBeInTheDocument();
  });

  it('should render content of ElseIf block 2, even when 3rd ElseIf block condition is true', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If Block</If>
        <ElseIf condition={false}>ElseIf Block 1</ElseIf>
        <ElseIf condition={true}>ElseIf Block 2</ElseIf>
        <ElseIf condition={true}>ElseIf Block 3</ElseIf>
        <ElseIf condition={false}>ElseIf Block 4</ElseIf>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText('ElseIf Block 2')).toBeInTheDocument();
  });

  it("should render an error if multiple If blocks are provided'", () => {
    const { getByText } = render(
      <Check>
        <If condition={true}>If Block</If>
        <If condition={true}>If Block</If>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.InvalidIfBlockOrdinal])).toBeInTheDocument();
    expect(getByText(ERRORS[LogicErrors.OnlyOneIfBlockExpected])).toBeInTheDocument();
  });

  it("should render an error if multiple Else blocks are provided'", () => {
    const { getByText } = render(
      <Check>
        <If condition={true}>If Block</If>
        <Else>Else Block 1</Else>
        <Else>Else Block 2</Else>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.InvalidElseBlockOrdinal])).toBeInTheDocument();
    expect(getByText(ERRORS[LogicErrors.OnlyOneElseBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if no If, ElseIf or Else block is provided', () => {
    const { getByText } = render(<Check />);

    expect(getByText(ERRORS[LogicErrors.IfBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if, only Else block is provided', () => {
    const { getByText } = render(
      <Check>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.InvalidElseBlockOrdinal])).toBeInTheDocument();
    expect(getByText(ERRORS[LogicErrors.IfBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if, only ElseIf block is provided', () => {
    const { getByText } = render(
      <Check>
        <ElseIf condition={true}>ElseIf Block</ElseIf>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.InvalidElseIfBlockOrdinal])).toBeInTheDocument();
    expect(getByText(ERRORS[LogicErrors.IfBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if, If block is empty', () => {
    const { getByText } = render(
      <Check>
        <If condition={true} />
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.ChildrenExpected])).toBeInTheDocument();
  });

  it('should render an error if, ElseIf block is empty', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If Block</If>
        <ElseIf condition={true} />
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.ChildrenExpected])).toBeInTheDocument();
  });

  it('should render an error if, Else block is empty', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If Block</If>
        <Else />
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.ChildrenExpected])).toBeInTheDocument();
  });

  it('should render an error if, if no If block is provided', () => {
    const { getByText } = render(
      <Check>
        <ElseIf condition={true}>ElseIf Block</ElseIf>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.IfBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if, If block is in incorrect ordinal', () => {
    const { getByText } = render(
      <Check>
        <Else>Else Block</Else>
        <If condition={true}>If Block</If>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.InvalidIfBlockOrdinal])).toBeInTheDocument();
  });

  it('should render an error if, If block has a direct conditional block as a child', () => {
    const { getByText } = render(
      <Check>
        <If condition={true}>
          <If condition={true}>If Block</If>
        </If>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.CheckBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if, ElseIf block has a direct conditional block as a child', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If block</If>
        <ElseIf condition={true}>
          <If condition={true}>ElseIf Block</If>
        </ElseIf>
        <Else>Else Block</Else>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.CheckBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if, Else block has a direct conditional block as a child', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If block</If>
        <ElseIf condition={false}>ElseIf block</ElseIf>
        <Else>
          <Else>Else</Else>
        </Else>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.CheckBlockExpected])).toBeInTheDocument();
  });

  it('should render an error if, Check block has other elements as children', () => {
    const { getByText } = render(
      <Check>
        <If condition={false}>If block</If>
        <ElseIf condition={false}>ElseIf block</ElseIf>
        <Else>Else block</Else>
        <div>test</div>
      </Check>,
    );

    expect(getByText(ERRORS[LogicErrors.InvalidElement])).toBeInTheDocument();
  });
});
