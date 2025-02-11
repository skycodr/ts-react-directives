import { Children, createElement, FC, memo, ReactNode } from 'react';
import { useValidate } from '@hooks';
import { Errors } from '@components';

const useSwitch = (props: SwitchProps) => {
  const errors = useValidate<SwitchProps>(props, Switch.name);
  if (errors.length) {
    return { children: createElement(Errors, { errors }) };
  }

  const { children: oChildren } = props;
  const _children = Children.toArray(oChildren);
  const _child = _children.reduce<ReactNode | null>((acc, curr) => {
    // @ts-expect-error props exist
    if (acc?.props?.condition) {
      return acc;
    }
    // @ts-expect-error props exist
    if (curr?.props?.condition || curr?.type.name === 'Else') {
      return curr;
    }

    return acc;
  }, null);

  return { children: _child };
};

const Switch: FC<SwitchProps> = (props) => {
  const { children } = useSwitch(props);

  return <>{children}</>;
};

export default memo(Switch);
