import { LogicErrors } from '@fixtures';
import { ComponentType, PropsWithChildren, ReactElement, ReactNode } from 'react';

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

export type IteratorDataShape<T extends DataShape> = {
  data: T;
  index: number;
};
export type IteratorProps<T = {}, P = {}> = P & Partial<IteratorDataShape<T>>;

export type LoopRenderFunction<T extends DataShape> = (data: IteratorProps<T>) => ReactNode;
export type LoopRenderElement<T extends DataShape, P extends {} = any> = ReactElement<
  Partial<ComponentType<IteratorProps<T, P>>>
>;

export type ValidationProps<T extends DataShape = any> = IfProps | ElseIfProps | ElseProps | LoopProps<DataShape<T>>;
export type ValidatorFn<T extends ValidationProps> = (props: T) => LogicErrors[];

export type LoopProps<T extends DataShape> = LoopDataShape<T> & {
  children?: LoopRenderFunction<T> | LoopRenderElement<T> | ReactNode;
};
