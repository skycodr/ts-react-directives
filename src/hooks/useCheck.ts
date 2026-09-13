import { Directives } from '@fixtures';
import { useValidationFactory } from '@hooks';
import { CheckProps, ElseIfProps, ElseProps, IfProps } from '@types';
import { getErrors, getElementRenderer } from '@utils';
import { Children, isValidElement } from 'react';

export const useCheck = (props: CheckProps) => {
  const errors = useValidationFactory<CheckProps>(props, Directives.Check);

  if (errors.length) return getErrors(errors);

  const elements = Children.toArray(props.children);
  const validElements = elements.filter(isValidElement);

  return getElementRenderer(validElements);
};

export const useIf = (props: IfProps) => {
  const errors = useValidationFactory<IfProps>(props, 'If');

  if (errors.length) return getErrors(errors);

  const { condition, children } = props;

  return condition ? children : null;
};

export const useElseIf = (props: ElseIfProps) => {
  const errors = useValidationFactory<ElseIfProps>(props, 'ElseIf');

  if (errors.length) return getErrors(errors);

  const { condition, children } = props;

  return condition ? children : null;
};

export const useElse = (props: ElseProps) => {
  const errors = useValidationFactory<ElseProps>(props, 'Else');

  if (errors.length) return getErrors(errors);

  const { children } = props;

  return children ?? null;
};
