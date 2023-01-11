import { FormEvent, useState } from "react";
import "./App.css";

interface Item {
  name: string;
  score: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([
    { name: "Item1", score: 0 },
    { name: "Item2", score: 0 },
    { name: "Item3", score: 0 },
    { name: "Item4", score: 0 },
    { name: "Item5", score: 0 },
    { name: "Item6", score: 0 },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [compareIndex1, setCompareIndex1] = useState(0);
  const [compareIndex2, setCompareIndex2] = useState(1);

  const onStart = () => {
    setIsFormVisible(true);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const first = parseFloat(input1);
    const second = parseFloat(input2);

    if (first !== second) {
      const higher = first > second ? compareIndex1 : compareIndex2;
      const data = [...items];
      data[higher].score++;
      setItems(data);
    }
    setInput1("");
    setInput2("");

    if (compareIndex2 !== 5) {
      setCompareIndex2(compareIndex2 + 1);
    } else if (compareIndex1 !== 4) {
      setCompareIndex1(compareIndex1 + 1);
      setCompareIndex2(compareIndex1 + 2);
    } else {
      //end
      setIsFormVisible(false);
    }
  };

  const sortedItems = [...items].sort((a, b) => (a.score > b.score ? -1 : 1));
  const isEnd = compareIndex1 === 4 && compareIndex2 === 5 && !isFormVisible;
  return (
    <div className="App">
      <h1>GRM Test</h1>
      <table data-testid="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody data-testid="table-body">
          {sortedItems.map((item, index) => (
            <tr key={item.name}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isEnd && !isFormVisible ? (
        <button className="start-btn" onClick={onStart}>
          Start
        </button>
      ) : null}
      {isFormVisible ? (
        <form onSubmit={onFormSubmit} data-testid="form">
          <label>{items[compareIndex1].name} </label>
          <input
            data-testid="input1"
            className="inputs"
            type="number"
            value={input1}
            onChange={(e) => setInput1(e.currentTarget.value)}
          />
          <input
            data-testid="input2"
            className="inputs"
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.currentTarget.value)}
          />
          <label> {items[compareIndex2].name}</label>
          <br />
          <input
            data-testid="form-submit"
            className="form-submit"
            type="submit"
            disabled={input1 === "" || input2 === ""}
          />
        </form>
      ) : null}
    </div>
  );
}

export default App;
