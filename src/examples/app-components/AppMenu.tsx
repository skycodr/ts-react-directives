import { Loop } from '@directives';
import { IteratorProps } from '@types';
import { FC } from 'react';
import { AppMenuItemProps, AppMenuProps, ExampleEntry } from './types';

const AppMenuItem: FC<IteratorProps<ExampleEntry, AppMenuItemProps<ExampleEntry>>> = ({
  data,
  handleSelection,
  active: Active,
}) => {
  const { id, label } = data!;
  const isSelected = Active?.id === id;
  return (
    <button
      type="button"
      onClick={() => handleSelection?.(id)}
      aria-current={isSelected ? 'page' : undefined}
      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${isSelected ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
    >
      <span className="mr-2 font-mono text-xs text-slate-400">{String(id).padStart(2, '0')}</span>
      {label}
    </button>
  );
};

const AppMenu: FC<AppMenuProps<ExampleEntry>> = ({ menuItems: examples, handleSelection, active }) => (
  <aside className="w-90 overflow-y-auto border-r border-slate-200 bg-white p-4">
    <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Examples</h2>
    <nav className="space-y-1">
      <Loop over={examples}>
        <AppMenuItem handleSelection={handleSelection} active={active} />
      </Loop>
    </nav>
  </aside>
);

export default AppMenu;
