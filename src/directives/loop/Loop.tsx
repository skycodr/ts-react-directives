/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Loop directive. Has to have Template directive as a child. Top level validation happens here.
 *
 */

import { Directives } from '@fixtures';
import { useLoop } from '@hooks';
import { DataShape, LoopProps } from '@types';

/**
 * Loop directive. Has to have Template directive as a child. Top level validation happens here.
 *
 * @param props
 * @returns
 */
const Loop = <T extends DataShape = any>(props: LoopProps<T>) => <>{useLoop(props)}</>;

Loop.displayName = Directives.Loop;

export default Loop;
