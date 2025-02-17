import { Errors } from '@components';
import { useValidate } from '@hooks';
import { SwitchIfProps } from '@types';
import { Children, createElement, FC, ReactElement, ReactNode } from 'react';

const useSwitchIf = (props: SwitchIfProps) => {
  const errors = useValidate<SwitchIfProps>(props, SwitchIf.name);

  if (errors.length) {
    return { children: createElement(Errors, { errors }) };
  }

  const { children: oChildren } = props;
  const elements = Children.toArray(oChildren);
  const _child = elements.reduce<ReactNode | null>((result, element) => {
    if (result) {
      return result;
    }

    const { type } = (element ?? {}) as ReactElement;

    if (type) {
      const { name } = type as { name: string };
      const { condition } = ((element as ReactElement)?.props ?? {}) as { condition: boolean | undefined };

      if ((name === 'If' || name === 'ElseIf') && condition === true) {
        return element;
      }

      if (name === 'Else') {
        return element;
      }
    }

    return null;
  }, null);

  return { children: _child };
};

const SwitchIf: FC<SwitchIfProps> = (props) => {
  const { children } = useSwitchIf(props);

  return <>{children}</>;
};

export default SwitchIf;
