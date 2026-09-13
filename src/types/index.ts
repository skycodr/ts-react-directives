import { LogicErrors } from '@fixtures';
import { PropsWithChildren, ReactNode } from 'react';

export type EnvConfigs = {
  mode: 'development' | 'production' | 'test';
  showErrors: boolean;
  showErrorsInProd: boolean;
  showErrorsInPlace: boolean;
};

export type ProcessDataShape = {
  process?: any;
  prefix: string;
};

export type DataShape<T = any> = undefined | null | string | number | boolean | [] | {} | T | T[];

// Check types
export type CheckProps = PropsWithChildren<{}>;
export type IfProps = PropsWithChildren<{
  condition: boolean;
}>;
export type ElseIfProps = PropsWithChildren<{
  condition: boolean;
}>;
export type ElseProps = PropsWithChildren<{}>;

// Loop types
export type LoopDataShape<T extends DataShape> = {
  from?: number;
  to?: number;
  step?: number;
  over?: T[];
};

export type LoopProps<T extends DataShape> = PropsWithChildren<LoopDataShape<T>>;

export type TemplateDataShape<T extends DataShape> = {
  data: T;
  index: number;
};

export type RenderFunction<T extends DataShape> = (data: TemplateDataShape<T>) => ReactNode;

export type TemplateProps<T extends DataShape> = Partial<TemplateDataShape<T>> & {
  children: RenderFunction<T>;
};

export type ValidationProps = IfProps | ElseIfProps | ElseProps | LoopProps<DataShape>;
export type ValidatorFn<T extends ValidationProps> = (props: T) => LogicErrors[];
