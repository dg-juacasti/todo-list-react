import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'
import { createTodo } from '../../../hooks/createTodo'
import { useLocation } from "react-router-dom"
import { editTodo } from '../../../hooks/editTodo';

const TodoForm: FC = () => {
  const location: any = useLocation()
  const actualTodo: ITodoResponse = location?.state?.params

  const [type, setType] = useState(0)
  const history = useHistory()
  const [todo, setTodo] = useState<ITodoResponse>({ description: '', finish_at: '', status: 0 })

  useEffect(() => {
    if (actualTodo && actualTodo.description) {
      setType(1)
      setTodo(actualTodo)
    }
  }, [actualTodo])


  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodo(current => ({
      ...current,
      [property]: value
    }))
  }

  const handleOnClick = () => {
    const { refetch } = createTodo(todo)
    refetch()
    goToHome()
  }

  const handleOnClickEdit = () => {
    const { refetch } = editTodo(todo)
    refetch()
    goToHome()
  }



  const goToHome = () => {
    history.push('/')
  }

  return <div className='todo-form'>
    <div className='todo-form-imput-container'>
      <Typography>
        Descripción
      </Typography>
      <Input placeholder='Descripción' initialValue={todo.description} onChange={handleOnChange('description')} required />
    </div>
    <div className='todo-form-imput-container'>
      <Typography>
        Fecha limite
      </Typography>
      <Input placeholder='Fecha limite' type='date' initialValue={todo.finish_at} onChange={handleOnChange('finish_at')} required />
    </div>
    <div className='todo-form-button-container'>
      <Button onClick={goToHome} variant="secondary">  Volver </Button>
      {type === 0 ?
        <Button onClick={handleOnClick}>  Agregar </Button>
        :
        <Button onClick={handleOnClickEdit}>  Editar </Button>
      }

    </div>
  </div>
}

export default TodoForm