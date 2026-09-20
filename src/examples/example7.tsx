import { Check, Else, If, Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';

export interface Project {
  name: string;
  active: boolean;
  members: number;
}

const projects: Project[] = [
  { name: 'Directives Core', active: true, members: 4 },
  { name: 'Docs Site', active: true, members: 2 },
  { name: 'Legacy CLI', active: false, members: 1 },
  { name: 'CDK Playground', active: true, members: 6 },
];

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

/**
 * Example 7: Three levels of nested directives.
 *
 * Level 1: `Loop` over the projects
 * Level 2: `Check` on project.active (If → active / Else → archived)
 * Level 3: nested `Check` on team size (If ≥ 3 → full team / Else → small squad)
 */
const Example7 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 7: Depth-3 nesting (Loop → Check → Check)</h2>
      <ul className="mt-3 space-y-2">
        <Loop over={projects}>
          <Project />
        </Loop>
      </ul>
    </section>
  );
};

export default Example7;
