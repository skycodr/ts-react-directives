import { Errors } from '@components';
import { Directives } from '@fixtures';
import { useValidate } from '@hooks';

import { FC, PropsWithChildren } from 'react';

export type IfProps = PropsWithChildren<{
  condition: boolean;
}>;

const If: FC<IfProps> = (props) => {
  const errors = useValidate(props, 'If');
  const { condition } = props;
  const children = errors.length === 0 ? props.children : <Errors errors={errors} />;

  return <>{condition && children}</>;
};

If.displayName = Directives.If;

export default If;
