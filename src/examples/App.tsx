import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Snippet1, Snippet2, Snippet3 } from './snippets';
import { JSX } from 'react';

import '@assets/examples.css';
import 'react-tabs/style/react-tabs.css';

type ExampleInfo = {
  name: string;
  title: string;
  Component: () => JSX.Element;
  description?: string;
};

const EXAMPLES: ExampleInfo[] = [
  {
    name: 'Example 1',
    title: 'If directive',
    description: 'This example demonstrates how to use the If directive to conditionally render content.',
    Component: Snippet1,
  },
  {
    name: 'Example 2',
    title: 'If, Else directives',
    description: 'This example demonstrates how to use the If and Else directives to conditionally render content.',
    Component: Snippet2,
  },
  {
    name: 'Example 3',
    title: 'Conditional Rendering - If, ElseIf, Else directives',
    description: 'This example demonstrates how to use the If and ElseIf directives to conditionally render content.',
    Component: Snippet3,
  },
];

function App() {
  return (
    <Tabs>
      <TabList>
        {EXAMPLES.map(({ name }) => (
          <Tab key={`tab-${name.replace('/ /g', '-')}`}>{name}</Tab>
        ))}
      </TabList>
      {EXAMPLES.map(({ title, Component, description = '' }) => (
        <TabPanel key={`tab-panel-${title.replace('/ /g', '-')}`}>
          <br />
          <h2>{title}</h2>
          <p>{description}</p>
          <hr />
          <div className="examples">
            <Component />
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
}

export default App;
