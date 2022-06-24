import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ITodoResponse } from "../../../models";
import { getAllTodos } from "../../../redux/to-dos";
import { Button } from "../../atoms/button";
import { Todo } from "../../molecules/todo";
import "./index.css";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import store from "../../../redux/store";
export interface TodoListProps {
  todoList: ITodoResponse[];
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const goToCreate = () => {
    history.push("/create");
  };

  useEffect(() => {
    dispatch(getAllTodos(todoList));
  }, [store.getState()]);

  return (
    <>
      <div className="my-8">
        <Button onClick={goToCreate}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      <div>
        {todoList.map((todo, index) => (
          <Todo key={index} isEven={index % 2 === 0} todo={todo} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
