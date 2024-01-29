import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (todoInput.trim() !== "") {
      setTodos([...todos, { text: todoInput, completed: false }]);
      setTodoInput("");
    }
  };

  const deleteCheck = (index) => {
    const updatedTodos = [...todos];

    if (updatedTodos[index].completed) {
      updatedTodos.splice(index, 1);
    } else {
      updatedTodos[index].completed = !updatedTodos[index].completed;
    }

    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const filterTodo = (e) => {
    setFilter(e.target.value);
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(localTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  return (
    <div className="container">
      <div className="todo-list">
        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button onClick={addTodo}>Add Task</button>
        </div>
        <div className="select">
          <select className="filter-todo" onChange={filterTodo} value={filter}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={todo.completed ? "completed todo" : "todo"}
              onClick={() => deleteCheck(index)}
            >
              {todo.text}
              <div className="buttons">
                <button
                  className="complete-btn"
                  onClick={() => deleteCheck(index)}
                >
                  <i className="fas fa-check-circle"></i>
                </button>
                <button
                  className="trash-btn"
                  onClick={() => removeTodo(index)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
