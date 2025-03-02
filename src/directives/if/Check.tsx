import { Errors } from '@components';
import { Directives } from '@fixtures';
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

export type CheckProps = {};

const useCheck = (props: PropsWithChildren) => {
  const errors = useValidate(props, Directives.Check);

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

const Check: FC<PropsWithChildren<CheckProps>> = (props) => {
  const { children } = useCheck(props);
  return <>{children}</>;
};

Check.displayName = Directives.Check;

export default Check;
