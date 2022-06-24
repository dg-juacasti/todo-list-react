import { FC, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ITodoResponse } from '../../../models'
import { useCreateTodo } from '../../../hooks/useCreateTodo'
import { useUpdateTodo } from '../../../hooks/useUpdateTodo'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'

const TodoForm: FC<any> = (initialValue = { description: '', finish_at: '', status: 0 }) => {

  const history = useHistory()
  const { pathname } = useLocation() 

  const [todo, setTodo] = useState<ITodoResponse>(initialValue.initialValue)
  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodo(current => ({
      ...current,
      [property]: value
    }))
  }

  const { refetch } = useCreateTodo()
  const { refetch: onUpdate } = useUpdateTodo()

  const goToList = () => {
    history.push('/')
  }

  const createList = async () => {
    if (pathname === '/create') await refetch(todo)
    if (pathname === '/update') await onUpdate(todo)
    history.push('/')
  }

  return <div className='todo-form'>
    <div className='todo-form-imput-container'>
      <Typography>
        Descripción
      </Typography>
      <Input placeholder='Descripción' initialValue={todo.description} onChange={handleOnChange('description')} />
      { !todo.description && <p className='todo-form-error-text'>El campo descripcion es requerido</p> }
    </div>
    <div className='todo-form-imput-container'>
      <Typography>
        Fecha limite
      </Typography>
      <Input placeholder='Fecha limite' type='date' initialValue={todo.finish_at} onChange={handleOnChange('finish_at')} />
      { !todo.finish_at && <p className='todo-form-error-text'>El campo fecha es requerido</p> }
    </div>
    <div className='todo-form-button-container'>
      <Button variant='secondary' onClick={goToList}> Volver </Button>
      <Button onClick={createList} disabled={!(todo.finish_at && todo.description)}> Agregar </Button>
    </div>
  </div>
}

export default TodoForm