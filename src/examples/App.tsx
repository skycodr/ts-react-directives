import { useState } from 'react';
import { SwitchIf, If, Else, ElseIf } from '@directives';

function App() {
  const [val, setVal] = useState(-1);
  const [val2, setVal2] = useState(false);
  return (
    <div>
      <h1>
        Selected value {val} - sub value {val2.toString()}
      </h1>
      <button onClick={() => setVal(0)}>0</button>
      <button onClick={() => setVal(1)}>1</button>
      <button onClick={() => setVal(2)}>2</button>
      <button onClick={() => setVal(3)}>3</button>
      <button onClick={() => setVal2((prev) => !prev)}>Nested If</button>
      <SwitchIf>
        <If condition={val === 0}>
          <div>If value = 0</div>
        </If>
        <ElseIf condition={val === 1}>
          <div>ElseIf value = 1</div>
          <SwitchIf>
            <If condition={val2}>
              <div style={{ color: 'blue' }}>Sub If value = true</div>
            </If>
            <Else>
              <div style={{ color: 'red' }}>Sub Else value = false</div>
            </Else>
          </SwitchIf>
        </ElseIf>
        <ElseIf condition={val === 2}>
          <div>ElseIf value = 2</div>
        </ElseIf>
        <Else>
          <div>Else (fall through {val} )</div>
        </Else>
      </SwitchIf>
    </div>
  );
}

export default App;
