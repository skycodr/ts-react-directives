import { Errors } from '@components';
import { Directives } from '@fixtures';
import { useValidate } from '@hooks';
import { FC, PropsWithChildren } from 'react';

export type ElseProps = {};

const Else: FC<PropsWithChildren<ElseProps>> = (props) => {
  const errors = useValidate(props, 'Else');
  const children = errors.length === 0 ? props.children : <Errors errors={errors} />;

  return <>{children}</>;
};

Else.displayName = Directives.Else;

export default Else;
