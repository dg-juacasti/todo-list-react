import { FC } from "react";
import { useHistory } from "react-router-dom";
import { ITodoResponse } from "../../../models";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Typography from "../../atoms/typography";
import { Todo } from "../../molecules/todo";
import "./index.css";
export interface TodoListProps {
  todoList: ITodoResponse[];
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {
  const history = useHistory();

  const goToCreate = () => {
    history.push("/create");
  };

  return (
    <>
      <div className="my-8">
        <Input placeholder="Buscar taréa" />
        <Button onClick={goToCreate}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      {todoList.length === 0 ? (
        <div className="empty-todo">
          <Typography color="">
            <i className="fas fa-info-circle"></i>
          </Typography>
          <Typography>No tienes tareas registradas</Typography>
        </div>
      ) : (
        <div>
          {todoList.map((todo, index) => (
            <Todo key={index} isEven={index % 2 === 0} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};

export default TodoList;
