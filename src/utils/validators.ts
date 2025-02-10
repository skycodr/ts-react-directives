import { Children, isValidElement } from "react";
import { LogicErrors } from "../fixtures";

/**
 * Validate if the children of the If directive are valid.
 * @param children
 * @returns
 */
const validateSwitchBlocks: ValidatorFn = (children) => {
  const _children = Children.toArray(children);
  const errors: LogicErrors[] = [];

  if (_children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected);
    return errors;
  }

  _children.forEach((child) => {
    // @ts-expect-error
    const typeName = isValidElement(child) ? child.type.name : "unknown";

    // If can't have a direct child of If, ElseIf, Else
    if (typeName === "If" || typeName === "ElseIf" || typeName === "Else") {
      errors.push(LogicErrors.SwitchBlockExpected);
    }
  });

  return errors;
};

const validateSwitch: ValidatorFn = (children) => {
  const _children = Children.toArray(children);
  const errors: LogicErrors[] = [];
  const elements: Record<string, number> = {};

  if (_children.length === 0) {
    errors.push(LogicErrors.IfBlockExpected);
    return errors;
  }

  _children.forEach((child, index) => {
    // @ts-expect-error
    const typeName = isValidElement(child) ? child.type.name : "unknown";

    const count = elements[typeName] ?? 0;
    elements[typeName] = count + 1;

    validateIfBlock(typeName, index, elements, errors);
    validateElseBlock(typeName, index, _children.length, elements, errors);
    validateElseIfBlock(typeName, index, errors);
    validateInvalidElement(typeName, errors);
  });

  if (!elements["If"]) {
    errors.push(LogicErrors.IfBlockExpected);
  }

  return errors;
};

const validateIfBlock = (typeName: string, index: number, elements: Record<string, number>, errors: LogicErrors[]) => {
  if (typeName === "If") {
    if (index !== 0) {
      errors.push(LogicErrors.InvalidIfBlockOrdinal);
    }

    if (elements["If"] > 1) {
      errors.push(LogicErrors.OnlyOneIfBlockExpected);
    }
  }
};

const validateElseBlock = (
  typeName: string,
  index: number,
  length: number,
  elements: Record<string, number>,
  errors: LogicErrors[]
) => {
  if (typeName === "Else") {
    if (elements["Else"] > 1) {
      errors.push(LogicErrors.OnlyOneElseBlockExpected);
    }
    if (index === 0 || index !== length - 1) {
      errors.push(LogicErrors.InvalidElseBlockOrdinal);
    }
  }
};

const validateElseIfBlock = (typeName: string, index: number, errors: LogicErrors[]) => {
  if (typeName === "ElseIf" && index === 0) {
    errors.push(LogicErrors.InvalidElseIfBlockOrdinal);
  }
};

const validateInvalidElement = (typeName: string, errors: LogicErrors[]) => {
  if (typeName !== "If" && typeName !== "ElseIf" && typeName !== "Else") {
    errors.push(LogicErrors.InvalidElement);
  }
};

export class ValidationFactory {
  static get(validator: string) {
    switch (validator) {
      case "Switch":
        return validateSwitch;
      case "If":
      case "ElseIf":
      case "Else":
        return validateSwitchBlocks;
      default:
        return () => [];
    }
  }
}
