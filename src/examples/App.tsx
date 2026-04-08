import { JSX, ReactNode } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Snippet1, Snippet2, Snippet3, Snippet4, Snippet5 } from './snippets';

import '@assets/examples.css';
import 'react-tabs/style/react-tabs.css';
import { Page } from './components/Page';

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
  {
    name: 'Example 4',
    title: 'Loop directive',
    description: 'This example demonstrates how to use the Loop directive to loop over an array.',
    Component: Snippet4,
  },
  {
    name: 'Example 5',
    title: 'Loop directive',
    description: '',
    Component: Snippet5,
  },
];

const useCreateTabContent = () => {
  const tabs: ReactNode[] = [];
  const panels: ReactNode[] = [];

  EXAMPLES.forEach(({ title, name, Component, description = '' }) => {
    const nameKey = name.replace('/ /g', '-');
    tabs.push(<Tab key={`tab-${nameKey}`}>{name}</Tab>);
    panels.push(
      <TabPanel key={`tab-panel-${nameKey}`}>
        <Page title={title} description={description}>
          <div className="trd-example">example</div>
          <div className="trd-demo">
            <Component />
          </div>
        </Page>
      </TabPanel>,
    );
  });

  return [tabs, panels];
};

function App() {
  const [tabList, tabPanels] = useCreateTabContent();
  return (
    <Tabs>
      <TabList>{tabList}</TabList>
      {tabPanels}
    </Tabs>
  );
}

export default App;
