import { Loop, Template } from '@directives';
/**
 * Your code will have the above line as:
 *
 * import { ... } from '@openbytes/ts-react-directives';
 */

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Orange', 'Pineapple'];

/**
 * Example 2: Loop over an array using the Template directive.
 */
const Example2 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 2: Loop over an array</h2>
      <ul className="mt-3 space-y-1">
        <Loop over={fruits}>
          <Template<string>>
            {({ data, index }) => (
              <li className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm">
                <span className="font-medium text-gray-700">
                  {index + 1}. {data}
                </span>
              </li>
            )}
          </Template>
        </Loop>
      </ul>
    </section>
  );
};

export default Example2;
