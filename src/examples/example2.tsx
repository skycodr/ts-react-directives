import { Check, Else, If } from '@directives';
import { ChangeEvent, useState } from 'react';
import { Toggle } from './HelperComponents';

/**
 * Example 2: Flip-Flop using If / Else — flip the toggle to show or hide the list.
 */
const Example2 = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <section>
      <h2 className="text-xl font-semibold">Example 2: Flip/flop with If / Else</h2>
      <p className="mt-3 mb-3 text-sm text-gray-600">
        <Toggle
          label="Flip the Switch"
          checked={flipped}
          handler={(event: ChangeEvent) => setFlipped((event.currentTarget as HTMLInputElement).checked)}
        />
      </p>

      <Check>
        <If condition={flipped}>
          <p className="mt-3 text-sm text-green-500 italic">ON</p>
        </If>
        <Else>
          <p className="mt-3 text-sm text-red-500 italic">OFF</p>
        </Else>
      </Check>
    </section>
  );
};

export default Example2;
