import { FC } from 'react'
import './index.scss'
import { ITodoResponse } from '../../../models'
import { COLORS } from '../../../shared/theme/colors'
import { IconButton } from '../../atoms/icon-button'
import Typography from '../../atoms/typography'
export interface TodoProps {
  todo: ITodoResponse
  isEven: boolean
  toggleComplete?: () => void
  editTodo?: () => void
  deleteTodo?: () => void
}

export const Todo: FC<TodoProps> = ({
  todo,
  isEven,
  toggleComplete = () => {},
  deleteTodo = () => {},
  editTodo = () => {},
}) => {
  return (
    <div className={`todo-wrapper todo-wrapper-${isEven ? 'even' : 'odd'}`}>
      <div className={`todo-wrapper-element`}>
        <input type="checkbox" onChange={toggleComplete} checked={todo.status === 1} />
        <div className={`todo-wrapper-information ${todo.status === 1 ? 'completed' : ''}`}>
          <Typography color={COLORS.textColor}>{todo.description}</Typography>
          <Typography color={COLORS.textColor2}>{todo.finish_at}</Typography>
        </div>
      </div>
      <div className={`todo-wrapper-buttons`}>
        <IconButton className="fa-solid fa-pencil" onClick={editTodo}></IconButton>
        <div data-testid="deleteButton-datatestid">
          <IconButton className="fa-solid fa-trash-can" onClick={deleteTodo}></IconButton>
        </div>
      </div>
    </div>
  )
}
