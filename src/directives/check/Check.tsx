import { Directives } from '@fixtures';
import { useCheck } from '@hooks';
import { CheckProps } from '@types';

import { FC } from 'react';

const Check: FC<CheckProps> = (props) => <>{useCheck(props)}</>;

Check.displayName = Directives.Check;

export default Check;
