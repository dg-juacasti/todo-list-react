import { FC } from "react";
import { ITodoResponse } from "../../../models";
import { COLORS } from "../../../shared/theme/colors";
import { IconButton } from "../../atoms/icon-button";
import Typography from "../../atoms/typography";
import "./index.scss";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { DeleteAction } from "../../../redux/to-dos";
import { useList } from "../../../hooks/useLists";
export interface TodoProps {
  todo: ITodoResponse;
  isEven: boolean;
  toggleComplete?(todo: ITodoResponse): void;
  deleteTodo?(todo: ITodoResponse): void;
}

export const Todo: FC<TodoProps> = ({
  todo,
  isEven,
  toggleComplete = () => {},
  deleteTodo = () => {},
}) => {
  const { refetch } = useList();
  const dispatch = useAppDispatch();

  const handleEdit = () => {};
  const handleDelete = () => {
    dispatch(DeleteAction(todo.id));
  };

  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? "even" : "odd"}`}>
      <div className={`todo-wrapper-element`}>
        <input title="checkboxInput" type="checkbox" />
        <div className={`todo-wrapper-information`}>
          <Typography color={COLORS.textColor}>{todo.description}</Typography>
          <Typography color={COLORS.textColor2}>{todo.finish_at}</Typography>
        </div>
      </div>
      <div className={`todo-wrapper-information`}>
        <IconButton className="fa-solid fa-pencil" onClick={handleEdit}></IconButton>
        <IconButton className="fa-solid fa-trash-can" onClick={handleDelete}></IconButton>
      </div>
    </div>
  );
};
