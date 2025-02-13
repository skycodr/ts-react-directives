declare type SwitchIfProps<T extends React.ReactNode = any> = React.PropsWithChildren<T>;
declare type IfProps<T extends React.ReactNode = any> = React.PropsWithChildren<T> & { condition: boolean };
declare type ElseIfProps<T extends React.ReactNode = any> = IfProps<T>;
declare type ElseProps<T extends React.ReactNode = any> = React.PropsWithChildren<T>;

declare type ValidatorFn = (children: Array<Exclude<React.ReactNode, boolean | null | undefined>>) => number[];

declare type ErrorProps = { errors: number[] };
