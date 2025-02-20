import { Errors } from '@components';
import { useValidate } from '@hooks';
import { SwitchIfProps } from '@types';
import { Children, createElement, FC, ReactElement } from 'react';

const { log, warn } = console;

const useSwitchIf = (props: SwitchIfProps) => {
  const errors = useValidate<SwitchIfProps>(props, SwitchIf.name);

  if (errors.length) {
    warn('__ERRORS__', errors);
    return { children: createElement(Errors, { errors }) };
  }

  const { children: oChildren } = props;
  const elements = Children.toArray(oChildren);

  let child = null;

  if (elements.length) {
    let i = 0;
    log('__FOUND_ELEMENTS__', elements);
    do {
      const { type } = (elements[i] ?? {}) as ReactElement;

      log('__INSIDE_LOOP__', i, type);

      if (type) {
        const { name } = type as { name: string };
        const { condition } = ((elements[i] as ReactElement)?.props ?? {}) as { condition: boolean };

        if ((name === 'If' || name === 'ElseIf') && condition === true) {
          log('__ELEMENT_FOUND_1__', name);
          child = elements[i];
          break;
        }

        if (name === 'Else') {
          log('__ELEMENT_FOUND_2__', name);
          child = elements[i];
          break;
        }
      }
      i++;
    } while (i < elements.length);
  }

  log('__CHILD__', child);

  return { children: child };
};

const SwitchIf: FC<SwitchIfProps> = (props) => {
  const { children } = useSwitchIf(props);
  return <>{children}</>;
};

export default SwitchIf;
