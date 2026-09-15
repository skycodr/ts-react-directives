import { Loop, Template } from '@directives';
/**
 * Your code will have the above line as:
 *
 * import { ... } from '@openbytes/ts-react-directives';
 */

/**
 * Example 3: Loop over a numeric range (from -> to) with a custom step,
 * rendering each iteration with a Template render-function child.
 */
const Example3 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Example 3: Numeric range loop (odd numbers)</h2>
      <div className="flex flex-wrap gap-2">
        <Loop from={1} to={9} step={2}>
          <Template<number>>
            {({ data }) => (
              <span className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm min-w-10 text-center">
                {data}
              </span>
            )}
          </Template>
        </Loop>
      </div>
    </section>
  );
};

export default Example3;
