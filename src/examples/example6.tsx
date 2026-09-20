import { Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';

type CountDownType = {
  styleClasses?: string;
};
const CountDown: FC<IteratorProps<number, CountDownType>> = ({ data, styleClasses }) => {
  return <span className={`w-10 h-10 flex items-center justify-center rounded-full ${styleClasses}`}>{data}</span>;
};

/**
 * Example 6: Descending numeric loop (countdown). Auto step calculation and
 * custom property passing.
 */

const Example6 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 6: Descending countdown; Auto step value</h2>
      <div className="mt-3 flex items-center gap-3">
        <Loop from={5} to={1}>
          <CountDown styleClasses="bg-red-100 text-red-700 font-semibold" />
        </Loop>
        <span className="text-lg text-gray-500">Liftoff!</span>
      </div>
    </section>
  );
};

export default Example6;
