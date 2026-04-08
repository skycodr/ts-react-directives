export enum LogicErrors {
  // Check
  IfBlockExpected = 2001,
  OnlyOneIfBlockExpected = 2002,
  OnlyOneElseBlockExpected = 2003,
  CheckBlockExpected = 2005,
  InvalidIfBlockOrdinal = 2004,
  InvalidElseBlockOrdinal = 2006,
  InvalidElseIfBlockOrdinal = 2007,

  // Loop
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
