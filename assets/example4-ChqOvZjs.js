var e=`import { Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
import { Description, RenderExample } from './HelperComponents';

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Orange', 'Pineapple'];

const Example4 = () => {
  return (
    <RenderExample title="Example 4: Simple declarative Loop">
      <Description>Loop over an array of strings. \`from\`, \`to\`, and \`step\` is calculated automatically.</Description>
      <ul className="mt-3 space-y-1">
        <Loop over={fruits}>
          <FruitItem />
        </Loop>
      </ul>
    </RenderExample>
  );
};

export default Example4;

/*********************************************************************/
/* Helper types, components and methods are added below.             */
/*********************************************************************/

const FruitItem: FC<IteratorProps<string>> = ({ data, index }) => (
  <li className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm">
    <span className="font-medium text-gray-700">
      {index! + 1}. {data}
    </span>
  </li>
);
`;export{e as default};