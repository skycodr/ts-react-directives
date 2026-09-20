import { Check, Else, ElseIf, If, Loop, Template, withLoop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
/**
 * Your code will have the above line as:
 *
 * import { ... } from '@openbytes/ts-react-directives';
 */

interface User {
  name: string;
  role: 'admin' | 'moderator' | 'member';
}

const users: User[] = [
  { name: 'SkyCodr', role: 'admin' },
  { name: 'OpenBytes', role: 'moderator' },
  { name: 'SkyNote', role: 'member' },
  { name: 'CodePilot', role: 'member' },
];

/**
 * Example 6: Nested directives (depth 2).
 *
 * Outer `Loop` iterates over users with higher-order components and prop injection(verbose).
 */

/**
 * User component definition.
 */
const User: FC<IteratorProps<User>> = ({ data }) => {
  const user = data!;
  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md">
      <span className="font-medium text-gray-800">{user.name}</span>
      <Check>
        <If condition={user!.role === 'admin'}>
          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">Admin</span>
        </If>
        <ElseIf condition={user.role === 'moderator'}>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Moderator</span>
        </ElseIf>
        <Else>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">Member</span>
        </Else>
      </Check>
    </li>
  );
};

/**
 * Wrapped user component with prop injection
 *
 */
const WrappedUser = withLoop<User, {}>(User);

const Example6 = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold">Example 6: Loop with nested inline component</h2>
      <ul className="mt-3 space-y-2">
        <Loop over={users}>
          <Template>
            <WrappedUser />
          </Template>
        </Loop>
      </ul>
    </section>
  );
};

export default Example6;
