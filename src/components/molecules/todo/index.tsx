import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ITodoResponse } from "../../../models";
import { COLORS } from "../../../shared/theme/colors";
import { IconButton } from "../../atoms/icon-button";
import Typography from "../../atoms/typography";
import { useDispatch } from "react-redux";
import "./index.scss";
import { setDeleteTodo, setSelectedTodo } from "../../../store/reducer/app";
export interface ITodoProps {
  todo: ITodoResponse;
  isEven: boolean;
  toggleComplete?(todo: ITodoResponse): void;
  deleteTodo?(todo: ITodoResponse): void;
}

export const Todo: FC<ITodoProps> = ({
  todo,
  isEven,
  toggleComplete,
  deleteTodo,
}) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(todo.status === 0 ? false : true);

  const goToEdit = () => {
    dispatch(setSelectedTodo(todo));
    history.push("/edit");
  };

  const removeTodo = () => {
    if (deleteTodo) {
      deleteTodo(todo);
      dispatch(setDeleteTodo(todo));
    }
  };

  useEffect(() => {
    if (toggleComplete) {
      toggleComplete({ ...todo, status: checked ? 1 : 0 });
    }
  }, [checked]);

  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? "even" : "odd"}`}>
      <div className={`todo-wrapper-element`}>
        <input
          defaultChecked={checked}
          data-testid="toggleComplete"
          onChange={() => {
            setChecked(!checked);
          }}
          type="checkbox"
        />
        <div className={`todo-wrapper-information`}>
          <Typography data-testid="itemName" color={COLORS.textColor}>
            {todo.description}
          </Typography>
          <Typography color={COLORS.textColor2}>{todo.finish_at}</Typography>
        </div>
      </div>
      <div className={`todo-wrapper-icons`}>
        <IconButton
          testId="edit"
          onClick={goToEdit}
          className="fa-solid fa-pencil"
        ></IconButton>
        <IconButton
          testId="remove"
          onClick={removeTodo}
          className="fa-solid fa-trash-can"
        ></IconButton>
      </div>
    </div>
  );
};
