import { Loop, Template } from '@directives';
/**
 * Your code will have the above line as:
 *
 * import { ... } from '@openbytes/ts-react-directives';
 */

/**
 * Example 4: Descending numeric loop (countdown).
 */
const Example4 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 4: Descending countdown</h2>
      <div className="mt-3 flex items-center gap-3">
        <Loop from={5} to={1} step={-1}>
          <Template<number>>
            {({ data }) => (
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-700 font-semibold">
                {data}
              </span>
            )}
          </Template>
        </Loop>
        <span className="text-lg text-gray-500">Liftoff!</span>
      </div>
    </section>
  );
};

export default Example4;
