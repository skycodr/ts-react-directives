/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Factory to validate the props of a directive based on its name. It retrieves the appropriate validator function
 * from the ValidationFactory and applies it to the provided props.
 * WARNING!!! Do NOT use this hook in your code only for internal use of the library. It is not intended for public
 */

import { ValidationFactory } from '@utils';
import { PropsWithChildren, useMemo } from 'react';

/**
 * Factory to validate the props of a directive based on its name. It retrieves the appropriate validator function
 * from the ValidationFactory and applies it to the provided props.
 *
 * WARNING!!! Do NOT use this hook in your code only for internal use of the library. It is not intended for public
 * use and may change or be removed in future versions.
 *
 * @param props Props to be validated.
 * @param type Component type Check, If, ElseIf, Else, Loop, Template
 *
 * @returns Returns a validator function.
 */
export const useValidationFactory = <T>(props: PropsWithChildren<T>, type: string) => {
  return useMemo(() => ValidationFactory.get(type), [type])(props);
};
