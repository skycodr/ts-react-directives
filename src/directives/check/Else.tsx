import { Directives } from '@fixtures';
import { useElse } from '@hooks';
import { ElseProps } from '@types';

import { FC } from 'react';

const Else: FC<ElseProps> = (props) => <>{useElse(props)}</>;

Else.displayName = Directives.Else;

export default Else;
