import { Loop } from '@directives';
import { Description, RenderExample } from './HelperComponents';

const Example5 = () => {
  return (
    <RenderExample title="Example 5: Odd numbers with inline component">
      <Description>Rendering from 1 - 9 while step = 2 (custom step), using inline render function.</Description>
      <div className="flex flex-wrap gap-2">
        <Loop<number> from={1} to={9} step={2}>
          {({ data }) => (
            <span className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm min-w-10 text-center">
              {data}
            </span>
          )}
        </Loop>
      </div>
    </RenderExample>
  );
};

export default Example5;
