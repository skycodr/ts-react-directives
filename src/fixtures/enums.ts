export enum LogicErrors {
  // Check
  IfBlockExpected = 1001,
  OnlyOneIfBlockExpected = 1002,
  OnlyOneElseBlockExpected = 1003,
  CheckBlockExpected = 1005,
  InvalidIfBlockOrdinal = 1004,
  InvalidElseBlockOrdinal = 1006,
  InvalidElseIfBlockOrdinal = 1007,

  // Loop
  MalformedLoopBounds = 2001,
  MalformedLoopParams = 2002,
  MalformedLoop = 2008,
  InfiniteLoopCondition = 2009,
  TemplateBlockExpected = 2012,
  OnlyOneTemplateBlockExpected = 2013,
  EmptyLoopSource = 2014,

  // General

  InvalidElement = 3002,
  ChildrenExpected = 3003,
  SingleChildExpected = 3004,
}

export enum Directives {
  If = 'If',
  ElseIf = 'ElseIf',
  Else = 'Else',
  Check = 'Check',
  Loop = 'Loop',
  LoopProps = 'LoopProps',
  Template = 'Template',
  Unknown = 'Unknown',
}
