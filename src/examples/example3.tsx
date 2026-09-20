import { Check, Else, ElseIf, If } from '@directives';
import { useState } from 'react';
import { Slider } from './HelperComponents';

const ticks = [0, 35, 60, 80, 95, 100];

/**
 * Example 3: Tick slider — slide between grades and see the band per position.
 * 0-34 = R, 35-59 = S, 60-79 = C, 80-94 = B, 95-100 = A
 */
const Example3 = () => {
  const [score, setScore] = useState(0);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Example 3: Grade slider</h2>

      <Slider label="Score" min={0} max={100} ticks={ticks} value={score} onChange={setScore} />

      <div className="mt-4">
        <Check>
          <If condition={score < 35}>
            <span className="px-3 py-2 rounded-md font-medium bg-red-100 text-red-800">R</span>
          </If>
          <ElseIf condition={score < 60}>
            <span className="px-3 py-2 rounded-md font-medium bg-amber-100 text-amber-800">S</span>
          </ElseIf>
          <ElseIf condition={score < 80}>
            <span className="px-3 py-2 rounded-md font-medium bg-blue-100 text-blue-800">C</span>
          </ElseIf>
          <ElseIf condition={score < 95}>
            <span className="px-3 py-2 rounded-md font-medium bg-green-100 text-green-800">B</span>
          </ElseIf>
          <Else>
            <span className="px-3 py-2 rounded-md font-medium bg-emerald-100 text-emerald-800">A</span>
          </Else>
        </Check>
      </div>
    </section>
  );
};

export default Example3;
