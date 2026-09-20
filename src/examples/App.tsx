import '@assets/index.css';
import { useMemo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Example1 from './example1';
import Example2 from './example2';
import Example3 from './example3';
import Example4 from './example4';
import Example5 from './example5';
import Example6 from './example6';
import Example7 from './example7';
import Example8 from './example8';
import Example9 from './example9';

import example1Source from './example1.tsx?raw';
import example2Source from './example2.tsx?raw';
import example3Source from './example3.tsx?raw';
import example4Source from './example4.tsx?raw';
import example5Source from './example5.tsx?raw';
import example6Source from './example6.tsx?raw';
import example7Source from './example7.tsx?raw';
import example8Source from './example8.tsx?raw';
import example9Source from './example9.tsx?raw';

type ExampleEntry = {
  id: number;
  label: string;
  component: () => import('react').JSX.Element;
  source: string;
};

const examples: ExampleEntry[] = [
  { id: 1, label: 'If / ElseIf / Else (grade)', component: Example1, source: example1Source },
  { id: 2, label: 'Loop over a list', component: Example2, source: example2Source },
  { id: 3, label: 'Numeric range (odd numbers)', component: Example3, source: example3Source },
  { id: 4, label: 'Descending countdown', component: Example4, source: example4Source },
  { id: 5, label: 'If / ElseIf / Else (score)', component: Example5, source: example5Source },
  { id: 6, label: 'Loop with nested inline component', component: Example6, source: example6Source },
  { id: 7, label: 'Depth-3: Loop → Loop → Check (org tree)', component: Example7, source: example7Source },
  { id: 8, label: 'In-place errors (Loop + Check)', component: Example8, source: example8Source },
  { id: 9, label: 'Simple Loop declarative syntax', component: Example9, source: example9Source },
];

function App() {
  const [selected, setSelected] = useState(1);
  const Active = useMemo(() => examples.find(({ id }) => id === selected) ?? examples[0], [selected]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
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

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-90 overflow-y-auto border-r border-slate-200 bg-white p-4">
          <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Examples</h2>
          <nav className="space-y-1">
            {examples.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                aria-current={selected === id ? 'page' : undefined}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  selected === id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={`mr-2 font-mono text-xs ${selected === id ? 'text-slate-400' : 'text-slate-400'}`}>
                  {String(id).padStart(2, '0')}
                </span>
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <section id="live" className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <h2 className="text-sm font-semibold text-slate-800">Live render</h2>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Active.component />
            </div>
          </section>

          <section id="source">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <h2 className="text-sm font-semibold text-slate-800">Source</h2>
              </div>
              <span className="font-mono text-xs text-slate-400">src/examples/example{selected}.tsx</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800 bg-[#161b22] px-4 py-2">
                <span className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </span>
                <span className="font-mono text-xs text-slate-500">example{selected}.tsx</span>
              </div>
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                showLineNumbers
                lineNumberStyle={{ color: '#4b5563', minWidth: '2.5em', paddingRight: '1em' }}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'transparent',
                  fontSize: '12.5px',
                  lineHeight: 1.7,
                }}
                codeTagProps={{ style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' } }}
              >
                {Active.source}
              </SyntaxHighlighter>
            </div>
          </section>
        </main>
      </div>

      <footer className="flex h-12 items-center justify-center border-t border-slate-200 bg-white">
        <p className="text-xs text-slate-500">A React library by OpenBytes &amp; SkyCodr</p>
      </footer>
    </div>
  );
}

export default App;
