import { FC } from "react"
import { ITodoResponse } from "../../../models"
import { COLORS } from "../../../shared/theme/colors"
import { IconButton } from "../../atoms/icon-button"
import Typography from "../../atoms/typography"
import './index.scss'
import {useHistory} from "react-router-dom";
import {useList} from "../../../hooks/useLists";
export interface TodoProps {
  todo: ITodoResponse
  isEven: boolean
  toggleComplete?(todo: ITodoResponse): void
    deleteTodo?(todo: ITodoResponse): void
    onStatusUpdate?(status: 1 | 0, todo: ITodoResponse): void
}

export const Todo: FC<TodoProps> = ({ onStatusUpdate, todo, isEven, toggleComplete = () => {} , deleteTodo = () => {} }) => {

    const history = useHistory()

    const edit = () => {
      history.push(`/update/${todo.id}`);
    }

    const trash = () => {
        deleteTodo(todo);
    }
    const updateTodo = (event: any) => {
        if (onStatusUpdate) {
            onStatusUpdate(event.target.checked ? 1 : 0, todo)
        }
    }
  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? 'even' : 'odd'}`}>
      <div className={`todo-wrapper-element`}>
        <input type="checkbox" onChange={updateTodo}/>
        <div className={`todo-wrapper-information todo-wrapper-description`}>
          <Typography color={COLORS.textColor} style={{textDecoration: (todo.status === 1) ? 'line-through' : ''}}>
            {todo.description}
          </Typography>
          <Typography color={COLORS.textColor2} style={{textDecoration: (todo.status === 1) ? 'line-through' : ''}}>
            {todo.finish_at}
          </Typography>
        </div>
      </div>
      <div className={`todo-wrapper-information`}>
        <IconButton testid={`test-update-${todo.id}`} className="fa-solid fa-pencil" onClick={edit}/>
        <IconButton testid={`test-trash-${todo.id}`} className="fa-solid fa-trash-can" onClick={trash} />
      </div>
    </div>
  )
}
