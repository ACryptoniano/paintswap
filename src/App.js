import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Ensure this is added to handle automatic chart initialization

const App = () => {
  const [inputs, setInputs] = useState({ A: "", B: "" });
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const { A, B } = inputs;
    let calcResult = 0;
    switch (operator) {
      case "+":
        calcResult = parseFloat(A) + parseFloat(B);
        break;
      case "-":
        calcResult = parseFloat(A) - parseFloat(B);
        break;
      case "*":
        calcResult = parseFloat(A) * parseFloat(B);
        break;
      case "/":
        calcResult = parseFloat(A) / parseFloat(B);
        break;
      default:
        break;
    }
    setResult(calcResult);
    setHistory([...history, { A, B, operator, result: calcResult }]);
  };

  const clear = () => {
    setInputs({ A: "", B: "" });
    setResult(null);
    setOperator("+");
  };

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Results",
        data: history.map((item) => item.result),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div>
      <h1>Calculator</h1>
      <input type="number" name="A" value={inputs.A} onChange={handleInputChange} />
      <input type="number" name="B" value={inputs.B} onChange={handleInputChange} />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <button onClick={calculate}>Calc</button>
      <button onClick={clear}>Clear</button>
      {result !== null && <h2>Result: {result}</h2>}
      <Line data={data} />
    </div>
  );
};

export default App;