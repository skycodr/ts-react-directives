import { FC } from "react";
import { LogicErrors } from "../fixtures";

import "../assets/index.css";

const ERRORS: Record<LogicErrors, string> = {
  [LogicErrors.IfBlockExpected]: "Missing 'If'",
  [LogicErrors.OnlyOneIfBlockExpected]: "Can only have one 'If'",
  [LogicErrors.OnlyOneElseBlockExpected]: "Can only have one 'Else'",
  [LogicErrors.SwitchBlockExpected]: "'If', 'ElseIf', 'Else' need to be wrapped in 'Switch'",
  [LogicErrors.InvalidElseBlockOrdinal]: "Invalid ordinal, 'Else' should be the last",
  [LogicErrors.InvalidIfBlockOrdinal]: "Invalid ordinal, 'If' block should be the first",
  [LogicErrors.InvalidElement]: "Invalid element",
  [LogicErrors.ChildrenExpected]: "Should at least have one child",
  [LogicErrors.InvalidElseIfBlockOrdinal]: "Cannot have 'ElseIf' before 'If'",
};

const Errors: FC<{ errors: LogicErrors[] }> = ({ errors }) => (
  <ol className="error-list">
    {errors.map((error, index) => (
      <li key={`${error}-${index}`}>{ERRORS[error]}</li>
    ))}
  </ol>
);

export default Errors;
