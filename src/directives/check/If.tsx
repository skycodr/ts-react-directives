import { Directives } from '@fixtures';
import { useIf } from '@hooks';
import { IfProps } from '@types';

import { FC } from 'react';

const If: FC<IfProps> = (props) => <>{useIf(props)}</>;

If.displayName = Directives.If;

export default If;
