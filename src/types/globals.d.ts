type SwitchProps<T extends React.ReactNode = any> = React.PropsWithChildren<T>;
type IfProps<T extends React.ReactNode = any> = React.PropsWithChildren<T> & { condition: boolean };
type ElseIfProps<T extends React.ReactNode = any> = IfProps<T>;
type ElseProps<T extends React.ReactNode = any> = React.PropsWithChildren<T>;

type ErrorProps = { errors: number[] };

type ValidatorFn = (children: Array<Exclude<ReactNode, boolean | null | undefined>>) => number[];
