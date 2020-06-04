import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import todoService from "./services/todoItem";
import TodoList from "./components/TodoList";

const App = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const getDataHook = () => {
    todoService.getAll().then(allItems => {
      setTodoItems(allItems);
    });
  };
  useEffect(getDataHook, []);

  const doneHandler = item => {
    console.log(item);
    const updatedItem = { ...item, done: !item.done };
    console.log(updatedItem);
    todoService.updateItem(updatedItem).then(getDataHook);
  };

  const addItemHandler = event => {
    console.log(newItem);
    const randomId = Math.floor(Math.random() * 1000000000); //TODO: Add actual id generating
    const todoItem = { content: newItem, id: randomId, done: false };
    todoService.create(todoItem).then(addedItem => {
      setTodoItems(todoItems.concat(addedItem));
    });
    setNewItem("");
  };

  const newItemHandler = event => {
    setNewItem(event.target.value);
  };

  const deleteHandler = id => {
    if (window.confirm("Are you sure you want to delete item?")) {
      todoService.deleteItem(id).then(getDataHook);
    }
  };

  return (
    <div>
      <h1>Todo app</h1>
      <h2> Create new todo item</h2>
      <input type="text" value={newItem} onChange={newItemHandler} />
      <button onClick={addItemHandler}>Add item</button>
      <TodoList
        doneHandler={doneHandler}
        deleteHandler={deleteHandler}
        todoItems={todoItems}
      ></TodoList>
    </div>
  );
};

export default App;
