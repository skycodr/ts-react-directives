/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description This file contains the logic to validate the directives.
 */

import { Directives, LogicErrors } from '@fixtures';
import {
  CheckProps,
  DataShape,
  ElseIfProps,
  ElseProps,
  IfProps,
  LoopComputedShape,
  LoopProps,
  ValidatorFn,
} from '@types';
import { Children } from 'react';

/**
 * Validate the children of Check directive
 *
 * @param children
 * @returns
 */
const validateCheckChildren: ValidatorFn<IfProps | ElseIfProps | ElseProps> = (props) => {
  const errors: LogicErrors[] = [];
  const children = Children.toArray(props.children);

  if (children?.length === 0) {
    errors.push(LogicErrors.ChildrenExpected);
    return errors;
  }

  children.forEach((child) => {
    // @ts-expect-error child.type exist
    const { displayName = Directives.Unknown } = child.type ?? {};

    // If, ElseIf, Else cannot be direct children of If, ElseIf, Else
    if (displayName === Directives.If || displayName === Directives.ElseIf || displayName === Directives.Else) {
      errors.push(LogicErrors.InvalidElement);
      errors.push(LogicErrors.CheckBlockExpected);
    }
  });

  return errors;
};

/**
 * Validate the Check directive and its children
 * @param children
 * @returns
 */
const validateCheck: ValidatorFn<CheckProps> = (props) => {
  const errors: LogicErrors[] = [];
  const lookupTable: Record<string, number> = {};
  const children = Children.toArray(props.children);

  if (children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected, LogicErrors.IfBlockExpected);
    return errors;
  }

  children.forEach((child, index) => {
    // @ts-expect-error child.type exist
    const { displayName = Directives.Unknown } = child.type ?? {};

    const count = lookupTable[displayName] ?? 0;
    lookupTable[displayName] = count + 1;

    validateIfBlock(displayName, index, lookupTable, errors);
    validateElseBlock(displayName, index, children.length, lookupTable, errors);
    validateElseIfBlock(displayName, index, errors);
    validateCheckInvalidElement(displayName, errors);
  });

  if (!lookupTable[Directives.If]) {
    errors.push(LogicErrors.IfBlockExpected);
  }

  return errors;
};

/**
 * Validate the If directive
 * @param elementName
 * @param index
 * @param elements
 * @param errors
 */
const validateIfBlock = (
  elementName: string,
  index: number,
  elements: Record<string, number>,
  errors: LogicErrors[],
) => {
  if (elementName === Directives.If) {
    if (index !== 0) {
      errors.push(LogicErrors.InvalidIfBlockOrdinal);
    }

    if (elements[Directives.If] > 1) {
      errors.push(LogicErrors.OnlyOneIfBlockExpected);
    }
  }
};

/**
 * Validate the Else directive
 * @param elementName
 * @param index
 * @param length
 * @param elements
 * @param errors
 */
const validateElseBlock = (
  elementName: string,
  index: number,
  length: number,
  elements: Record<string, number>,
  errors: LogicErrors[],
) => {
  if (elementName === Directives.Else) {
    if (elements[Directives.Else] > 1) {
      errors.push(LogicErrors.OnlyOneElseBlockExpected);
    }
    if (index === 0 || index !== length - 1) {
      errors.push(LogicErrors.InvalidElseBlockOrdinal);
    }
  }
};

/**
 * Validate the ElseIf directive
 * @param elementName
 * @param index
 * @param errors
 */
const validateElseIfBlock = (elementName: string, index: number, errors: LogicErrors[]) => {
  if (elementName === Directives.ElseIf && index === 0) {
    errors.push(LogicErrors.InvalidElseIfBlockOrdinal);
  }
};

/**
 * Validate the Check directive for invalid children/elements.
 * @param elementName
 * @param errors
 */
const validateCheckInvalidElement = (elementName: string, errors: LogicErrors[]) => {
  if (elementName !== Directives.If && elementName !== Directives.ElseIf && elementName !== Directives.Else) {
    errors.push(LogicErrors.InvalidElement);
  }
};

/**
 * Validate the Loop directive and its children
 * @param children
 * @param data
 * @returns
 */
const validateLoop: ValidatorFn<LoopProps<LoopComputedShape<DataShape>>> = (props) => {
  const errors: LogicErrors[] = [];

  const data = props as LoopComputedShape<DataShape>;
  const { errors: propErrors } = data;
  errors.push(...propErrors);

  const children = Children.toArray(props.children);

  // Validating structure

  if (children.length === 0) {
    errors.push(LogicErrors.ChildrenExpected, LogicErrors.TemplateBlockExpected);
  } else if (children.length > 1) {
    errors.push(LogicErrors.SingleChildExpected, LogicErrors.OnlyOneTemplateBlockExpected);
  } else {
    // @ts-expect-error child.type exist
    const { displayName = Directives.Unknown } = children[0].type;

    if (displayName !== Directives.Template) {
      errors.push(LogicErrors.InvalidElement, LogicErrors.TemplateBlockExpected);
    }
  }

  return errors;
};

/**
 * Factory class to get the validator function based on the directive name
 */
export class ValidationFactory {
  static get(validator: string) {
    let validatorFn: ValidatorFn<any> = () => [];

    switch (validator) {
      case Directives.Check:
        validatorFn = validateCheck;
        break;
      case Directives.If:
      case Directives.ElseIf:
      case Directives.Else:
        validatorFn = validateCheckChildren;
        break;
      case Directives.Loop:
        validatorFn = validateLoop;
        break;
    }

    return validatorFn;
  }
}
