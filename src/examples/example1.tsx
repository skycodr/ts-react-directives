import { Check, If } from '@directives';
import { ChangeEvent, useState } from 'react';
import { Toggle } from './HelperComponents';

/**
 * Example 1: BExample 1: Basic conditional rendering
 */
const Example1 = () => {
  const [show, setShow] = useState(false);

  return (
    <section>
      <h2 className="text-xl font-semibold">Example 1: Basic conditional rendering</h2>
      <p className="mt-3 mb-3 text-sm text-gray-600">
        <Toggle
          label="Toggle me"
          checked={show}
          handler={(event: ChangeEvent) => setShow((event.currentTarget as HTMLInputElement).checked)}
        />
      </p>

      <Check>
        <If condition={show}>
          <span className="text-green-700">I've been conditionally rendered</span>
        </If>
      </Check>
    </section>
  );
};

export default Example1;
