import { FC } from 'react';
import { useValidate } from '@hooks';
import { Errors } from '@components';
import { ElseProps } from '@types';

const Else: FC<ElseProps> = (props) => {
  const errors = useValidate<ElseProps>(props, Else.name);
  const children = errors.length === 0 ? props.children : <Errors errors={errors} />;

  return <>{children}</>;
};

export default Else;
