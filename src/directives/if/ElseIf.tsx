import { Errors } from '@components';
import { useValidate } from '@hooks';
import { FC, PropsWithChildren } from 'react';

export type ElseIfProps = PropsWithChildren<{
  condition: boolean;
}>;

const ElseIf: FC<ElseIfProps> = (props) => {
  const errors = useValidate(props, 'ElseIf');
  const { condition } = props;
  const children = errors.length === 0 ? props.children : <Errors errors={errors} />;

  return <>{condition && children}</>;
};

ElseIf.displayName = 'ElseIf';

export default ElseIf;
