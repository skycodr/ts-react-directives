import { Loop } from '@directives';
import { Description, RenderExample } from './HelperComponents';

const mixedBag = [1, 2, 6, 32, 'hello', 1, 4, 5];

const Example10 = () => {
  return (
    <RenderExample title="Example 10: Break statement">
      <Description>Breaking out of the loop. Note: Break takes precedence over continue</Description>
      <div className="flex flex-wrap gap-2">
        <Loop over={mixedBag} breakOn={({ data }) => typeof data === 'string'}>
          {({ data }) => <span className="text-red-700 gap-2 p-3">{data}</span>}
        </Loop>
      </div>
    </RenderExample>
  );
};

export default Example10;
