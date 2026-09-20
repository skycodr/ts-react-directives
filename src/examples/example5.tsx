import { Loop } from '@directives';

/**
 * Example 5: Loop over a numeric range (from -> to) with a custom step.
 */
const Example5 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Example 5: Odd numbers with inline component</h2>
      <div className="flex flex-wrap gap-2">
        <Loop<number> from={1} to={9} step={2}>
          {({ data }) => (
            <span className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm min-w-10 text-center">
              {data}
            </span>
          )}
        </Loop>
      </div>
    </section>
  );
};

export default Example5;
