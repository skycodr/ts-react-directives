import { Else, ElseIf, If, SwitchIf } from '@directives';
import { LogicErrors } from '@fixtures';
import { isValidElement } from 'react';

const validateSwitchIfChildren: ValidatorFn = (children) => {
  const errors: LogicErrors[] = [];

  if (children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected);
    return errors;
  }

  children.forEach((child) => {
    // @ts-expect-error type.name exists on the child
    const typeName = isValidElement(child) ? child.type.name : 'unknown';

    // If, ElseIf, Else cannot be direct children of If, ElseIf, Else
    if (typeName === If.name || typeName === ElseIf.name || typeName === Else.name) {
      errors.push(LogicErrors.SwitchBlockExpected);
    }
  });

  return errors;
};

const validateSwitchIf: ValidatorFn = (children) => {
  const errors: LogicErrors[] = [];
  const elements: Record<string, number> = {};

  if (children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected, LogicErrors.IfBlockExpected);
    return errors;
  }

  children.forEach((child, index) => {
    // @ts-expect-error type.name exists on the child
    const typeName = isValidElement(child) ? child.type.name : 'unknown';

    const count = elements[typeName] ?? 0;
    elements[typeName] = count + 1;

    validateIfBlock(typeName, index, elements, errors);
    validateElseBlock(typeName, index, children.length, elements, errors);
    validateElseIfBlock(typeName, index, errors);
    validateSwitchIfInvalidElement(typeName, errors);
  });

  if (!elements[If.name]) {
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
      case SwitchIf.name:
        validatorFn = validateSwitchIf;
        break;
      case If.name:
      case ElseIf.name:
      case Else.name:
        validatorFn = validateSwitchIfChildren;
        break;
      default:
        validatorFn = () => [];
    }

    return validatorFn;
  }
}
