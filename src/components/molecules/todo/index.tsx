import axios from "axios"
import { FC } from "react"
import { useHistory } from "react-router-dom"
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

  const handleDelete = async () => {
    axios.delete(`https://bp-todolist.herokuapp.com/${todo.id}`)
    .then(res => {
      console.log(res)
      history.push('/')
      window.location.reload()
    })
    .catch(err => console.error(err));
  }

  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? 'even' : 'odd'}`}>
      <div className={`todo-wrapper-element`}>
        <input type="checkbox"/>
        <div className={`todo-wrapper-information`}>
          <Typography color={COLORS.textColor}>
            {todo.description}
          </Typography>
          <Typography color={COLORS.textColor2}>
            {todo.finish_at}
          </Typography>
        </div>
      </div>
      <div className={`todo-wrapper-crud`}>
        <IconButton className="fa-solid fa-pencil"></IconButton>
        <IconButton onClick={handleDelete} className="fa-solid fa-trash-can" ></IconButton>
      </div>
    </div>
  )
}
