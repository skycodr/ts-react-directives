import { Directives } from '@fixtures';
import { useLoop } from '@hooks';
import { DataShape, LoopProps } from '@types';

const Loop = <T extends DataShape = any>(props: LoopProps<T>) => <>{useLoop(props)}</>;

Loop.displayName = Directives.Loop;

export default Loop;
