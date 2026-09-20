import { Check, Else, Loop } from '@directives';
import { configure } from '@utils';

// Error reporting is a runtime opt-in via `configure()`. It works the same in
// every bundler/runtime (Vite, webpack, SSR, plain Node) - no env vars needed.
configure({ showErrors: true, showErrorsInProd: true, showErrorsInPlace: true });

/**
 * Example 8: In-place error reporting (one Loop + one Check).
 *
 * Once error reporting is enabled, malformed directives render a styled error
 * list directly in place of the output. Override the `.trd-error-list*` classes
 * in your own CSS to customize the look.
 */
const Example8 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 8: In-place errors (Loop + Check)</h2>
      <p className="mt-1 text-sm text-gray-500">Malformed directives are reported in place of the output.</p>

      <div className="mt-4 space-y-4">
        {/* Loop error: out-of-bounds slice of the array */}
        <Loop<number> over={[1, 2, 3]} from={0} to={5}>
          {({ data }) => (
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm">
              {data}
            </span>
          )}
        </Loop>

        {/* Check error: an 'Else' cannot stand alone, an 'If' is required */}
        <Check>
          <Else>There is no If to pair this Else with.</Else>
        </Check>
      </div>
    </section>
  );
};

export default Example8;
