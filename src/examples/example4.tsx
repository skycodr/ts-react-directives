import { Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Orange', 'Pineapple'];

/**
 * LoopItem component
 *
 * @param props
 * @returns
 */
const FruitItem: FC<IteratorProps<string>> = (props) => {
  const { data, index } = props;
  return (
    <li className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm">
      <span className="font-medium text-gray-700">
        {index! + 1}. {data}
      </span>
    </li>
  );
};

/**
 * Example 4: Loop over an array.
 */

const Example4 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 4: Simple declarative Loop</h2>
      <ul className="mt-3 space-y-1">
        <Loop over={fruits}>
          <FruitItem />
        </Loop>
      </ul>
    </section>
  );
};

export default Example4;
