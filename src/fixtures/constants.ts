/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description All lib level constants are defined here
 */

import { LogicErrors } from '@fixtures';

export const ERRORS: Record<LogicErrors, string> = {
  [LogicErrors.IfBlockExpected]: "Missing 'If'",
  [LogicErrors.OnlyOneIfBlockExpected]: "Can only have one 'If'",
  [LogicErrors.OnlyOneElseBlockExpected]: "Can only have one 'Else'",
  [LogicErrors.CheckBlockExpected]: "'If', 'ElseIf', 'Else' need to be wrapped in 'Check'",
  [LogicErrors.InvalidElseBlockOrdinal]: "Invalid ordinals, 'Else' should be the last",
  [LogicErrors.InvalidIfBlockOrdinal]: "Invalid ordinals, 'If' block should be the first",
  [LogicErrors.InvalidElseIfBlockOrdinal]: "Invalid ordinals, cannot have 'ElseIf' before 'If'",
  [LogicErrors.ChildrenExpected]: 'Should at least have one child',
  [LogicErrors.InvalidElement]: 'Invalid element',
  [LogicErrors.MalformedLoop]: 'Malformed loop',
  [LogicErrors.EmptyLoopSource]: 'Empty loop source',
  [LogicErrors.InfiniteLoopCondition]: 'Infinite loop condition',
  [LogicErrors.SingleChildExpected]: 'Can have only a single child',
  [LogicErrors.MalformedLoopBounds]: 'Malformed loop bounds',
  [LogicErrors.MalformedLoopParams]: 'Malformed loop params',
  [LogicErrors.MaxLoopIterationsExceeded]: 'Maximum loop iterations exceeded',
};
