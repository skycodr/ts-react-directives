import { LogicErrors } from './enums';

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
};
