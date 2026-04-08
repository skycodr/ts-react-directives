import '@assets/examples.css';
import { Code } from '@components';
import { Loop, Template, Check, If, Else, ElseIf } from '@directives';

const Component = () => {
  return (
    <div className="container">
      <Loop from={1} to={31}>
        <Template<string>>
          {({ data: datum, index }) => (
            <Check>
              <If condition={index % 15 === 0}>
                <i>FizzBuzz</i>
                <br />
              </If>
              <ElseIf condition={index % 5 === 0}>
                <i>Buzz</i>
                <br />
              </ElseIf>
              <ElseIf condition={index % 3 === 0}>
                <i>Fizz</i>
                <br />
              </ElseIf>
              <Else>
                {datum}
                <br />
              </Else>
            </Check>
          )}
        </Template>
      </Loop>
    </div>
  );
};

const codeString = `
import { Loop, Template, Check, If, Else } from '@openbytes/ts-react-directives';

export const Snippet = () => {
  return (
    <div className="container">
      <Loop over={[]}>
        <Template<string>>
          {({ data: datum, index }) => (
            <Check>
              <If condition={index % 15 === 0}>
                <i>FizzBuzz</i>
                <br />;
              </If>
              <ElseIf condition={index % 5 === 0}>
                <i>Buzz</i>
                <br />
              </ElseIf>
              <ElseIf condition={index % 3 === 0}>
                <i>Fizz</i>
                <br />
              </ElseIf>
              <Else>{datum},&nbsp;</Else>
            </Check>
          )}
        </Template>
      </Loop>
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
