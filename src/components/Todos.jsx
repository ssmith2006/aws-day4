export default function Todos({ todos, onHandleDelete, onhandleUpdate }) {


  return (
    <ul>
      {todos.map((todo) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", textDecoration: todo.completed ? "line-through" : "none"}}>
          <input
            onChange={() => onhandleUpdate(todo)}
            checked={todo.completed}
            type="checkbox"
            name="done"
            id="done"
          />
          <li key={todo.id}>{todo.input}</li>
          <button onClick={() => onHandleDelete(todo.id)}>X</button>
        </div>
      ))}
    </ul>
  );
}
