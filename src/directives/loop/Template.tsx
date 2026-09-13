import { Directives } from '@fixtures';
import { DataShape, TemplateProps } from '@types';

const Template = <T extends DataShape>(props: TemplateProps<T>) => {
  const { index, data, children: fn } = props;

  if (index === undefined || data === undefined) return null;

  return fn?.({ index, data }) ?? null;
};

Template.displayName = Directives.Template;

export default Template;
