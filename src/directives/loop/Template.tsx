/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Template directive. Used as a child of the Loop directive to define the structure of each iteration.
 *
 */

import { Directives } from '@fixtures';
import { IteratorProps, DataShape, TemplateProps } from '@types';
import { cloneElement, isValidElement, ReactElement } from 'react';

/**
 * Template directive. Used as a child of the Loop directive to define the structure of each iteration.
 *
 * @param props
 * @returns
 */
const Template = <T extends DataShape = any>(props: TemplateProps<T>) => {
  const { index, data, children } = props;

  if (index === undefined || data === undefined) return null;

  return typeof children === 'function'
    ? children?.({ index, data })
    : isValidElement(children)
      ? cloneElement(children as ReactElement<Partial<IteratorProps<T>>>, props)
      : null;
};

Template.displayName = Directives.Template;

export default Template;
