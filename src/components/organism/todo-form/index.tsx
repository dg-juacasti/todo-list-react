import { FC, useState } from 'react'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'
import axios from 'axios'

import {
  useHistory
} from "react-router-dom";

import { AUTHOR_ID, BASE_URL } from '../../../constants/app'

const TodoForm: FC = () => {

  let history = useHistory();
  const [todo, setTodo] = useState<ITodoResponse>({ description: '', finish_at: '', status: 0 })
  const [messageDescription, setMessageDescription] = useState('')
  const [messageDate, setMessageDate] = useState('')

  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodo(current => ({
      ...current,
      [property]: value
    }))
  }

  /* Carptura información de formulario */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (todo.description.length === 0) {
      setMessageDescription('Descripción es requerida')
    }
    if (todo.finish_at.length === 0) {
      setMessageDate('Fecha es requerida')
    }

    if (todo.description.length > 0 && todo.finish_at.length > 0) {
      const newTodo = {
        description: todo.description,
        status: 0,
        id_author: AUTHOR_ID,
        finish_at: todo.finish_at
      }
      //Ejecutar peticion
      const url = `${BASE_URL}?id_author=${AUTHOR_ID}`
      await axios.post(url, newTodo);
      history.push('/');
      history.go(0)
    }

  }

  return <div className='todo-form'>
    <form onSubmit={handleSubmit}>
      <div className='todo-form-imput-container'>
        <Typography>
          Descripción
        </Typography>
        <Input id='description' placeholder='Descripción' initialValue={todo.description} onChange={handleOnChange('description')} />
        <div className='imput-require '>
          <Typography style={{ color: 'red' }}>
            {messageDescription}
          </Typography>
        </div>

      </div>
      <div className='todo-form-imput-container'>
        <Typography>
          Fecha limite
        </Typography>
        <Input id='date' placeholder='Fecha limite' type='date' initialValue={todo.finish_at} onChange={handleOnChange('finish_at')} />
        <div className='imput-require '>
          <Typography style={{ color: 'red' }}>
            {messageDate}
          </Typography>
        </div>
      </div>
      <br />
      <div className='todo-form-button-container'>
        <Button> Agregar </Button>
      </div>
    </form>
  </div>
}

export default TodoForm