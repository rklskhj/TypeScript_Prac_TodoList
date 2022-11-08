import React from "react";
import TodoInput from "../TodoInput/TodoInput";
import TodoList from "../TodoList/TodoList";
import TodoTitle from "../TodoTitle/TodoTitle";
import "./TodoTemplate.scss";

const TodoTemplate = (): JSX.Element => {
  return (
    <div className="TodoTemplate">
      <div className="TodoTemplate-Contents">
        <TodoTitle />
        <TodoList />
        <TodoInput />
      </div>
    </div>
  );
};

export default TodoTemplate;
