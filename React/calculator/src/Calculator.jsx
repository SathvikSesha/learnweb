import { useEffect, useState } from "react";
import "./calculator.css";

function Calculator() {
  const [exp, setExp] = useState("");
  const placeholders = ["Enter equations", "Try log(10)", "Try pow(2,3)"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const currentWord = placeholders[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 900);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  useEffect(() => {
    function handleKey(e) {
      const k = e.key;
      if (!isNaN(k) || "+-*/().,".includes(k)) setExp((prev) => prev + k);
      if (k === "Enter") solve();
      if (k === "Backspace") setExp((prev) => prev.slice(0, -1));
      if (k === "Escape") setExp("");
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // 🧮 Operator Precedence
  function precedence(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  }

  function applyOp(a, b, op) {
    a = Number(a);
    b = Number(b);
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b === 0 ? "Error" : a / b;
  }

  // 🔬 Scientific Functions
  function applyFunc(func, values) {
    if (func === "log") return Math.log10(values.pop());
    if (func === "exp") return Math.exp(values.pop());
    if (func === "pow") {
      const b = values.pop();
      const a = values.pop();
      return Math.pow(a, b);
    }
  }

  // 🚀 Solve Expression
  function solve() {
    try {
      let values = [];
      let ops = [];
      let i = 0;

      while (i < exp.length) {
        if (exp[i] === " ") {
          i++;
          continue;
        }

        // Number
        if (!isNaN(exp[i]) || exp[i] === ".") {
          let num = "";
          while (i < exp.length && (!isNaN(exp[i]) || exp[i] === ".")) {
            num += exp[i++];
          }
          values.push(parseFloat(num));
          continue;
        }

        // Functions
        if (/[a-z]/i.test(exp[i])) {
          let func = "";
          while (i < exp.length && /[a-z]/i.test(exp[i])) {
            func += exp[i++];
          }
          ops.push(func);
          continue;
        }

        if (exp[i] === "(") ops.push("(");
        else if (exp[i] === ")") {
          while (ops.length && ops[ops.length - 1] !== "(") {
            const op = ops.pop();
            if (["log", "exp", "pow"].includes(op))
              values.push(applyFunc(op, values));
            else {
              const b = values.pop();
              const a = values.pop();
              values.push(applyOp(a, b, op));
            }
          }
          ops.pop(); // remove "("
        } else if ("+-*/".includes(exp[i])) {
          while (
            ops.length &&
            precedence(ops[ops.length - 1]) >= precedence(exp[i])
          ) {
            const op = ops.pop();
            const b = values.pop();
            const a = values.pop();
            values.push(applyOp(a, b, op));
          }
          ops.push(exp[i]);
        }

        i++;
      }

      while (ops.length) {
        const op = ops.pop();
        if (["log", "exp", "pow"].includes(op))
          values.push(applyFunc(op, values));
        else {
          const b = values.pop();
          const a = values.pop();
          values.push(applyOp(a, b, op));
        }
      }

      const result = values.pop();
      setExp(result.toString());
    } catch {
      setExp("Error");
    }
  }

  return (
    <div className={`calc ${dark ? "dark" : ""}`}>
      <h1>Scientific Calculator</h1>
      <button className="theme-toggle" onClick={() => setDark((prev) => !prev)}>
        {dark ? "🌙 Dark" : "🌞 Light"}
      </button>

      <input
        type="text"
        value={exp}
        onChange={(e) => setExp(e.target.value)}
        placeholder={text}
      />

      <div className="buttons">
        {"789/456*123-0.+".split("").map((b, i) => (
          <button key={i} onClick={() => setExp((prev) => prev + b)}>
            {b}
          </button>
        ))}
        <button onClick={() => setExp((prev) => prev + "(")}>(</button>
        <button onClick={() => setExp((prev) => prev + ")")}>)</button>
        <button onClick={() => setExp((prev) => prev + ",")}>,</button>

        <button onClick={() => setExp((prev) => prev + "log(")}>log</button>
        <button onClick={() => setExp((prev) => prev + "exp(")}>exp</button>
        <button onClick={() => setExp((prev) => prev + "pow(")}>pow</button>

        <button onClick={() => setExp((prev) => prev.slice(0, -1))}>⌫</button>
        <button onClick={() => setExp("")}>C</button>
        <button className="equals" onClick={solve}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
