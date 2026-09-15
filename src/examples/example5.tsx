import { Check, Else, ElseIf, If } from '@directives';
/**
 * Your code will have the above line as:
 *
 * import { ... } from '@openbytes/ts-react-directives';
 */

/**
 * Example 5: If / ElseIf / Else branching on a score.
 */
const Example5 = () => {
  const score = 55;

  return (
    <section>
      <h2 className="text-xl font-semibold">Example 5: Grade selector</h2>
      <p className="text-sm text-gray-500 mt-1 mb-3">score: {score}</p>

      <Check>
        <If condition={score >= 90}>
          <span className="px-3 py-2 bg-green-100 text-green-800 rounded-md font-medium">Excellent (A)</span>
        </If>
        <ElseIf condition={score >= 75}>
          <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-md font-medium">Very Good (B)</span>
        </ElseIf>
        <ElseIf condition={score >= 60}>
          <span className="px-3 py-2 bg-amber-100 text-amber-800 rounded-md font-medium">Good (C)</span>
        </ElseIf>
        <Else>
          <span className="px-3 py-2 bg-red-100 text-red-800 rounded-md font-medium">Needs Improvement (D/F)</span>
        </Else>
      </Check>
    </section>
  );
};

export default Example5;
