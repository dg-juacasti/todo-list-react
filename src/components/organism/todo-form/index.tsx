import { FC, useState } from 'react'
import axios from 'axios'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import { useHistory } from 'react-router-dom'
import Typography from '../../atoms/typography'
import './index.scss'

export interface TodoFormProps {
  edit: boolean
}

const TodoForm: FC<TodoFormProps> = ({ edit }) => {
  const history = useHistory()
  const [todo, setTodo] = useState<ITodoResponse>({ description: '', finish_at: '', status: 0 })
  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodo(current => ({
      ...current,
      [property]: value
    }))
  }

  const handleSubmit = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const newTodo = {
      description: todo.description,
      status: todo.status,
      id_author: 44,
      finish_at: todo.finish_at
    }
    axios.post(
      'https://bp-todolist.herokuapp.com/?id_author=4',
      newTodo,
      config
    )
      .then(res => {
        console.log(res)
        history.push('/')
        window.location.reload();
      })
      .catch(err => console.error(err));
  }

  return <div className='todo-form'>
    <div className='todo-form-imput-container'>
      <Typography>
        Descripción
      </Typography>
      <Input placeholder='Descripción' initialValue={todo.description} onChange={handleOnChange('description')} />
    </div>
    <div className='todo-form-imput-container'>
      <Typography>
        Fecha limite
      </Typography>
      <Input placeholder='Fecha limite' type='date' initialValue={todo.finish_at} onChange={handleOnChange('finish_at')} />
    </div>
    <div className='todo-form-button-container'>
      <Button onClick={handleSubmit}> Agregar </Button>
    </div>
  </div>
}

export default TodoForm