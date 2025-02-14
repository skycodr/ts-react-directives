import { FC } from 'react';
import { useValidate } from '@hooks';
import { Errors } from '@components';
import { IfProps } from '@types';

const If: FC<IfProps> = (props) => {
  const errors = useValidate<IfProps>(props, If.name);
  const children = errors.length === 0 ? props.children : <Errors errors={errors} />;

  return <>{children}</>;
};

export default If;
