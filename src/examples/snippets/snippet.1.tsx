import '@assets/examples.css';
import { Code } from '@components';
import { Check, If } from '@directives';
import { useState } from 'react';

const Component = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="container">
      <label htmlFor="showContent">
        Show content <input id="showContent" type="checkbox" onChange={handleToggle} />
      </label>
      <Check>
        <If condition={show}>
          <div className="content">You chose to show the content</div>
        </If>
      </Check>
    </div>
  );
};

const codeString: string = `
import { Check, If } from '@openbytes/ts-react-directives';
import { useState } from 'react';

export const Snippet = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="container">
      <label htmlFor="showContent">
        Show content <input title="showContent" type="checkbox" onChange={handleToggle} />
      </label>
      <Check>
        <If condition={show}>
          <div className="content">You chose to show the content</div>
        </If>
      </Check>
    </div>
  );
};
`;

export const Snippet = () => {
  return (
    <div className="container">
      <div>
        <h1>Example Code</h1>
        <Code>{codeString}</Code>;
      </div>
      <div>
        <h1>Demo</h1>
        <Component />
      </div>
    </div>
  );
};

export default Snippet;
