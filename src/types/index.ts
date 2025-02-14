import { PropsWithChildren, ReactNode } from 'react';

export type SwitchIfProps<T extends ReactNode = any> = PropsWithChildren<T>;
export type IfProps<T extends ReactNode = any> = PropsWithChildren<T> & { condition: boolean };
export type ElseIfProps<T extends ReactNode = any> = IfProps<T>;
export type ElseProps<T extends ReactNode = any> = PropsWithChildren<T>;
