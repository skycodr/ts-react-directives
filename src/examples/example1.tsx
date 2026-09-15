import { Check, Else, ElseIf, If } from '@directives';
/**
 * Your code will have the above line as:
 *
 * import { ... } from '@openbytes/ts-react-directives';
 */

/**
 * Example 1: Basic If / ElseIf / Else selector.
 */
const Example1 = () => {
  const score = 85;

  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

  return (
    <section>
      <h2 className="text-xl font-semibold">Example 1: Conditional grade</h2>
      <p className="text-sm text-gray-600 mb-3">
        score: {score} → grade: {grade}
      </p>

      <Check>
        <If condition={score >= 90}>
          <span className="text-green-700">Excellent (A)</span>
        </If>
        <ElseIf condition={score >= 80}>
          <span className="text-blue-700">Very Good (B)</span>
        </ElseIf>
        <ElseIf condition={score >= 70}>
          <span className="text-amber-700">Good (C)</span>
        </ElseIf>
        <ElseIf condition={score >= 60}>
          <span className="text-orange-700">Fair (D)</span>
        </ElseIf>
        <Else>
          <span className="text-red-700">Fail (F)</span>
        </Else>
      </Check>
    </section>
  );
};

export default Example1;
