/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Template directive. Used as a child of the Loop directive to define the structure of each iteration.
 *
 */

import { Directives } from '@fixtures';
import { DataShape, TemplateProps } from '@types';

/**
 * Template directive. Used as a child of the Loop directive to define the structure of each iteration.
 *
 * @param props
 * @returns
 */
const Template = <T extends DataShape>(props: TemplateProps<T>) => {
  const { index, data, children: fn } = props;

  if (index === undefined || data === undefined) return null;

  return fn?.({ index, data }) ?? null;
};

Template.displayName = Directives.Template;

export default Template;
