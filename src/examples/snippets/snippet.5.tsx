import '@assets/examples.css';
import { Code } from '@components';
import { Loop, Template } from '@directives';

const Component = () => {
  return (
    <div className="container">
      <ol>
        <Loop to={10}>
          <Template<number>>
            {({ data: datum, index }) => (
              <li>
                {datum}-{index}
              </li>
            )}
          </Template>
        </Loop>
      </ol>
    </div>
  );
};

const codeString = `
import { Loop, Template } from '@openbytes/ts-react-directives';

export const Snippet = () => {
  const data = ['a', 'b', 'c', 'd', 'e', 'f'];

   return (
    <div className="container">
      <ol>
        <Loop to={10}>
          <Template<number>>
            {({ data: datum, index }) => (
              <li>
                {datum}-{index}
              </li>
            )}
          </Template>
        </Loop>
      </ol>
    </div>
  );
};
`;

export const Snippet = () => {
  return (
    <div className="container">
      <div>
        <h1>Example Code</h1>
        <Code>{codeString}</Code>
      </div>
      <div>
        <h1>Demo</h1>
        <Component />
      </div>
    </div>
  );
};

export default Snippet;
