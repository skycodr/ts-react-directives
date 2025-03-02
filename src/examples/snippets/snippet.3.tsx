import '@assets/examples.css';
import { Code } from '@components';
import { Check, Else, ElseIf, If } from '@directives';
import { ChangeEvent, useState } from 'react';

const Component = () => {
  const [selectedDay, setSelectedDay] = useState<number | undefined>();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(parseInt(e.target.value, 10));
  };
  const WEEK_DAYS = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

  return (
    <div className="container">
      <label htmlFor="week">
        Select an item from the dropdown{' '}
        <select id="week" onChange={handleChange}>
          {WEEK_DAYS.map((day, index) => (
            <option key={day} value={index}>
              {day}
            </option>
          ))}
        </select>
      </label>
      <Check>
        <If condition={!!selectedDay && (WEEK_DAYS[selectedDay] === 'Sunday' || WEEK_DAYS[selectedDay] === 'Saturday')}>
          <div className="content">The selected day is '{WEEK_DAYS[selectedDay!]}' and is the weekend</div>
        </If>
        <ElseIf condition={!!selectedDay && WEEK_DAYS[selectedDay] === 'Wednesday'}>
          <div className="content">The selected day is '{WEEK_DAYS[selectedDay!]}' and is midweek</div>
        </ElseIf>
        <ElseIf condition={!!selectedDay}>
          <div className="content">
            The selected day is '{WEEK_DAYS[selectedDay!]}' and is a weekday other than 'Wednesday'
          </div>
        </ElseIf>
        <Else>
          <div className="content">Please select a day</div>
        </Else>
      </Check>
    </div>
  );
};

const codeString = `
import { Check, Else, ElseIf, If } from '@openbytes/ts-react-directives';
import { ChangeEvent, useState } from 'react';

export const Snippet = () => {
  const [selectedDay, setSelectedDay] = useState<number | undefined>();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(parseInt(e.target.value, 10));
  };
  const WEEK_DAYS = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

  return (
    <div className="container">
      <label htmlFor="week">
        Select an item from the dropdown{' '}
        <select id="week" onChange={handleChange}>
          {WEEK_DAYS.map((day, index) => (
            <option key={day} value={index}>
              {day}
            </option>
          ))}
        </select>
      </label>
      <Check>
        <If condition={!!selectedDay && (WEEK_DAYS[selectedDay] === 'Sunday' || WEEK_DAYS[selectedDay] === 'Saturday')}>
          <div className="content">The selected day is '{WEEK_DAYS[selectedDay!]}' and is the weekend</div>
        </If>
        <ElseIf condition={!!selectedDay && WEEK_DAYS[selectedDay] === 'Wednesday'}>
          <div className="content">The selected day is '{WEEK_DAYS[selectedDay!]}' and is midweek</div>
        </ElseIf>
        <ElseIf condition={!!selectedDay}>
          <div className="content">
            The selected day is '{WEEK_DAYS[selectedDay!]}' and is a weekday other than 'Wednesday'
          </div>
        </ElseIf>
        <Else>
          <div className="content">Please select a day</div>
        </Else>
      </Check>
    </div>
  );
};
`;

export const Snippet = () => {
  return (
    <div className="container">
      <div>
        <h1>Example Code</h1>
        <Code>{codeString}</Code>;
      </div>
      <div>
        <h1>Demo</h1>
        <Component />
      </div>
    </div>
  );
};

export default Snippet;
