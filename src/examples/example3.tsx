import { Check, Else, ElseIf, If } from '@directives';
import { FC, useState } from 'react';
import { Controls, Description, RenderExample, Slider } from './HelperComponents';

const Example3 = () => {
  const [score, setScore] = useState(0);

  return (
    <RenderExample title="Example 3: Grade slider">
      <Description>Demonstrating advance use case with a range tick slider.</Description>
      <Controls>
        <Slider label="Score" min={0} max={100} ticks={ticks} value={score} onChange={setScore} />
      </Controls>
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
    </RenderExample>
  );
};

export default Example3;

/*********************************************************************/
/* Helper types, components and methods are added below.             */
/*********************************************************************/

type ColorNames = 'red' | 'amber' | 'blue' | 'green' | 'fuchsia';
type ColorTheme = {
  textColor: string;
  bgColor: string;
};
type ColorDict = {
  [C in ColorNames]: ColorTheme;
};

type GradeProps = {
  value: string;
  color: ColorNames;
};
const Grade: FC<GradeProps> = ({ value, color }) => {
  const { textColor, bgColor } = colors[color];
  return <span className={`rounded-md px-3 py-2 font-medium ${bgColor} ${textColor}`}>{value}</span>;
};

const colors: ColorDict = {
  red: { textColor: 'text-red-800', bgColor: 'bg-red-100' },
  amber: { textColor: 'text-amber-800', bgColor: 'bg-amber-100' },
  blue: { textColor: 'text-blue-800', bgColor: 'bg-blue-100' },
  green: { textColor: 'text-green-800', bgColor: 'bg-green-100' },
  fuchsia: { textColor: 'text-fuchsia-100', bgColor: 'bg-fuchsia-800' },
};

const ticks = [0, 35, 60, 80, 95, 100];
