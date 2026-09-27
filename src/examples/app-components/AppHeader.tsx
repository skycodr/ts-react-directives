import { FC } from 'react';

export const AppHeader: FC = () => (
  <header className="h-16 flex items-center justify-between border-b border-slate-200 bg-white px-6">
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-slate-900 to-slate-700 text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11 7 9l4-4m-1 9h8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 13 4 15l2 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold text-slate-900">@openbytes/ts-react-directives</h1>
        <p className="text-xs text-slate-500">Declarative conditional rendering for React</p>
      </div>
    </div>
    <div className="hidden items-center gap-3 sm:flex">
      <a
        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
        href="#live"
      >
        Example
      </a>
      <a
        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
        href="#source"
      >
        Source
      </a>
    </div>
  </header>
);

export default AppHeader;
