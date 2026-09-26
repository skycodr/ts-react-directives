import { Check, Else, Loop } from '@directives';
import { configure } from '@utils';
import { Description, RenderExample } from './HelperComponents';

// Error reporting is a runtime opt-in via `configure()`. It works the same in
// every bundler/runtime (Vite, webpack, SSR, plain Node) - no env vars needed.
configure({ showErrors: true, showErrorsInProd: true, showErrorsInPlace: true });

const Example12 = () => {
  return (
    <RenderExample title="Example 12: Render errors and degrade gracefully">
      <Description>
        Displays errors if configured. Malformed directives are reported in place of the output.
      </Description>
      {/* Loop error: out-of-bounds slice of the array */}
      <Loop over={[1, 2, 3]} from={0} to={5}>
        <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm">
          This will not render
        </span>
      </Loop>

      {/* Check error: an 'Else' cannot stand alone, an 'If' is required */}
      <Check>
        <Else>There is no If to pair this Else with.</Else>
      </Check>

      <Loop></Loop>
      <Loop over={[1, 2, 3]} from={0} to={2} step={-1}></Loop>
    </RenderExample>
  );
};

export default Example12;
