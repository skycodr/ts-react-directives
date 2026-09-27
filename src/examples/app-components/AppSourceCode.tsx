import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AppSourceProps } from './types';

const AppSourceCode: FC<AppSourceProps> = ({ id, source }) => (
  <section id="source">
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />
        <h2 className="text-sm font-semibold text-slate-800">Source</h2>
      </div>
      <span className="font-mono text-xs text-slate-400">src/examples/example{id}.tsx</span>
    </div>
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#161b22] px-4 py-2">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </span>
        <span className="font-mono text-xs text-slate-500">example{id}.tsx</span>
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
);

export default AppSourceCode;
