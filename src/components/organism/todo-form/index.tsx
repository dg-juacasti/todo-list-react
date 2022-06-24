import {FC, useEffect, useState} from 'react'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'
import {useHistory, useParams} from "react-router-dom";
import {useList} from "../../../hooks/useLists";

interface TodoFormProps {
  todoEdit?: ITodoResponse
  onCreate: (todo: ITodoResponse) => void
}
const TodoForm: FC<TodoFormProps> = ({onCreate, todoEdit}) => {

  const history = useHistory()
  // @ts-ignore
  let { id } = useParams();
  const { find, create, todo, todos } = useList()

  const [todoForm, setTodoForm] = useState<ITodoResponse>({ description: '', finish_at: '', status: 0 })
  const [errorDescription, setErrorDescription] = useState<string>('')
  const [errorDate, setErrorDate] = useState<string>('')

  useEffect(() => {
    console.log('Param', id);
    find(id)
    if (todo) {
      setTodoForm(todo as ITodoResponse);
    }
    return () => {
      setTodoForm({
        description: '',
        finish_at: '',
        status: 0,
      })
    }

  }, [todo])
  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodoForm(current => ({
      ...current,
      [property]: value
    }))
  }


  const submit = () => {
    if (!todoForm.description.length) {
      setErrorDescription('Descripción es requerida')
      return
    } else {
      setErrorDescription('')
    }
    if (!todoForm.finish_at.length) {
      setErrorDate('Error es requerido')
      return
    } else {
      setErrorDate('')
    }

    if (id) {
      console.log('update')
    } else {
      console.log('create');
      create(todoForm)
        .then(() => {
          back();
        });
    }
    // onCreate(todoForm);
    // back();
  }

  const back = () => {
    history.push('/')
  }

  return <div className='todo-form'>
    <div className='todo-form-imput-container'>
      <Typography>
        Descripción
      </Typography>
      <Input placeholder='Descripción' initialValue={todoForm.description} onChange={handleOnChange('description')} errorMessage={errorDescription} />
    </div>
    <div className='todo-form-imput-container'>
      <Typography>
        Fecha limite
      </Typography>
      <Input placeholder='Fecha limite' type='date' initialValue={todoForm.finish_at} onChange={handleOnChange('finish_at')} errorMessage={errorDate} />
    </div>
    <div className='todo-form-button-container'>
      <Button onClick={back} variant="secondary"> Volver </Button>
      <Button onClick={submit}> {id ? 'Actualizar' : 'Agregar'} </Button>
    </div>
  </div>
}

export default TodoForm
