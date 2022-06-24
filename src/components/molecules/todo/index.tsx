import { FC } from "react"
import { ITodoResponse } from "../../../models"
import { COLORS } from "../../../shared/theme/colors"
import { IconButton } from "../../atoms/icon-button"
import Typography from "../../atoms/typography"
import './index.scss'
import { BASE_URL } from "../../../constants/app"
import axios from 'axios'
import {
  useHistory
} from "react-router-dom";


export interface TodoProps {
  todo: ITodoResponse
  isEven: boolean
  toggleComplete?(todo: ITodoResponse): void
  deleteTodo?(todo: ITodoResponse): void
}

export const Todo: FC<TodoProps> = ({ todo, isEven, toggleComplete = () => { }, deleteTodo = () => { } }) => {
  let history = useHistory();
  const getStyle = () => {
    return {
      textDecoration: todo.status ? "line-through" : "none",
    };
  };

  /* Carptura información */
  const handleClick = () => {
    alert('¿Desea eliminar el registro?')
    //Ejecutar peticion
    const url = `${BASE_URL}${todo.id}`
    axios.delete(url);
    history.go(0)
  }

  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? 'even' : 'odd'}`}>
      <div style={getStyle()} className={`todo-wrapper-element`}>
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
      <div className={`todo-wrapper-information`}>
        <IconButton className="fa-solid fa-pencil"></IconButton>
        <IconButton className="fa-solid fa-trash-can" onClick={handleClick}></IconButton>
      </div>
    </div>
  )
}
