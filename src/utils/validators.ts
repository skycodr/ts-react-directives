import { Else, ElseIf, If, SwitchIf } from '@directives';
import { LogicErrors } from '@fixtures';

import { ReactNode } from 'react';

type ValidatorFn = (children: Array<Exclude<ReactNode, boolean | null | undefined>>) => number[];

const validateSwitchIfChildren: ValidatorFn = (children) => {
  const errors: LogicErrors[] = [];

  if (children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected);
    return errors;
  }

  children.forEach((child) => {
    // @ts-expect-error child.type exist
    const { displayName } = child.type ?? {};

    // If, ElseIf, Else cannot be direct children of If, ElseIf, Else
    if (displayName === If.displayName || displayName === ElseIf.displayName || displayName === Else.displayName) {
      errors.push(LogicErrors.SwitchBlockExpected);
    }
  });

  return errors;
};

const validateSwitchIf: ValidatorFn = (children) => {
  const errors: LogicErrors[] = [];
  const elementLookup: Record<string, number> = {};

  if (children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected, LogicErrors.IfBlockExpected);
    return errors;
  }

  children.forEach((child, index) => {
    // @ts-expect-error child.type exist
    const { displayName = 'unknown' } = child.type;

    const count = elementLookup[displayName] ?? 0;
    elementLookup[displayName] = count + 1;

    validateIfBlock(displayName, index, elementLookup, errors);
    validateElseBlock(displayName, index, children.length, elementLookup, errors);
    validateElseIfBlock(displayName, index, errors);
    validateSwitchIfInvalidElement(displayName, errors);
  });

  if (!elementLookup[If.name]) {
    errors.push(LogicErrors.IfBlockExpected);
  }

  return errors;
};

const validateIfBlock = (typeName: string, index: number, elements: Record<string, number>, errors: LogicErrors[]) => {
  if (typeName === If.name) {
    if (index !== 0) {
      errors.push(LogicErrors.InvalidIfBlockOrdinal);
    }

    if (elements[If.name] > 1) {
      errors.push(LogicErrors.OnlyOneIfBlockExpected);
    }
  }
};

const validateElseBlock = (
  typeName: string,
  index: number,
  length: number,
  elements: Record<string, number>,
  errors: LogicErrors[],
) => {
  if (typeName === Else.name) {
    if (elements[Else.name] > 1) {
      errors.push(LogicErrors.OnlyOneElseBlockExpected);
    }
    if (index === 0 || index !== length - 1) {
      errors.push(LogicErrors.InvalidElseBlockOrdinal);
    }
  }
};

const validateElseIfBlock = (typeName: string, index: number, errors: LogicErrors[]) => {
  if (typeName === ElseIf.name && index === 0) {
    errors.push(LogicErrors.InvalidElseIfBlockOrdinal);
  }
};

const validateSwitchIfInvalidElement = (typeName: string, errors: LogicErrors[]) => {
  if (typeName !== If.name && typeName !== ElseIf.name && typeName !== Else.name) {
    errors.push(LogicErrors.InvalidElement);
  }
};

export class ValidationFactory {
  static get(validator: string) {
    let validatorFn: ValidatorFn;
    switch (validator) {
      case SwitchIf.displayName:
        validatorFn = validateSwitchIf;
        break;
      case If.displayName:
      case ElseIf.displayName:
      case Else.displayName:
        validatorFn = validateSwitchIfChildren;
        break;
      default:
        validatorFn = () => [];
    }

    return validatorFn;
  }
}
