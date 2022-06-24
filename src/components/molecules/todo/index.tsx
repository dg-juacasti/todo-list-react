import { FC, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ITodoResponse } from "../../../models"
import { COLORS } from "../../../shared/theme/colors"
import { IconButton } from "../../atoms/icon-button"
import Typography from "../../atoms/typography"
import TodoForm from "../../organism/todo-form"
import './index.scss'
export interface TodoProps {
  todo: ITodoResponse
  isEven: boolean
  toggleComplete?(todo: ITodoResponse): void
  deleteTodo?(todo: ITodoResponse): void
}

export const Todo: FC<TodoProps> = ({ todo, isEven, toggleComplete = () => {} , deleteTodo = () => {}}) => {

  const [checked, setChecked] = useState(todo.status === 1);
  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <div className={`todo-wrapper-with-form-${isEven ? 'even' : 'odd'}`}>
      <div className={`todo-wrapper`}>
        <div className={`todo-wrapper-element`}>
          <input type="checkbox" checked={checked} onChange={() => {
            setChecked(!checked)
            toggleComplete({...todo, status: todo.status === 1 ? 0 : 1})
          }}/>
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
          <IconButton className="fa-solid fa-pencil" onClick={() => {
            setShowUpdate(!showUpdate)
          }}></IconButton>
          <IconButton className="fa-solid fa-trash-can" onClick={() => {
            deleteTodo(todo)
          }}></IconButton>
        </div>
      </div>
      {showUpdate && <TodoForm initialTodo={todo}></TodoForm>}
    </div>
    
  )
}
