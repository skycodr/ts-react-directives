import { Errors } from '@components';
import { Directives } from '@fixtures';
import { useValidate } from '@hooks';
import { ConfigManager } from '@utils';

import { createElement, FC, PropsWithChildren } from 'react';

export type IfProps = PropsWithChildren<{
  condition: boolean;
}>;

const If: FC<IfProps> = (props) => {
  const errors = useValidate(props, 'If');
  if (errors.length) {
    const config = ConfigManager.getInstance();
    let ch = null;
    if (config.isShowErrors && config.isShowErrorsInPlace) ch = createElement(Errors, { errors });
    return ch;
  }
  const { condition } = props;

  return <>{condition && props.children}</>;
};

If.displayName = Directives.If;

export default If;
