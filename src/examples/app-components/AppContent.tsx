import { FC, PropsWithChildren } from 'react';

const AppContent: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-1 overflow-hidden">{children}</div>
);

export default AppContent;
