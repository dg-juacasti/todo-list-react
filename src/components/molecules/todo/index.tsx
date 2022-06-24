import { FC } from "react"
import { useDispatch } from "react-redux"
import { Redirect, useHistory } from "react-router"
import { ITodoResponse } from "../../../models"
import { deletelist } from "../../../services/listService"
import { COLORS } from "../../../shared/theme/colors"
import { setAll } from "../../../store/slices/form"
import { IconButton } from "../../atoms/icon-button"
import Typography from "../../atoms/typography"
import './index.scss'
export interface TodoProps {
  todo: ITodoResponse
  isEven: boolean
  toggleComplete?(todo: ITodoResponse): void
  deleteTodo?(todo: ITodoResponse): void
}

export const Todo: FC<TodoProps> = ({ todo, isEven, toggleComplete = () => { }, deleteTodo = () => { } }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const update = async () => {
    dispatch(setAll(todo))
    history.push('/create')
  };

  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? 'even' : 'odd'}`}>
      <div className={`todo-wrapper-element`}>
        <input type="checkbox" />
        <div className={`todo-wrapper-information`}>
          <Typography color={COLORS.textColor}>
            {todo.description}
          </Typography>
          <Typography color={COLORS.textColor2}>
            {todo.finish_at}
          </Typography>
        </div>
      </div>
      <div className={`todo-wrapper-icon`}>
        <IconButton onClick={() => update()} className="fa-solid fa-pencil"></IconButton>
        <IconButton onClick={() => deletelist(todo.id)} className="fa-solid fa-trash-can" ></IconButton>
      </div>
    </div>
  )
}
