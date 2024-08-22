import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([
    { id: Math.random(), work: "Just for Checking", status: false },
    { id: Math.random(), work: "Just for Checking", status: false },
    { id: Math.random(), work: "Just for Checking", status: false },
  ]);

  const [work, setWork] = useState("");
  const [bool, setBool] = useState(true);
  const [updateid , setUpdateid] = useState(-1);

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
    
    if (updateid != -1) {
      const index = todos.findIndex(todo => todo.id == updateid)
      const completed = todos[index].status;
      todos[index] = obj;
      todos[index].status = completed;

      setTodos([...todos])
      setUpdateid(-1)
    } else {
      setTodos([...todos, obj]);
    }

    // setBool(true);
    setWork("");
  }

  function toggleTodoStatus(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  }

  function deleteTodo(id) {
    const deletetodos = todos.filter((todo) => todo.id !== id)
    setTodos(deletetodos)
  }

  function updatetodo(id){
      const todotoupdate = todos.filter((todo => todo.id === id))[0]
      setWork(todotoupdate.work)
      setUpdateid(id)
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
              <span
                className={`${
                  todo.status ? "text-decoration-line-through" : ""
                }`}
              >
                {todo.work}
              </span>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <h6>
                <span
                  className={`${
                    todo.status ? "badge text-bg-secondary mt-2" : "d-none"
                  }`}
                >
                  Completed
                </span>
              </h6>
              <span className="badge text-bg-danger mx-2 cursor-pointer" style={{cursor : "pointer"}} onClick={() => deleteTodo(todo.id)}>
                Delete
              </span>
              <span className="badge text-bg-danger mx-2 cursor-pointer" style={{cursor : "pointer"}}
               onClick={() => updatetodo(todo.id)}>
                Edit
              </span>
            </div>
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
          { updateid == -1 ? 'Add' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default App;
