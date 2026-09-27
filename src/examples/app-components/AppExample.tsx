import { FC } from 'react';
import { AppExampleProps } from './types';
import AppSourceLive from './AppSourceLive';
import AppSourceCode from './AppSourceCode';

const AppExample: FC<AppExampleProps> = ({ component, source, id }) => (
  <main className="flex-1 overflow-y-auto p-6">
    <AppSourceLive component={component} />
    <AppSourceCode source={source} id={id} />
  </main>
);

export default AppExample;
