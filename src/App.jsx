import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([
    { id: Math.random(), work: "Just for Checking", status: false },
    { id: Math.random(), work: "Just for Checking", status: false },
    { id: Math.random(), work: "Just for Checking", status: false },
  ]);

  const [work, setWork] = useState("");
  const [bool, setBool] = useState(true);

  function addTodohandler(e) {
    e.preventDefault();
    if (work.length < 1) {
      setBool(false);
      return false;
    }
    const obj = {
      id: Math.random(),
      work,
      status: false,
    };
    setTodos([...todos, obj]);
    setBool(true);
    setWork("");
  }


  function toggleTodoStatus(id) {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status: !todo.status } : todo
    ));
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-3">To-Do List</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                className="form-check-input mx-2"
                type="checkbox"
                onChange={() => toggleTodoStatus(todo.id)}
                aria-label="Checkbox for following text input"
              />
              {todo.work}
            </div>
            <h6>
              <span className={`${todo.status ? "badge text-bg-secondary mt-2" : "d-none"}`}>Completed</span>
            </h6>
          </li>
        ))}
      </ul>
      <form className="mb-4 mt-4">
        <h3>Todo</h3>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${
              bool ? "border border-primary" : "border border-danger"
            } `}
            placeholder="Add a new to-do..."
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-secondary"
          style={{ marginTop: "20px" }}
          onClick={addTodohandler}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
