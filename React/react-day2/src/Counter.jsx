import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Count : {count}</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
      <button
        onClick={() => setCount((prev) => prev - 1)}
        disabled={count === 0}
      >
        Decrease
      </button>
      <button onClick={() => setCount(0)}>reset</button>
    </div>
  );
}
export default Counter;
