import { Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

const Cell: FC<IteratorProps<number>> = ({ data }) => {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-mono text-gray-700 shadow-sm">
      {data}
    </span>
  );
};

/**
 * Example 9: Two nested loops rendering a 2D array (matrix).
 * The outer loop renders each row, the inner loop renders each cell.
 */
const Example9 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Example 9: Nested Loop — 2D matrix</h2>
      <div className="space-y-2">
        <Loop over={matrix}>
          {({ data: row }) =>
            row && (
              <div className="flex gap-2">
                <Loop over={row}>
                  <Cell />
                </Loop>
              </div>
            )
          }
        </Loop>
      </div>
    </section>
  );
};

export default Example9;
