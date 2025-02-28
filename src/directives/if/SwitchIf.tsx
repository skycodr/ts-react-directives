import { Errors } from '@components';
import { DirectiveNames } from '@fixtures';
import { useValidate } from '@hooks';

import {
  Children,
  createElement,
  FC,
  FunctionComponent,
  isValidElement,
  NamedExoticComponent,
  PropsWithChildren,
  ReactElement,
} from 'react';

export type SwitchIfProps = {};

const useSwitchIf = (props: PropsWithChildren) => {
  const errors = useValidate(props, 'SwitchIf');

  if (errors.length) {
    return { children: createElement(Errors, { errors }) };
  }

  const elements = Children.toArray(props.children);
  const validElements = elements.filter(isValidElement);
  const child = findChild(validElements);

  return { children: child };
};

const findChild = (elements: ReactElement[]) => {
  for (const element of elements) {
    if (!element || !isValidElement(element)) {
      continue;
    }

    const { displayName } = element.type as NamedExoticComponent | FunctionComponent;

    if (displayName) {
      const { condition } = element.props as { condition: boolean };

      if ((displayName === 'If' || displayName === 'ElseIf') && condition === true) {
        return element;
      }

      if (displayName === 'Else') {
        return element;
      }
    }
  }

  return null;
};

const SwitchIf: FC<PropsWithChildren<SwitchIfProps>> = (props) => {
  const { children } = useSwitchIf(props);
  return <>{children}</>;
};

SwitchIf.displayName = DirectiveNames.SwitchIf;

export default SwitchIf;
