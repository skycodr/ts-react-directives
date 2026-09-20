import { LogicErrors } from '@fixtures';
import { ComponentType, PropsWithChildren, ReactElement, ReactNode } from 'react';

/** Maps every property of a type to its original type or `null`. */
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/** Runtime configuration for error reporting and environment behavior. */
export type EnvConfigs = {
  mode: 'development' | 'production' | 'test';
  showErrors: boolean;
  showErrorsInProd: boolean;
  showErrorsInPlace: boolean;
};

/** Optional overrides for the error-reporting configuration. */
export type ErrorReportingOptions = {
  mode?: EnvConfigs['mode'];
  showErrors?: boolean;
  showErrorsInProd?: boolean;
  showErrorsInPlace?: boolean;
};

/** Values supported by directive data and loop collections. */
export type DataShape<T = any> = undefined | null | string | number | boolean | [] | {} | T | T[];

// Check types
/** Props shared by check directives that only render their children. */
export type CheckProps = PropsWithChildren<{}>;
/** Props for conditionally rendering children when `condition` is true. */
export type IfProps = PropsWithChildren<{
  condition: boolean;
}>;
/** Props for conditionally rendering children when a preceding condition is false. */
export type ElseIfProps = PropsWithChildren<{
  condition: boolean;
}>;
/** Props for rendering children when all preceding conditions are false. */
export type ElseProps = PropsWithChildren<{}>;

// Loop types
/** Input options describing a numeric range or collection to iterate over. */
export type LoopDataShape<T extends DataShape> = {
  from?: number;
  to?: number;
  step?: number;
  over?: T[];
};

/** Evaluated loop values together with any validation errors. */
export type LoopComputedShape<T> = {
  errors: LogicErrors[];
} & Nullable<LoopDataShape<T>>;

/** A loop item and its zero-based position. */
export type IteratorDataShape<T extends DataShape> = {
  data: T;
  index: number;
};
/** Props supplied to an iterator, including optional item and index values. */
export type IteratorProps<T = {}, P = {}> = P & Partial<IteratorDataShape<T>>;

/** Render function used to produce content for each loop item. */
export type LoopRenderFunction<T extends DataShape> = (data: IteratorProps<T>) => ReactNode;
/** React element component type used to render each loop item. */
export type LoopRenderElement<T extends DataShape, P extends {} = any> = ReactElement<
  Partial<ComponentType<IteratorProps<T, P>>>
>;

/** Configures a loop and optionally provides content for each iteration. */
export type LoopProps<T extends DataShape> = Partial<
  LoopComputedShape<T> & {
    children?: LoopRenderFunction<T> | LoopRenderElement<T> | ReactNode;
  }
>;

/** Props accepted by validation functions for conditional and loop directives. */
export type ValidationProps<T extends DataShape = any> = IfProps | ElseIfProps | ElseProps | LoopProps<DataShape<T>>;
/** Validates directive props and returns any logic errors found. */
export type ValidatorFn<T extends ValidationProps> = (props: T) => LogicErrors[];
