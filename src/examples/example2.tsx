import { Check, Else, If } from '@directives';
import { ChangeEvent, useState } from 'react';
import { Controls, Description, RenderExample, Toggle } from './HelperComponents';

const Example2 = () => {
  const [flipped, setFlipped] = useState(false);
  const handler = (event: ChangeEvent) => setFlipped((event.currentTarget as HTMLInputElement).checked);

  return (
    <RenderExample title="Example 2: Flip/flop with If / Else">
      <Description>Ternary rendering using If / Else — flip the toggle to show or hide the list.</Description>
      <Controls>
        <Toggle label="Flip the Switch" checked={flipped} handler={handler} />
      </Controls>
      <Check>
        <If condition={flipped}>
          <p className="mt-3 text-sm text-green-500 italic">ON</p>
        </If>
        <Else>
          <p className="mt-3 text-sm text-red-500 italic">OFF</p>
        </Else>
      </Check>
    </RenderExample>
  );
};

export default Example2;
