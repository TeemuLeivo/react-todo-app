import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import axios from 'axios'
import todoService from './services/todoItem'

const App = () => {
  const [todoItems, setTodoItems] = useState([])
  const [newItem, setNewItem] = useState("")

  const getDataHook = () => {
    todoService.getAll().then(allItems => {
      setTodoItems(allItems);
    })
  }
  useEffect(getDataHook, [])

  const doneHandler = (item) => {
    console.log(item)
    const updatedItem = {...item, done: !item.done }
    console.log(updatedItem)
    todoService.updateItem(updatedItem).then(getDataHook)
  }

  const addItemHandler = (event) => {
    console.log(newItem)
    const randomId = Math.floor(Math.random() * 1000000000);
    const todoItem  = {'content':  newItem,
                       'id': randomId,
                       'done': false
                      }
    todoService.create(todoItem).then(addedItem => {
      setTodoItems(todoItems.concat(addedItem))
    })
    setNewItem("")
  }

  const newItemHandler = (event) => {
    setNewItem(event.target.value)
  }

  const deleteHandler = (id) => {
    todoService.deleteItem(id).then(getDataHook)
  }

  return (
    <div>
      <h1>Todo app</h1>
      <h2> Create new todo item</h2>
      <input type="text" value={newItem} onChange={newItemHandler} />
      <button onClick={addItemHandler} >Add item</button>
      <h2 >Todo items </h2>
          <div>
            <ul className="todo-list">
            {todoItems.map(item => {
                let contentClasses = "todo-row-content"
                if(item.done){
                  contentClasses = contentClasses.concat(" checked")
                }
                return (
                  <li className="todo-row" key={item.name + item.content}>
                    <div className="todo-actions-row">
                      <span className="done-checkbox"> Done <input onClick={() => doneHandler(item)} checked={item.done} type="checkbox"/> </span>
                      <button onClick={() => deleteHandler(item.id)} >Delete</button>
                    </div>
                    <div className={contentClasses}>{item.content}</div>
                  </li>
                );
              })}
            </ul> 
          </div>
    </div>
  )
}

export default App;
