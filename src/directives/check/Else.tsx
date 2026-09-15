/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Else directive. Else directive may have nested Check directives.
 *
 */

import { Directives } from '@fixtures';
import { useElse } from '@hooks';
import { ElseProps } from '@types';

import { FC } from 'react';

/**
 * Else directive. Else directive may have nested Check directives.
 *
 * @param props
 * @returns
 */
const Else: FC<ElseProps> = (props) => <>{useElse(props)}</>;

Else.displayName = Directives.Else;

export default Else;
