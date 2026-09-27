import '@assets/index.css';
import { ComponentType, lazy, Suspense, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ExampleEntry = {
  id: number;
  label: string;
  component: ComponentType;
};

const loadExample = (index: number) => import(`./example${index}.tsx`);
const loadSource = (index: number): Promise<string> =>
  import(`./example${index}.tsx?raw`).then(({ default: source }) => source);

const examples: ExampleEntry[] = [
  { id: 1, label: 'What if', component: lazy(() => loadExample(1)) },
  { id: 2, label: 'Flip-Flop', component: lazy(() => loadExample(2)) },
  { id: 3, label: 'Rate me', component: lazy(() => loadExample(3)) },
  { id: 4, label: 'Fruity loops', component: lazy(() => loadExample(4)) },
  { id: 5, label: 'Oddities', component: lazy(() => loadExample(5)) },
  { id: 6, label: 'Lift off, on mark', component: lazy(() => loadExample(6)) },
  { id: 7, label: 'The project manager', component: lazy(() => loadExample(7)) },
  { id: 8, label: 'Neo: The One', component: lazy(() => loadExample(8)) },
  { id: 9, label: 'FizzBuzz', component: lazy(() => loadExample(9)) },
  { id: 10, label: 'Sad breakup', component: lazy(() => loadExample(10)) },
  { id: 11, label: 'Hello! world', component: lazy(() => loadExample(11)) },
  { id: 12, label: 'In-place / replace', component: lazy(() => loadExample(12)) },
];

function App() {
  const [selected, setSelected] = useState(1);
  const [source, setSource] = useState('');
  const Active = examples.find(({ id }) => id === selected) ?? examples[0];

  useEffect(() => {
    let active = true;
    loadSource(selected).then((loadedSource) => {
      if (active) setSource(loadedSource);
    });
    return () => {
      active = false;
    };
  }, [selected]);

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
                <span className="mr-2 font-mono text-xs text-slate-400">{String(id).padStart(2, '0')}</span>
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
              <Suspense fallback={<p className="text-sm text-slate-500">Loading example...</p>}>
                <Active.component />
              </Suspense>
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
                {source.replace('@directives', '@openbytes/ts-react-directive')}
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
