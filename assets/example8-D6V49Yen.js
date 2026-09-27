var e=`import { Check, If, Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
import { Description, RenderExample } from './HelperComponents';

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

/**
 * Example 9: Two nested loops rendering a 2D array (matrix).
 * The outer loop renders each row, the inner loop renders each cell.
 */
const Example8 = () => {
  return (
    <RenderExample title="Example 8: Nested Loop — 2D matrix">
      <Description>Rendering a 2D matrix. It can also be rendered in place</Description>
      <Loop over={matrix}>
        <CellRow />
      </Loop>
    </RenderExample>
  );
};

export default Example8;

/*********************************************************************/
/* Helper types, components and methods are added below.             */
/*********************************************************************/

const CellRow: FC<IteratorProps<number[]>> = ({ data: row }) => {
  return (
    <Check>
      <If condition={!!row}>
        <div className="flex gap-2">
          <Loop over={row}>
            <Cell />
          </Loop>
        </div>
      </If>
    </Check>
  );
};

const Cell: FC<IteratorProps<number>> = ({ data }) => {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-mono text-gray-700 shadow-sm">
      {data}
    </span>
  );
};
`;export{e as default};