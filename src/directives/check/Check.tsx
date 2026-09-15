/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Check directive. All If else statements should be wrapped inside this directive.
 * It is used to validate the branching logic props of a directive based on its name.
 * It retrieves the appropriate validator function
 */

import { Directives } from '@fixtures';
import { useCheck } from '@hooks';
import { CheckProps } from '@types';

import { FC } from 'react';

/**
 * Check directive. All If else statements should be wrapped inside this directive.
 *
 * @param props
 * @returns
 */
const Check: FC<CheckProps> = (props) => <>{useCheck(props)}</>;

Check.displayName = Directives.Check;

export default Check;
