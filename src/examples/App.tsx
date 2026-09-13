import '@assets/index.css';
import { Check, Else, ElseIf, If, Loop, Template } from '@directives';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 flex bg-amber-50">
        <i>@openbytes/ts-react-directives</i>
        <i>A declarative conditional rendering library for React</i>
      </header>
      <div className="flex-1 flex-col">
        <aside className="flex-1 flex-col w-64 border-r border-gray-200 overflow-y-auto p-4">abc</aside>
        <main className="flex-2 p-4 overflow-y-auto bg-amber-100">
          <Check>
            <If condition={true}>
              <h1 className="text-2xl font-bold">if</h1>
            </If>
            <ElseIf condition={true}>
              <h1 className="text-2xl font-bold">elif</h1>
            </ElseIf>
            <Else>
              <h1 className="text-2xl font-bold">else</h1>
            </Else>
          </Check>
          <Loop over={['a', 'b', 'c']}>
            <Template<string>>
              {({ data, index }) => <div className="p-2 border border-gray-300 rounded">{`item-${data}-${index}`}</div>}
            </Template>
          </Loop>
        </main>
      </div>
      <footer className="h-8 flex items-center justify-center bg-amber-50">
        A React Library by OpenBytes &amp; SkyCodr
      </footer>
    </div>
  );
}

export default App;
