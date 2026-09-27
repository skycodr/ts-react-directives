var e=`import { Check, Else, If, Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
import { Description, RenderExample } from './HelperComponents';

const projects: Project[] = [
  { name: 'Directives Core', active: true, members: 4 },
  { name: 'Docs Site', active: true, members: 2 },
  { name: 'Legacy CLI', active: false, members: 1 },
  { name: 'CDK Playground', active: true, members: 6 },
];

const Example7 = () => {
  return (
    <RenderExample title="Example 7: Depth-3 nesting (Loop → Check → Check)">
      <Description>
        Nested logic Loop -&gt; Check -&gt; Check. Nesting can be performed in any order. Also, demonstrates looping
        over descending order.
      </Description>
      <ul className="mt-3 space-y-2">
        <Loop over={projects} step={-1}>
          <Project />
        </Loop>
      </ul>
    </RenderExample>
  );
};

export default Example7;

/*********************************************************************/
/* Helper types, components and methods are added below.             */
/*********************************************************************/

type Project = {
  name: string;
  active: boolean;
  members: number;
};

const Project: FC<IteratorProps<Project>> = ({ data }) => {
  const project = data!;
  return (
    <li className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-md">
      <span className="font-medium text-gray-800">{project.name}</span>
      <Check>
        <If condition={project.active}>
          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full">active</span>
          <Check>
            <If condition={project.members >= 3}>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                full team ({project.members})
              </span>
            </If>
            <Else>
              <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
                small squad ({project.members})
              </span>
            </Else>
          </Check>
        </If>
        <Else>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">archived</span>
        </Else>
      </Check>
    </li>
  );
};
`;export{e as default};