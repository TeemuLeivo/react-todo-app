import React from "react";

const TodoList = props => {
  return (
    <>
      <h2> Todo items </h2>
      <div>
        <ul className="todo-list">
          {props.todoItems.map(item => {
            let contentClasses = "todo-row-content";
            if (item.done) {
              contentClasses = contentClasses.concat(" checked");
            }
            return (
              <li className="todo-row" key={item.name + item.content}>
                <div className="todo-actions-row">
                  <span className="done-checkbox">
                    Done
                    <input
                      onClick={() => props.doneHandler(item)}
                      checked={item.done}
                      type="checkbox"
                    />
                  </span>
                  <button onClick={() => props.deleteHandler(item.id)}>
                    Delete
                  </button>
                </div>
                <div className={contentClasses}>{item.content}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
