import { useState } from "react";
import { Switch, If, Else, ElseIf } from "./directives";

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
      <Switch>
        <If condition={val === 0}>
          <div>if val = 0</div>
        </If>
        <ElseIf condition={val === 1}>
          <div>if val = 1</div>
          <button onClick={() => setVal2((prev) => !prev)}>sub</button>
          <Switch>
            <If condition={val2}>
              <div>if sub</div>
            </If>
          </Switch>
        </ElseIf>
        <ElseIf condition={val === 2}>
          <div>if val = 2</div>
        </ElseIf>
        <Else>
          <div>Else val = {val}</div>
        </Else>
      </Switch>
    </div>
  );
}

export default App;
