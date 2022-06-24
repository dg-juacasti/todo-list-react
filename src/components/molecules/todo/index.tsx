import axios from "axios"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { AUTHOR_ID, BASE_URL } from "../../../constants/app"
import { ITodoResponse } from "../../../models"
import { COLORS } from "../../../shared/theme/colors"
import { IconButton } from "../../atoms/icon-button"
import Typography from "../../atoms/typography"
import './index.scss'
export interface TodoProps {
  todo: ITodoResponse
  isEven: boolean
  toggleComplete?(todo: ITodoResponse): void
  deleteTodo?(todo: ITodoResponse): void
}

export const Todo: FC<TodoProps> = ({ todo, isEven, toggleComplete = () => {} , deleteTodo = () => {} }) => {
  const history = useHistory()
  const editTodo = () => {
    history.push(`/edit/${todo.id}`)
  }


  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? 'even' : 'odd'}`}>
      <div className={`todo-wrapper-element`}>
        <input type="checkbox" onClick={() =>toggleComplete(todo)} checked={todo.status===1}/>
        <div className={`todo-wrapper-information`}>
          <Typography color={COLORS.textColor}>
            {todo.description}
          </Typography>
          <Typography color={COLORS.textColor2}>
            {todo.finish_at}
          </Typography>
        </div>
      </div>
      <div className={`todo-wrapper-information`}>
        <IconButton className="fa-solid fa-pencil" onClick={editTodo}></IconButton>
        <IconButton className="fa-solid fa-trash-can"onClick={() =>deleteTodo(todo)} data-testid="deleteTodo"></IconButton>
      </div>
    </div>
  )
}
