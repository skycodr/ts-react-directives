import '@assets/examples.css';
import { Code } from '@components';
import { Check, Else, If } from '@directives';
import { ChangeEvent, useState } from 'react';

const Component = () => {
  const [num, setNum] = useState(0);
  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNum(parseInt(e.target.value, 10));
  };

  return (
    <div className="container">
      <label htmlFor="isOddOrEven">
        Select a number <input id="isOddOrEven" type="number" onChange={handleNumber} defaultValue={0} />
      </label>
      <Check>
        <If condition={num % 2 === 0}>
          <div className="content">The {num} is Even</div>
        </If>
        <Else>
          <div className="content">The {num} is Odd</div>
        </Else>
      </Check>
    </div>
  );
};

const codeString = `
import { Check, If } from '@openbytes/ts-react-directives';
import { ChangeEvent, useState } from 'react';

export const Snippet = () => {
  const [num, setNum] = useState(0);
  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNum(parseInt(e.target.value, 10));
  };

  return (
    <div className="container">
      <label htmlFor="isOddOrEven">
        Select a number <input title="isOddOrEven" type="number" onChange={handleNumber} defaultValue={0} />
      </label>
      <Check>
        <If condition={num % 2 === 0}>
          <div className="content">The {num} is Even</div>
        </If>
        <Else>
          <div className="content">The {num} is Odd</div>
        </Else>
      </Check>
    </div>
  );
};
`;

const Snippet = () => {
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
