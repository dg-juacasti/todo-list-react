import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useRemove } from "../../../hooks/useDelete";
import { useEdit } from "../../../hooks/useEdit";
import { AppState, ITodoResponse } from "../../../models";
import { RootState } from "../../../store";
import {
  setTodosByDescription,
  setTodosNoCompleted,
} from "../../../store/reducer/app";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { PercentageBar } from "../../molecules/progressBar";
import { Todo } from "../../molecules/todo";
import "./index.css";
export interface TodoListProps {
  todoList: ITodoResponse[];
  searchNoCompleted: () => void;
}

const TodoList: FC<TodoListProps> = ({ todoList, searchNoCompleted }) => {
  const { todosSearch, todosNoCompleted } = useSelector<RootState, AppState>(
    (state) => state.app
  );

  const history = useHistory();

  const dispatch = useDispatch();

  const { remove } = useRemove();

  const { edit } = useEdit();

  const [showNoCompletd, setshowNoCompletd] = useState(false);

  const goToCreate = () => {
    history.push("/create");
  };

  const search = (todoDescription: string) => {
    dispatch(setTodosByDescription(todoDescription));
  };

  const editTodoChecked = (todo: ITodoResponse) => {
    edit(todo);
  };

  


  return (
    <>
      <div className="my-8">
        <Input placeholder="Buscar tarea" onChange={search} />
        <Button onClick={goToCreate}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      <div>
        {showNoCompletd &&
          todosNoCompleted.map((todo, index) => (
            <Todo
              data-testid="todo"
              toggleComplete={editTodoChecked}
              key={index}
              isEven={index % 2 === 0}
              todo={todo}
              deleteTodo={remove}
            />
          ))}
        {todosSearch &&
          !showNoCompletd &&
          todosSearch.length > 0 &&
          todosSearch.map((todo, index) => (
            <Todo
              data-testid="todo"
              toggleComplete={editTodoChecked}
              key={index}
              isEven={index % 2 === 0}
              todo={todo}
              deleteTodo={remove}
            />
          ))}
        {(!todosSearch || todosSearch.length === 0) &&
          !showNoCompletd &&
          todoList.map((todo, index) => (
            <Todo
              data-testid="todo"
              toggleComplete={editTodoChecked}
              key={index}
              isEven={index % 2 === 0}
              todo={todo}
              deleteTodo={remove}
            />
          ))}
      </div>
      <PercentageBar total={todoList.length} completadas={todoList.filter( todo => todo.status === 1 ).length} percentage="20"/>
      
      <div className="center my-8">
        {!showNoCompletd && (
          <Button
            onClick={() => {
              searchNoCompleted();
              setshowNoCompletd(true);
            }}
          >
            Mostrar no completados
          </Button>
        )}

        {showNoCompletd && (
          <Button
            onClick={() => {
              setshowNoCompletd(false);
            }}
          >
            Mostrar todos
          </Button>
        )}
      </div>
    </>
  );
};

export default TodoList;
