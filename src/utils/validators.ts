import { DirectiveNames, LogicErrors } from '@fixtures';
import { log } from '@utils';

import { ReactNode } from 'react';

type ValidatorFn = (children: Array<Exclude<ReactNode, boolean | null | undefined>>) => number[];

/**
 * Validate the children of SwitchIf directive
 * @param children
 * @returns
 */
const validateSwitchIfChildren: ValidatorFn = (children) => {
  const errors: LogicErrors[] = [];

  if (children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected);
    return errors;
  }

  children.forEach((child) => {
    // @ts-expect-error child.type exist
    const { displayName = DirectiveNames.Unknown } = child.type ?? {};

    // If, ElseIf, Else cannot be direct children of If, ElseIf, Else
    if (
      displayName === DirectiveNames.If ||
      displayName === DirectiveNames.ElseIf ||
      displayName === DirectiveNames.Else
    ) {
      log('If, ElseIf, Else cannot be direct children of If, ElseIf, Else');
      errors.push(LogicErrors.InvalidElement);
      errors.push(LogicErrors.SwitchBlockExpected);
    }
  });

  return errors;
};

/**
 * Validate the SwitchIf directive
 * @param children
 * @returns
 */
const validateSwitchIf: ValidatorFn = (children) => {
  const errors: LogicErrors[] = [];
  const lookupTable: Record<string, number> = {};

  log('1. validate switch if');

  if (children.length === 0) {
    log('2. children expected');
    errors.push(LogicErrors.ChildrenExpected, LogicErrors.IfBlockExpected);
    return errors;
  }

  children.forEach((child, index) => {
    // @ts-expect-error child.type exist
    const { displayName = DirectiveNames.Unknown } = child.type;
    log('3. validate switch if - display name', displayName);

    const count = lookupTable[displayName] ?? 0;
    lookupTable[displayName] = count + 1;

    log('4. element look up', lookupTable);

    validateIfBlock(displayName, index, lookupTable, errors);
    validateElseBlock(displayName, index, children.length, lookupTable, errors);
    validateElseIfBlock(displayName, index, errors);
    validateSwitchIfInvalidElement(displayName, errors);
  });

  if (!lookupTable[DirectiveNames.If]) {
    log('5. if block expected - no if in lookup');
    errors.push(LogicErrors.IfBlockExpected);
  }

  return errors;
};

const validateIfBlock = (
  elementName: string,
  index: number,
  elements: Record<string, number>,
  errors: LogicErrors[],
) => {
  log('6. validate if block', elementName, index, elements);
  if (elementName === DirectiveNames.If) {
    if (index !== 0) {
      errors.push(LogicErrors.InvalidIfBlockOrdinal);
    }

    if (elements[DirectiveNames.If] > 1) {
      errors.push(LogicErrors.OnlyOneIfBlockExpected);
    }
  }
};

const validateElseBlock = (
  elementName: string,
  index: number,
  length: number,
  elements: Record<string, number>,
  errors: LogicErrors[],
) => {
  if (elementName === DirectiveNames.Else) {
    if (elements[DirectiveNames.Else] > 1) {
      errors.push(LogicErrors.OnlyOneElseBlockExpected);
    }
    if (index === 0 || index !== length - 1) {
      errors.push(LogicErrors.InvalidElseBlockOrdinal);
    }
  }
};

const validateElseIfBlock = (elementName: string, index: number, errors: LogicErrors[]) => {
  if (elementName === DirectiveNames.ElseIf && index === 0) {
    errors.push(LogicErrors.InvalidElseIfBlockOrdinal);
  }
};

const validateSwitchIfInvalidElement = (elementName: string, errors: LogicErrors[]) => {
  if (
    elementName !== DirectiveNames.If &&
    elementName !== DirectiveNames.ElseIf &&
    elementName !== DirectiveNames.Else
  ) {
    errors.push(LogicErrors.InvalidElement);
  }
};

export class ValidationFactory {
  static get(validator: string) {
    let validatorFn: ValidatorFn = () => [];
    switch (validator) {
      case DirectiveNames.SwitchIf:
        log('getting validation fn for switch if');
        validatorFn = validateSwitchIf;
        break;
      case DirectiveNames.If:
      case DirectiveNames.ElseIf:
      case DirectiveNames.Else:
        log('getting validation fn for switch if children');
        validatorFn = validateSwitchIfChildren;
        break;
    }

    return validatorFn;
  }
}
