import { Check, Else, ElseIf, If } from '@directives';
import { FC, useState } from 'react';
import { Slider } from './HelperComponents';

type ColorNames = 'red' | 'amber' | 'blue' | 'green' | 'fuchsia';
type ColorTheme = {
  textColor: string;
  bgColor: string;
};
type ColorDict = {
  [C in ColorNames]: ColorTheme;
};
const colors: ColorDict = {
  red: { textColor: 'text-red-800', bgColor: 'bg-red-100' },
  amber: { textColor: 'text-amber-800', bgColor: 'bg-amber-100' },
  blue: { textColor: 'text-blue-800', bgColor: 'bg-blue-100' },
  green: { textColor: 'text-green-800', bgColor: 'bg-green-100' },
  fuchsia: { textColor: 'text-fuchsia-100', bgColor: 'bg-fuchsia-800' },
};

const ticks = [0, 35, 60, 80, 95, 100];

type GradeProps = {
  value: string;
  color: ColorNames;
};
const Grade: FC<GradeProps> = ({ value, color }) => {
  const { textColor, bgColor } = colors[color];
  return <span className={`px-3 py-2 rounded-md font-medium ${bgColor} ${textColor}`}>{value}</span>;
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
            <Grade value="A" color="fuchsia" />
          </Else>
        </Check>
      </div>
    </section>
  );
};

export default Example3;
