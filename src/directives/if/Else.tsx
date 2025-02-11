import { FC } from 'react';
import { useValidate } from '@hooks';
import { Errors } from '@components';

const Else: FC<ElseProps> = (props) => {
  const errors = useValidate<ElseIfProps>(props, Else.name);
  const children = errors.length === 0 ? props.children : <Errors errors={errors} />;

  return <>{children}</>;
};

export default Else;
