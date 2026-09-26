import { Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
import { Description, RenderExample } from './HelperComponents';

const Example6 = () => {
  return (
    <RenderExample title="Example 6: Descending countdown">
      <Description>Auto calculating reverse step</Description>
      <div className="mt-3 flex items-center gap-3">
        <Loop from={5} to={1}>
          <CountDown styleClasses="bg-red-100 text-red-700 font-semibold" />
        </Loop>
        <span className="text-lg text-gray-500">Liftoff!</span>
      </div>
    </RenderExample>
  );
};

export default Example6;

/*********************************************************************/
/* Helper types, components and methods are added below.             */
/*********************************************************************/

type CountDownProps = {
  styleClasses?: string;
};

const CountDown: FC<IteratorProps<number, CountDownProps>> = ({ data, styleClasses }) => {
  return (
    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${styleClasses ?? ''}`}>{data}</span>
  );
};
