import { useEffect, useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import { createTodo, deleteTodo, scanTodos, toggleDone } from "./dynamo";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    scanTodos().then(setTodos);
  }, []);

  async function handleToggle(todo) {
    const flipped = !todo.completed;
    toggleDone(todo.id, flipped);
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, completed: flipped } : item
      )
    );
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((item) => item.id != id));
  }

  async function handleAdd() {
    if (!input.trim()) return;
    const item = { id: crypto.randomUUID(), input, completed: false };
    await createTodo(item);
    setInput("");
    setTodos((prev) => [...prev, item]);
  }

  return (
    <>
      <div>
        <h1>CRUD App</h1>

        <label>
          <input
            type="text"
            name="todo"
            id="todo"
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button onClick={handleAdd}>Add</button>
        <Todos todos={todos} onHandleDelete={handleDelete} onhandleUpdate={handleToggle} />

        <ul>
          {todos.map((item) => (
            <li key={item.id}>{item.input}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
