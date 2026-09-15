/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description If directive. All If directives may have nested Check directives.
 *
 */

import { Directives } from '@fixtures';
import { useIf } from '@hooks';
import { IfProps } from '@types';

import { FC } from 'react';

/**
 * If directive. All If directives may have nested Check directives.
 *
 * @param props
 * @returns
 */
const If: FC<IfProps> = (props) => <>{useIf(props)}</>;

If.displayName = Directives.If;

export default If;
