import { lazy, useEffect, useState } from 'react';
import { AppExample, AppMenu, AppRoot, type ExampleEntry } from './app-components';

import '@assets/index.css';

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

const App = () => {
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
    <AppRoot>
      <AppMenu menuItems={examples} active={Active} handleSelection={setSelected} />
      <AppExample component={Active.component} source={source} id={selected} />
    </AppRoot>
  );
};

export default App;
