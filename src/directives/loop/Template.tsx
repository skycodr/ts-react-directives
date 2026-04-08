import { Directives } from '@fixtures';
import { DataShape } from '@types';
import { ReactNode } from 'react';

type MetaData<T extends DataShape> = {
  data: T;
  index: number;
};

type RenderFunction<T extends DataShape> = (data: MetaData<T>) => ReactNode;

export type TemplateProps<T extends DataShape> = Partial<MetaData<T>> & {
  children: RenderFunction<T>;
};

const Template = <T extends DataShape>(props: TemplateProps<T>) => {
  const { index, data, children: fn } = props;

  if (index === undefined || data === undefined) {
    return null;
  }

  const element = fn?.({ index, data }) ?? null;
  return element;
};

Template.displayName = Directives.Template;

export default Template;
