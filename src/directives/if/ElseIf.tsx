import { FC } from 'react';
import { useValidate } from '@hooks';
import { Errors } from '@components';
import { ElseIfProps } from '@types';

const ElseIf: FC<ElseIfProps> = (props) => {
  const errors = useValidate<ElseIfProps>(props, ElseIf.name);
  const children = errors.length === 0 ? props.children : <Errors errors={errors} />;

  return <>{children}</>;
};

export default ElseIf;
