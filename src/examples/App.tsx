import '@assets/index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 flex bg-amber-50">
        <i>@openbytes/ts-react-directives</i>
        <i>A declarative conditional rendering library for React</i>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r border-gray-100 flex overflow-y-auto p-4"></aside>
        <main className="flex-1 p-4 overflow-y-auto"></main>
      </div>
      <footer className="h-8 flex items-center justify-center bg-amber-50">
        A React Library by OpenBytes &amp; SkyCodr
      </footer>
    </div>
  );
}

export default App;
