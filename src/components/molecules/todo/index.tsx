import { FC } from "react"
import { ITodoResponse } from "../../../models"
import { COLORS } from "../../../shared/theme/colors"
import { IconButton } from "../../atoms/icon-button"
import Typography from "../../atoms/typography"
import './index.scss'
import { deleteTodoApi } from '../../../hooks/deleteTodo';
import { useHistory } from "react-router-dom"
export interface TodoProps {
  todo: ITodoResponse
  isEven: boolean
  toggleComplete?(todo: ITodoResponse): void
  deleteTodo?(todo: ITodoResponse): void
}

export const Todo: FC<TodoProps> = ({ todo, isEven, toggleComplete = () => {} , deleteTodo = () => {} }) => {

  const history = useHistory()

  const goToEdit = () => {
    history.push('/create',  { params: todo })
  }

  const handleClickDelete = () => {
    console.log('delete')
    const { refetch } = deleteTodoApi(todo.id)
    console.log(todo.id)
    refetch()
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
      <div className={`todo-wrapper-information`}>
        <IconButton className="fa-solid fa-pencil" onClick={goToEdit}></IconButton>
        <IconButton className="fa-solid fa-trash-can" onClick={handleClickDelete}></IconButton>
      </div>
    </div>
  )
}
