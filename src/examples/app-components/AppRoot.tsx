import { FC, PropsWithChildren } from 'react';
import { AppContent, AppFooter, AppHeader } from '.';

const AppRoot: FC<PropsWithChildren> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <AppHeader />
    <AppContent>{children}</AppContent>
    <AppFooter />
  </div>
);

export default AppRoot;
