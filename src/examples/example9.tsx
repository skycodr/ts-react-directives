import { Loop, Template, withLoop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
/**
 * Your code will have the above line as:
 *
 * import { ... } from '@openbytes/ts-react-directives';
 */

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Orange', 'Pineapple'];

const ListItem: FC<IteratorProps<string>> = (props) => {
  const { data, index } = props;
  return (
    <li className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm">
      <span className="font-medium text-gray-700">
        {index! + 1}. {data}
      </span>
    </li>
  );
};

const WrappedListItem = withLoop(ListItem);

/**
 * Example 9: Loop over an array using the Template directive.
 */

const Example9 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 9: Simple Loop declarative syntax</h2>
      <ul className="mt-3 space-y-1">
        <Loop over={fruits}>
          <Template<string>>
            <WrappedListItem />
          </Template>
        </Loop>
      </ul>
    </section>
  );
};

export default Example9;
