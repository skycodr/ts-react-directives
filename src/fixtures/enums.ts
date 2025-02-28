export enum LogicErrors {
  // Switch
  IfBlockExpected = 2001,
  OnlyOneIfBlockExpected = 2002,
  OnlyOneElseBlockExpected = 2003,
  SwitchBlockExpected = 2005,
  InvalidIfBlockOrdinal = 2004,
  InvalidElseBlockOrdinal = 2006,
  InvalidElseIfBlockOrdinal = 2007,

  // General

  InvalidElement = 3002,
  ChildrenExpected = 3003,
}

export enum DirectiveNames {
  If = 'If',
  ElseIf = 'ElseIf',
  Else = 'Else',
  SwitchIf = 'SwitchIf',
  Unknown = 'Unknown',
}
