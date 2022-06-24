import axios from 'axios'
import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'
import { AUTHOR_ID, BASE_URL } from '../../../constants/app'
import { useList } from '../../../hooks/useLists'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'

interface ITodoForm {
  todoEdit?: ITodoResponse
  onCreate?: (arg0: any) => void
}

const TodoForm: FC<ITodoForm> = ({ todoEdit = null, onCreate = undefined }) => {
  const history = useHistory()
  const { refetch } = useList()

  const [todo, setTodo] = useState<ITodoResponse>({
    description: todoEdit ? todoEdit.description : '',
    finish_at: todoEdit ? todoEdit.finish_at : '',
    status: todoEdit ? todoEdit.status : 0,
    id_author: AUTHOR_ID,
  })

  const [errorDescription, setErrorDescription] = useState(false)
  const [errorDate, setErrorDate] = useState(false)

  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodo((current) => ({
      ...current,
      [property]: value,
    }))
    setErrorDate(false)
    setErrorDescription(false)
  }

  const handleAddTodo = async () => {
    if (!todo.description) {
      setErrorDescription(true)
      return
    }
    if (!todo.finish_at) {
      setErrorDate(true)
      return
    }

    if (!todoEdit) {
      const res = await axios.post(BASE_URL + '?id_author=' + AUTHOR_ID, todo)
      console.log(res)
      if (typeof onCreate === 'function') onCreate(res.data.data)
    } else {
      await axios.put(BASE_URL + todoEdit.id, todo)
    }
    await refetch()
  }

  const goToHome = () => {
    history.push('/')
  }

  return (
    <div className="todo-form">
      <div className="todo-form-imput-container">
        <Typography>Descripción</Typography>
        <Input
          placeholder="Descripción"
          initialValue={todo.description}
          onChange={handleOnChange('description')}
        />
        {errorDescription && (
          <Typography color="red" fontSize="14">
            Descripción es requerida.
          </Typography>
        )}
      </div>
      <div className="todo-form-imput-container">
        <Typography>Fecha limite</Typography>
        <Input
          placeholder="Fecha limite"
          type="date"
          initialValue={todo.finish_at}
          onChange={handleOnChange('finish_at')}
        />
        {errorDate && (
          <Typography color="red" fontSize="14">
            Fecha es requerida.
          </Typography>
        )}
      </div>
      <div className="todo-form-button-container">
        <Button onClick={goToHome} variant="secondary">
          Volver
        </Button>
        <Button onClick={handleAddTodo}> {todoEdit ? 'Editar' : 'Agregar'} </Button>
      </div>
    </div>
  )
}

export default TodoForm
