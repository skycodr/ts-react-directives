import { ElseIfProps, ElseProps, IfProps, SwitchIfProps } from '@types';
import { FC } from 'react';

export * from '@directives';

// Generate the necessary typings
export declare const SwitchIf: FC<SwitchIfProps>;
export declare const If: FC<IfProps>;
export declare const ElseIf: FC<ElseIfProps>;
export declare const Else: FC<ElseProps>;
