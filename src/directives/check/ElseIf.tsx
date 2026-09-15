/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description ElseIf directive. May have nested Check directives.
 *
 */
import { Directives } from '@fixtures';
import { useElseIf } from '@hooks';
import { ElseIfProps } from '@types';

import { FC } from 'react';

/**
 * ElseIf directive. May have nested Check directives.
 *
 * @param props
 * @returns
 */
const ElseIf: FC<ElseIfProps> = (props) => <>{useElseIf(props)}</>;

ElseIf.displayName = Directives.ElseIf;

export default ElseIf;
