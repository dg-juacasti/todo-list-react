import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Todo } from '../../molecules/todo'
import Typography from '../../atoms/typography'
import './index.css'
export interface TodoListProps {
  todoList: ITodoResponse[]
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {

  const history = useHistory()

  const goToCreate = () => {
    history.push('/create')
  }

  return (
    <>
      <div className='my-8'>
        <Button onClick={goToCreate} ><i className="fa-solid fa-plus"></i>Add</Button>
      </div>
      <div>

        {todoList.length === 0 && (
          <div>
            <i className="fa-solid fa-info"></i>
            <Typography>No tienes tareas asignadas</Typography>
          </div>
        )}

        {todoList.map((todo, index) =>
          <Todo key={index} isEven={index % 2 === 0} todo={todo} />
        )}

        <br />
        <p className="todoList__progress__count">
          0 de {todoList.length} tarea(s) completada(s)
          <span />
        </p>
        <br />
        <Button onClick={() => { }}>
          <p >Mostrar no completados</p>
        </Button>
        <br />
        <div >
          <Button onClick={() => { }}>
            <p>Mostrar todos</p>
          </Button>
        </div>

      </div>
    </>
  )
}

export default TodoList