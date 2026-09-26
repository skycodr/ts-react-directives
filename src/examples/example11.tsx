import { Loop } from '@directives';
import { Description, RenderExample } from './HelperComponents';

const mixedBag = ['Hello', 2, 6, 32, '!!!', 1, ' ', 'Mr.', 5, ' ', 3, 5, 23, 'world! :D', 24];

const Example11 = () => {
  return (
    <RenderExample title="Example 11: Continue statement">
      <Description>Continue the loop. Note: Break takes precedence over continue</Description>
      <div className="flex flex-wrap pt-2">
        <Loop over={mixedBag} continueOn={({ data }) => typeof data !== 'string'}>
          {({ data }) => <pre className="text-blue-700">{data}</pre>}
        </Loop>
      </div>
    </RenderExample>
  );
};

export default Example11;
