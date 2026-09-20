import { LogicErrors } from '@fixtures';
import { ComponentType, PropsWithChildren, ReactNode, ReactElement } from 'react';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type EnvConfigs = {
  mode: 'development' | 'production' | 'test';
  showErrors: boolean;
  showErrorsInProd: boolean;
  showErrorsInPlace: boolean;
};

export type ErrorReportingOptions = {
  mode?: EnvConfigs['mode'];
  showErrors?: boolean;
  showErrorsInProd?: boolean;
  showErrorsInPlace?: boolean;
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

export type LoopComputedShape<T> = {
  errors: LogicErrors[];
} & Nullable<LoopDataShape<T>>;

export type LoopProps<T extends DataShape> = PropsWithChildren<LoopDataShape<T>>;

export type IteratorDataShape<T extends DataShape> = {
  data: T;
  index: number;
};

export type LoopRenderFunction<T extends DataShape> = (data: IteratorDataShape<T>) => ReactNode;
export type LoopRenderElement<T extends DataShape> = ReactElement<Partial<ComponentType<T>>>;

export type TemplateProps<T extends DataShape> = Partial<IteratorDataShape<T>> & {
  children: LoopRenderFunction<T> | LoopRenderElement<T>;
};

export type ValidationProps = IfProps | ElseIfProps | ElseProps | LoopProps<DataShape>;
export type ValidatorFn<T extends ValidationProps> = (props: T) => LogicErrors[];

export type IteratorProps<D, P = {}> = P & Partial<IteratorDataShape<D>>;
