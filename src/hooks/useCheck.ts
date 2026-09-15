/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Hooks to validate the branching logic props of a directive based on its name. It retrieves the appropriate validator function
 *
 * WARNING!!! Do NOT use this hook in your code only for internal use of the library. It is not intended for public
 */

import { Directives } from '@fixtures';
import { useValidationFactory } from '@hooks';
import { CheckProps, ElseIfProps, ElseProps, IfProps } from '@types';
import { getElementRenderer, getErrors } from '@utils';
import { Children, isValidElement } from 'react';

/**
 * Hook to validate the props of a Check directive. and return the correct render element.
 *
 * @param props CheckProps
 * @returns
 */
export const useCheck = (props: CheckProps) => {
  const errors = useValidationFactory<CheckProps>(props, Directives.Check);

  if (errors.length) return getErrors(errors);

  const elements = Children.toArray(props.children);
  const validElements = elements.filter(isValidElement);

  return getElementRenderer(validElements);
};

/**
 * Hook to validate the props of an If directive and return the correct render element.
 *
 * @param props If block props
 * @returns
 */
export const useIf = (props: IfProps) => {
  const errors = useValidationFactory<IfProps>(props, 'If');

  if (errors.length) return getErrors(errors);

  const { condition, children } = props;

  return condition ? children : null;
};

/**
 * Hook to validate the props of an ElseIf directive and return the correct render element.
 *
 * @param props ElseIf props
 * @returns
 */
export const useElseIf = (props: ElseIfProps) => {
  const errors = useValidationFactory<ElseIfProps>(props, 'ElseIf');

  if (errors.length) return getErrors(errors);

  const { condition, children } = props;

  return condition ? children : null;
};

/**
 * Hook to validate the props of an Else directive and return the correct render element.
 *
 * @param props Else block props
 * @returns
 */
export const useElse = (props: ElseProps) => {
  const errors = useValidationFactory<ElseProps>(props, 'Else');

  if (errors.length) return getErrors(errors);

  const { children } = props;

  return children ?? null;
};
