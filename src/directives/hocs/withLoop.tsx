/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Create HOC for a given component
 *
 */
import { DataShape, IteratorProps } from '@types';
import { ComponentType } from 'react';

/**
 * Returns a higher-order component with injected data and index props
 *
 * @param Component React component to be wrapped
 * @returns Wrapped React component with injected data:T and index: number properties
 */
const withLoop = <T extends DataShape = any, P extends object = {}>(
  Component: ComponentType<P>,
): ComponentType<IteratorProps<T> & P> => {
  function WrappedComponent(props: Partial<T> & P) {
    return <Component {...(props as IteratorProps<T> & P)} />;
  }

  WrappedComponent.displayName = `withLoop_HOC(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent as unknown as ComponentType<IteratorProps<T> & P>;
};

export default withLoop;
