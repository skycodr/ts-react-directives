var e=`import { Check, Else, ElseIf, If, Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
import { Description, RenderExample } from './HelperComponents';

const Example9 = () => {
  return (
    <RenderExample title="Example 9: FizzBuzz">
      <Description>Loops and conditional rendering</Description>
      <div className="flex flex-wrap gap-2">
        <Loop<number> from={1} to={65}>
          <FizzBuzz />
        </Loop>
      </div>
    </RenderExample>
  );
};

export default Example9;

/*********************************************************************/
/* Helper types, components and methods are added below.             */
/*********************************************************************/

const cell = 'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 font-mono text-sm shadow-sm';
const wordCell = \`\${cell} border-green-200 bg-green-50 text-green-700\`;
const numberCell = \`\${cell} border-gray-200 bg-white text-gray-600\`;

const FizzBuzz: FC<IteratorProps<number>> = ({ data }) => {
  const value = data!;

  return (
    <Check>
      <If condition={value % 15 === 0}>
        <span className={wordCell}>FizzBuzz</span>
      </If>
      <ElseIf condition={value % 5 === 0}>
        <span className={wordCell}>Buzz</span>
      </ElseIf>
      <ElseIf condition={value % 3 === 0}>
        <span className={wordCell}>Fizz</span>
      </ElseIf>
      <Else>
        <span className={numberCell}>{value}</span>
      </Else>
    </Check>
  );
};
`;export{e as default};