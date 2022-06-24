import { FC, useEffect, useState } from 'react'
import { ITodoResponse } from '../../../models'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import Typography from '../../atoms/typography'
import './index.scss'
import { AUTHOR_ID, BASE_URL } from '../../../constants/app' 
import { useHistory } from 'react-router-dom'
import { useList } from '../../../hooks/useLists'

export interface TodoFormProps {
  setTodos:any
}

const TodoForm = ( props:TodoFormProps) => {

  const history = useHistory()
  
  const[save, setSave]=useState('')
  const { todos: todosListI, refetch } = useList()
  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [save])

  const [todo, setTodo] = useState<ITodoResponse>({ description: '', finish_at: '', status: 0 , id_author: AUTHOR_ID,})
  const handleOnChange = (property: 'description' | 'finish_at') => (value: string) => {
    setTodo(current => ({
      ...current,
      [property]: value
    }))
  }

 const saveTodo =()=>{

  console.log(todo)  
  fetch(`${BASE_URL}?id_author=${AUTHOR_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      return response.json();
    })
    .then((resultToDo) => {
      alert("Guardado con éxito... ");
      setSave(resultToDo)
      props.setTodos(todosListI)
    })
    .catch((error) => {
      console.log("Hubo un error" + error);
    });
 }


 const goToHome = () => {
  props.setTodos(todosListI)
  history.push('/')
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
    <Button
       onClick={goToHome}
      > Volver </Button>
      <Button
       onClick={saveTodo}
      > Agregar </Button>
    
    </div>
  </div>
}

export default TodoForm