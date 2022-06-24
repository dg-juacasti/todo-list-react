import { FC, useEffect, useState } from 'react'
import { useList } from '../../../hooks/useLists'
import { ITodoResponse } from '../../../models'
import { COLORS } from '../../../shared/theme/colors'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'

export interface TodoFormProps {
  initialTodo?: ITodoResponse
}

const TodoForm: FC<TodoFormProps> = ({ initialTodo = { description: '', finish_at: '', status: 0 } }) => {

  const { postTodo } = useList()
  const [todo, setTodo] = useState<ITodoResponse>(initialTodo)
  const [showDescriptionAlert, setShowDescriptionAlert] = useState(false);
  const [showDateAlert, setShowDateAlert] = useState(false);
  const [showCreatedMessage, setShowCreatedMessage] = useState(false);
  const [showNotCreatedMessage, setShowNotCreatedMessage] = useState(false);
  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodo(current => ({
      ...current,
      [property]: value
    }))
  }

  useEffect(() => {
    setShowDescriptionAlert(!todo.description)
  }, [todo.description])

  useEffect(() => {
    setShowDateAlert(!todo.finish_at)
  }, [todo.finish_at])

  const onAddClick = async () => {
    if(todo.description !== '' && todo.finish_at !== '') {
      const data = await postTodo(todo)
      console.log(data);
      setShowCreatedMessage(data.id !== 0)
      setShowNotCreatedMessage(data.id === 0)
    }
  }

  return <div className='todo-form'>
    <div className='todo-form-imput-container'>
      <Typography>
        Descripción
      </Typography>
      <Input placeholder='Descripción' initialValue={todo.description} onChange={handleOnChange('description')} />
      {showDescriptionAlert && <Typography fontSize='12' color={COLORS.error}>
        Descripción es requerida
      </Typography>}
    </div>
    <div className='todo-form-imput-container'>
      <Typography>
        Fecha limite
      </Typography>
      <Input placeholder='Fecha limite' type='date' initialValue={todo.finish_at} onChange={handleOnChange('finish_at')} />
      {showDateAlert && <Typography fontSize='12' color={COLORS.error}>
        Fecha límite es requerida
      </Typography>}
    </div>
    <div className='todo-form-button-container'>
      <Button onClick={onAddClick}>Agregar</Button>
    </div>
    {showCreatedMessage && <Typography color={COLORS.progress}>
      Tarea creada
    </Typography>}
    {showNotCreatedMessage && <Typography color={COLORS.error}>
      Error al crear
    </Typography>}
  </div>
}

export default TodoForm