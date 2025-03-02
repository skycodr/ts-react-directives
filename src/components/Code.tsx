import { FC } from 'react';
import { Prism } from 'react-syntax-highlighter';

type CodeProps = {
  children: string;
};

const Code: FC<CodeProps> = ({ children }) => {
  return <Prism language="typescript">{children}</Prism>;
};

export default Code;
