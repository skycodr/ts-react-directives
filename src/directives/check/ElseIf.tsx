import { Directives } from '@fixtures';
import { useElseIf } from '@hooks';
import { ElseIfProps } from '@types';

import { FC } from 'react';

const ElseIf: FC<ElseIfProps> = (props) => <>{useElseIf(props)}</>;

ElseIf.displayName = Directives.ElseIf;

export default ElseIf;
