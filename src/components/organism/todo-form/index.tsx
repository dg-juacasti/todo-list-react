import { FC, useState } from 'react'
import { AUTHOR_ID } from '../../../constants/app'
import { useCreateTodo } from '../../../hooks/useCreateTodo'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'

const TodoForm: FC = () => {

  const [todoNew, setTodoNew] = useState<ITodoResponse>({ description: '', finish_at: '', status: 0, id_author: AUTHOR_ID })
  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodoNew(current => ({
      ...current,
      [property]: value
    }))
  }

  const [validationDescription, setValidationDescription] = useState(false)
  const [validationDate, setValidationDate] = useState(false)

  const { refetchCreateTodo } = useCreateTodo()

  const goToList = () => {
    window.location.replace('/')
  }

  const handleCreateNewTodo = () => {
    if (todoNew.description === '') {
      setValidationDescription(true)
    } else {
      setValidationDescription(false)
    }
    if (todoNew.finish_at === '') {
      setValidationDate(true)
    }else {
      setValidationDate(false)
    }
    if (todoNew.description !== '' && todoNew.finish_at !== '') {
      refetchCreateTodo(todoNew)
    }
  }

  return <div className='todo-form'>
    <div className='todo-form-imput-container'>
      <Typography>
        Descripción
      </Typography>
      <Input placeholder='Descripción' initialValue={todoNew.description} onChange={handleOnChange('description')} />
      {
        validationDescription &&
        <Typography color='red'>
          Descripción es requerida
        </Typography>
      }
    </div>
    <div className='todo-form-imput-container'>
      <Typography>
        Fecha limite
      </Typography>
      <Input placeholder='Fecha limite' type='date' initialValue={todoNew.finish_at} onChange={handleOnChange('finish_at')} />
      {
        validationDate &&
        <Typography color='red'>
          Fecha límite es requerida
        </Typography>
      }
    </div>
    <div className='todo-form-button-container'>
      <Button className='button-secondary' onClick={goToList}> Volver </Button>
      <Button onClick={handleCreateNewTodo}> Agregar </Button>
    </div>
  </div>
}

export default TodoForm