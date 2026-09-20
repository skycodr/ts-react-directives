import { Check, Else, ElseIf, If } from '@directives';
import { FC, useState } from 'react';
import { Slider } from './HelperComponents';

const ticks = [0, 35, 60, 80, 95, 100];

type GradeProps = {
  value: string;
  color: string;
};
const Grade: FC<GradeProps> = ({ value, color }) => {
  return <span className={`px-3 py-2 rounded-md font-medium bg-${color}-100 text-${color}-800`}>{value}</span>;
};
/**
 * Example 3: Tick slider — slide between grades and see the band per position.
 * 0-34 = R, 35-59 = S, 60-79 = C, 80-94 = B, 95-100 = A
 *
 * Note! this is just an example to show how to use declarative syntax.
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
            <Grade value="R" color="red" />
          </If>
          <ElseIf condition={score < 60}>
            <Grade value="S" color="amber" />
          </ElseIf>
          <ElseIf condition={score < 80}>
            <Grade value="C" color="blue" />
          </ElseIf>
          <ElseIf condition={score < 95}>
            <Grade value="B" color="green" />
          </ElseIf>
          <Else>
            <Grade value="A" color="emerald" />
          </Else>
        </Check>
      </div>
    </section>
  );
};

export default Example3;
