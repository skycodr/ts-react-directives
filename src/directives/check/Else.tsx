import { Errors } from '@components';
import { Directives } from '@fixtures';
import { useValidate } from '@hooks';
import { ConfigManager } from '@utils';

import { createElement, FC, PropsWithChildren } from 'react';

export type ElseProps = {};

const Else: FC<PropsWithChildren<ElseProps>> = (props) => {
  const errors = useValidate(props, 'Else');
  if (errors.length) {
    const config = ConfigManager.getInstance();
    let ch = null;
    if (config.isShowErrors && config.isShowErrorsInPlace) ch = createElement(Errors, { errors });

    return ch;
  }

  return <>{props.children}</>;
};

Else.displayName = Directives.Else;

export default Else;
