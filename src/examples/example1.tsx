import { Check, If } from '@directives';
import { ChangeEvent, useState } from 'react';
import { Controls, Description, RenderExample, Toggle } from './HelperComponents';

const Example1 = () => {
  const [show, setShow] = useState(false);
  const handler = (event: ChangeEvent) => setShow((event.currentTarget as HTMLInputElement).checked);

  return (
    <RenderExample title="Example 1: Basic conditional rendering">
      <Description>Simple conditional rendering of an element, using a simple Check &gt; If</Description>
      <Controls>
        <Toggle label="Toggle me" checked={show} handler={handler} />
      </Controls>
      <Check>
        <If condition={show}>
          <span className="text-green-700">I've been conditionally rendered</span>
        </If>
      </Check>
    </RenderExample>
  );
};

export default Example1;
