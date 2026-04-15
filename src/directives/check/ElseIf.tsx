import { Errors } from '@components';
import { Directives } from '@fixtures';
import { useValidate } from '@hooks';
import { ConfigManager } from '@utils';

import { createElement, FC, PropsWithChildren } from 'react';

export type ElseIfProps = PropsWithChildren<{
  condition: boolean;
}>;

const ElseIf: FC<ElseIfProps> = (props) => {
  const errors = useValidate(props, 'ElseIf');

  if (errors.length) {
    const config = ConfigManager.getInstance();
    let ch = null;
    if (config.isShowErrors && config.isShowErrorsInPlace) ch = createElement(Errors, { errors });
    return ch;
  }

  const { condition } = props;

  return <>{condition && props.children}</>;
};

ElseIf.displayName = Directives.ElseIf;

export default ElseIf;
